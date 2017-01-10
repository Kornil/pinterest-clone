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
                likes: 0,
                likedBy: []
            });            
        newImage.save(function(err) {
            if (err) throw err;
            res.redirect('/profile');
        });  
    });

    app.delete('/profile/:id', function(req, res){
        Image.findByIdAndRemove(req.params.id, function(err){
            if (err) throw err;
            res.redirect('/profile');
        });
    });

    app.post('/profile/retweet', function(req, res){
        Image.findById(req.body.id, function(err, originalImage){
            if (err) throw err;
            var retweet = Image({
                username: req.user.username,
                title: originalImage.title,
                imageLink: originalImage.imageLink,
                likes: 0,
                likedBy: []
            });
            retweet.save(function(err) {
                if (err) throw err;
                res.redirect('/profile');
            });
        });
    });

    app.post('/like', function(req, res){
        Image.findByIdAndUpdate(req.body.id, {$inc: { likes: 1} }, function(err){
            if (err) throw err;
            res.redirect('/index');
        })
    });

};