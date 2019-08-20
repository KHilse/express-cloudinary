require("dotenv").config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var multer = require("multer");
var upload = multer({ dest:"./uploads/" });
var cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name:process.env.cloud_name,
	api_key:process.env.api_key,
	api_secret:process.env.api_secret
})

app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.get('/', function(req, res) {
  res.render('index', {
  	recentUpload: ""
  });
});

app.post("/", upload.single("myFile"), (req, res) => {
	// res.send(req.file);
	cloudinary.uploader.upload(req.file.path, result => {
		res.render("index", {
			recentUpload: result.secure_url
		})
	});
})

app.listen(3000);
