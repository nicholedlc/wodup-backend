const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const uploader = multer({
  dest: path.join(__dirname, '/../../public/uploads/'),
  limits: {fileSize: 5000000, files: 1}
});

router.post('/', uploader.single('image'), function (req, res, next) {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({imageUrl});
});

module.exports = router;
