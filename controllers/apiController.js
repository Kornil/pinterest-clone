var Image = require('../models/imageModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/profile', function(req, res){
        /*if (typeof req.body.title === 'string' ||
        req.body.title instanceof String &&
        req.body.imageLink.match(/\.(jpeg|jpg|gif|png)$/) != null){*/
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
        /*}else{
            res.redirect('/profile');
        }*/
    })
};