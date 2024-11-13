const Post = require("../../models/Post");
var slugify = require('slugify');

exports.postsCreate = async (req, res, next) => {
  try {

    const newPost = {
      ...req.body,
      title_slug: slugify(req.body.title)
    };
    if (req.file)
      newPost.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    await Post.create(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsDelete = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId);
    if (foundPost) {
      slugify(foundPost.title);
      await foundPost.deleteOne();
      res.status(204).end();
    } else {
      // res.status(404).json({ message: "post not found" });
      const error = new Error("Post not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsUpdate = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId);
    if (foundPost) {
      await foundPost.updateOne(req.body);
      res.status(204).end();
    } else {
      // res.status(404).json({ message: "post not found" });
      const error = new Error("Post not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

exports.postsGetBySlug = async (req, res, next) => {
  try {
    const foundPost = (await Post.find()).find(post => post.title_slug == req.params.slug)
    res.json(foundPost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
