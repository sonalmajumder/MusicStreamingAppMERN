const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName:{type:String,required:true},
    title:{type:String,required:true},
    genre:{type:String,required:true},
    singer:{type:String,required:true},
    image:{type:String,required:true},
    songUrl:{type:String,required:true},
});

module.exports = mongoose.model('PlaylistItem', wishlistItemSchema);