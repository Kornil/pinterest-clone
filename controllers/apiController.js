var Image = require('../models/imageModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/profile', function(req, res){
        var newImage = Image({
               username: "test",
               text: req.body.text,
           });
           newImage.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });
    })
};