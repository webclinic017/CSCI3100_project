const express = require('express');

const router = express.Router();

const Bookmark = require('../models/bookmark');


router.get('/', (req, res) => {

    Bookmark.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:username/:stock_asc', (req, res) => {
    Bookmark.find({username: req.params.username}).sort({"stock": req.params.stock_asc})
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.route('/find/:username/:stock').get((req, res, next) => {
    try{
        Bookmark.findOne( {username: req.params.username, stock: req.params.stock}
            ,(error, data) => {
            if (error) {
                return next(error);
            } else {
                if (data !== null){
                    console.log('Data sd');
                    res.json(1);
                }else{
                    res.json(0);
                }
            }
            });
    }catch{
        return -1;
    }
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newBookmark = new Bookmark(data);

    newBookmark.save((error) => {
        if (error) {
            res.status(500).json(err);
            return;
        }

        return res.json({
            msg: 'Your data has been saved.'
        });
    });
});

router.route('/update').put((req, res, next) => {
    try{
        Bookmark.findOneAndUpdate( {username: req.body.username, stock: req.body.stock} , {
            $set: req.body
            }, {
                new: true,
                upsert: true
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('bookmark updated !')
            }
            });
    }catch{
        return -1;
    }
});

router.route('/delete').put((req, res, next) => {
    try{
        Bookmark.findOneAndDelete( {username: req.body.username, stock: req.body.stock},(error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log('bookmark deleted !')
            }
            });
    }catch{
        return -1;
    }
});

module.exports = router;