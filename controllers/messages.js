var db = require('../db');
var table_name = 'messages';

var messages = {
    get: function (req, res, next) {
        var _last_id = req.sanitize(req.query.last_id);
        if(_last_id){
            db.select('*')
                .from(table_name)
                .where('messages_id', '>',_last_id)
                .then(function (rows) {
                    res.json(rows);
                })
        }else{
            db.select('*')
                .from(table_name)
                .then(function (rows) {
                    res.json(rows);
                })
        }
    },
    post: function (req, res, next) {
        req.body.user_id = req.sessionID;
        req.body.nickname = req.sanitize(req.body.nickname);
        req.body.message = req.sanitize(req.body.message);
        db(table_name)
            .returning('messages_id')
            .insert(req.body)
            .then(function (ids) {
                return db.first('*').from(table_name).whereIn('messages_id', ids);
            })
            .then(function (row) {
                res.json(row);
            });
    }
};
module.exports = messages;