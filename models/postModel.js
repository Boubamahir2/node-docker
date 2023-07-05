const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: [true, 'Post must have a title'],
  },
  body: {
    type: 'string',
    required: [true, 'Post must have body'],
  },
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post