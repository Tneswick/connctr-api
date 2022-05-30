const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  reactToThought,
  deleteReaction
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)
  
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

router
  .route('/api/thoughts/:thoughtId/reactions')
  .post(reactToThought)
  .delete(deleteReaction)

module.exports = router;
