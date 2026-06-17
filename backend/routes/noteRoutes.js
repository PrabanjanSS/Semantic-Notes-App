const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/search', noteController.searchNotes);

module.exports = router;