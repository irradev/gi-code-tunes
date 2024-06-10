const { Artist, Song } = require('../models');
const Op = require('sequelize').Op;

const getAll = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: {
        model: Song,
        as: 'songs',
        separate: true,
        oder: [['createdAt', 'desc']],
      },
    });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOwnArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findByPk(id, {
      include: {
        model: Song,
        as: 'songs',
        separate: true,
        oder: [['createdAt', 'desc']],
      },
    });
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSongsByArtist = async (req, res) => {
  const { artist_id } = req.params;

  try {
    const songs = await Song.findAll({ where: { artistId: artist_id } });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    req.body.userId = req.user.id;

    const artist = await Artist.create(req.body);
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const search = async (req, res) => {
  const { search } = req.body;

  try {
    const artists = await Artist.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: '%' + search + '%' } },
          { bio: { [Op.like]: '%' + search + '%' } },
        ],
      },
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getOwnArtists,
  getById,
  getSongsByArtist,
  create,
  search,
};
