const ex = require("express");
const router = ex.Router();
const multer = require("multer");
const imageServer = require("cloudinary").v2;
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

imageServer.config({
  cloud_name: "devvizeuo",
  api_key: 465862995171618,
  api_secret: "VaLQ0urXLFQWXmWEIVe5nAXHWbA",
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __dirname + "/uploaded");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + ".png");
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: imageServer,
  params: {
    folder: "Lekhoks",
    format: async (req, file) => "png",
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const uploader = multer({ storage: storage });

router.post("/", uploader.single("image"), async (req, res) => {
  try {
    const image = {
      data: req.file.path,
    };

    const hashedpass = await bcrypt.hash(req.body.password, 10);

    await imageServer.uploader
      .upload(image.data)

      .then(async (result) => {
        const user = new userSchema({
          email: req.body.email,
          password: hashedpass,
          img: result.url,
        });

        await user.save();
      });

    res.status(200).json({
      message: "Registered",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
