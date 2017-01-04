var Image = require('../models/imageModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/profile', function(req, res){
        if(!req.body || req.body.length === 0) {
            console.log('request body not found');
            return res.sendStatus(400);
        }
        var newImage = Image({
               username: req.user.username,
               title: req.body.title,
               imageLink: req.body.imageLink,
               likes: 0
           });
           newImage.save(function(err) {
               if (err) throw err;
               res.redirect('/profile');
           });
    })
};