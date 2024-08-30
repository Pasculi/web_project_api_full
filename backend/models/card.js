const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    require: true,
    validate : function(v){
      return /^(http:\/\/|https:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:?%#[\]@!$&'()*+,;=]*)*#?$/.test(v);
    },
    message: props => `${props.value} is not a valid URL`
  },
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    require: true

  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default:[]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('card',cardSchema)