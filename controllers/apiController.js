'use strict';
var Image = require('../models/imageModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/profile', function(req, res){
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
    });

    app.delete('/profile/:id', function(req, res){
        Image.findByIdAndRemove(req.param.id, function(err){
            if (err) throw err;
            res.redirect('/profile');
        });
    });
};