var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/avatar/');
    },
    filename: (req, file, cb) => {
      cb(null, `${req.session.user}${path.extname(file.originalname)}`);
    },
  });

const upload = multer({ storage });
router.use(upload.single('avatar'));

router.get('/', function(req, res){
    res.render("user/profile/user-profile", 
    {layout: "userLayout",
    account: req.session.user
    })
});

router.use('/avatar', express.static('public/avatar'));
let defaultAvatar = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

// API endpoint để lấy đường dẫn avatar
router.get('/api/avatar', (req, res) => {
    res.json({ avatar: defaultAvatar });
});

// API endpoint để cập nhật avatar
router.post('/api/avatar', upload.single('avatar'), (req, res) => {

    const avatarPath = req.file.filename;
    res.json({ avatar: `/avatar/${avatarPath}` });


    // const email = 'example'; // Thay thế bằng logic lấy email của người dùng

    // if (!email || !req.file) {
    //     return res.status(400).json({ success: false, error: 'Invalid request' });
    // }

    // // Generate a unique filename using crypto and preserve the original extension
    // const uniqueFilename = crypto.createHash('md5').update(`${email}-${Date.now()}`).digest('hex');
    // const originalExtension = req.file.originalname.split('.').pop();
    // const fileName = `${uniqueFilename}.${originalExtension}`;

    // const filePath = `public/avatar/${fileName}`;

    // // Ghi file ảnh vào thư mục public/avatar
    // fs.writeFile(filePath, req.file.buffer, (err) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({ success: false, error: 'Failed to save avatar' });
    //     }

    //     defaultAvatar = `/avatar/${fileName}`;
    //     res.json({ success: true, avatar: defaultAvatar });
    // });
});

module.exports = router;