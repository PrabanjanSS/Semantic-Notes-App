const Note = require('../models/Note');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateEmbedding = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
    const result = await model.embedContent(text);
    return result.embedding.values; 
  } catch (error) {
    console.error('Gemini Embedding Error:', error);
    throw new Error('Failed to generate vector embedding from Gemini.');
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const textToVectorize = `Title: ${title}. Content: ${content}`;
    const embedding = await generateEmbedding(textToVectorize);

    const newNote = new Note({ title, content, category, embedding });
    await newNote.save();

    res.status(201).json({ success: true, message: 'Note saved & vectorized!', note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().select('-embedding').sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    // 🎯 NEW: We grab the `scope` variable sent from the React frontend
    const { query, category, scope } = req.query;

    console.log(`🔎 Mode: "${scope}" | Query: "${query}" | Filter: "${category}"`);

    if (!query) return res.status(400).json({ error: 'Query string parameter is required.' });

    const queryVector = await generateEmbedding(query);

    let vectorSearchStage = {
      index: 'vector_index', 
      path: 'embedding',     
      queryVector: queryVector,
      numCandidates: 10,
      limit: 5
    };

    if (category && category !== 'All') {
      vectorSearchStage.filter = { category: { $eq: category } };
    }

    const results = await Note.aggregate([
      { $vectorSearch: vectorSearchStage },
      {
        $project: {
          title: 1, content: 1, category: 1,
          vectorScore: { $meta: 'vectorSearchScore' } 
        }
      },
      // 🎯 TARGETED SCORING BOOST:
      // We calculate a bonus of +0.30 if the text exactly matches the title or content
      {
        $addFields: {
          titleBonus: { $cond: [{ $regexMatch: { input: "$title", regex: query, options: "i" } }, 0.30, 0] },
          contentBonus: { $cond: [{ $regexMatch: { input: "$content", regex: query, options: "i" } }, 0.30, 0] }
        }
      },
      // 🎯 ROUTER LOGIC:
      // Depending on the dropdown choice, we ONLY apply the bonus to the chosen field
      {
        $addFields: {
          finalScore: {
            $add: [
              "$vectorScore",
              scope === 'title' ? "$titleBonus" : 0,
              scope === 'content' ? "$contentBonus" : 0
            ]
          }
        }
      },
      // 🎯 STRICT FILTER: 
      // Base score requirement is 0.80. Unrelated junk (like 0.77 cardio) gets deleted.
      // But if your exact Title or Content matches, it gets +0.30, pushing it well over the line!
      {
        $match: { finalScore: { $gte: 0.82 } }
      },
      {
        $sort: { finalScore: -1 }
      }
    ]);

    console.log(`✅ Database returned ${results.length} targeted documents.`);
    
    // We optionally map the final score so it displays cleanly in the UI
    const formattedResults = results.map(item => ({
      ...item,
      score: item.finalScore > 1 ? 0.99 : item.finalScore // Caps UI score at 99% for visual cleanliness
    }));

    res.status(200).json(formattedResults);

  } catch (error) {
    console.error('❌ Vector Search Routine Crashed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};