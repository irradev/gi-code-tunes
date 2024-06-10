const Op = require('sequelize').Op;

const { uploadFile, deleteFile } = require('../config/cloudinary');
const { Song } = require('../models');

const uploadSong = async (req, res) => {
  try {
    const result = await uploadFile(req.files.song);

    const song = await Song.create({
      ...req.body,
      cloudinaryPublicId: result.public_id,
      cloudinarySecureUrl: result.secure_url,
    });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const search = async (req, res) => {
  const { search } = req.body;
  try {
    const songs = await Song.findAll({
      where: {
        title: { [Op.like]: '%' + search + '%' },
      },
    });

    return res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteSong = async (req, res) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findByPk(song_id);
    await deleteFile(song.dataValues.cloudinaryPublicId);
    await song.destroy();
    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadSong,
  search,
  deleteSong,
};
