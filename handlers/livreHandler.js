let MessageModel = require("../models/message.js");
const createHttpError = require("http-errors");
const { body, validationResult } = require('express-validator');

module.exports = {
    post: (req, res, next) => {
        console.log("Handled POST request");
        console.log(req.body);
        if (req.body.name!==undefined || req.body.message!==undefined)  {
            body('name').not().isEmpty().trim().escape();
            body('message').not().isEmpty().trim().escape();
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                let newMessage = new MessageModel({
                    name: req.body.name,
                    message: req.body.message
                });
                newMessage.save(err => {
                    if (err) return next(new createHttpError.InternalServerError(err));
                });
            } else console.error(errors.errors);   
            res.redirect('/livre');
        }
        
    },

    getAll: (req, res, next) => {
        MessageModel.find().lean().sort({$natural:-1}).exec( (err, doc) => {
            res.locals.doc = doc;
            next();
        });
    }
}