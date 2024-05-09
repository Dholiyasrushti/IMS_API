var mongoose = require('mongoose');

var followupschema = new mongoose.Schema({
    reason:{
        type : String
    },
    date:{
        typr:String
    },
    by:{
        typr:String
    },
    inquiry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"inquiry"
    }
})

module.exports = mongoose.model('followup',followupschema);