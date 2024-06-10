const {
  getAll,
  getOwnArtists,
  getById,
  getSongsByArtist,
  create,
  search,
} = require('../../controllers/artists.controller');
const { checkToken } = require('../../helpers/middlewares');

const router = require('express').Router();

router.get('/', getAll);
router.get('/own', checkToken, getOwnArtists);
router.get('/:id', getById);
router.get('/songs/:artist_id', getSongsByArtist);

router.post('/', checkToken, create);
router.post('/search', search);

module.exports = router;
