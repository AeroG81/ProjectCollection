var express = require('express');
var router = express.Router();

router.get('/', ensureAunthenticated,function(req,res){
    res.render('index');
})      

function ensureAunthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}


module.exports = router;