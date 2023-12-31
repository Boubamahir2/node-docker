const Post = require('../models/postModel.js');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    });
  }
};
exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.find(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
