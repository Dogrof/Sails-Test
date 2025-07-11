/**
 * StoriesController
 *
 * @description :: Server-side logic for managing stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getStories:function(req, res){
    console.log(req.query);
        Stories.find({}).exec(function(err, stories){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('homepage', {stories:stories});
        });
    },

};

