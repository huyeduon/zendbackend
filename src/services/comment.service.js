const MyModel = require("../models/comment.model");

// Create a new category
const createComment = async (data) => {
  const { post_id, comment_content, user_id, parent_id = null } = data;
  let val = 0;
  const comment = new MyModel({
    post_id,
    comment_content,
    user_id,
    parent_id,
  });

  if (parent_id) {
    const parent_comment = await MyModel.findById(parent_id);
    val = parent_comment.comment_right;
    await MyModel.updateMany(
      {
        post_id,
        comment_right: { $gte: val },
      },
      {
        $inc: { comment_right: 2 },
      }
    );

    await MyModel.updateMany(
      {
        post_id,
        comment_left: { $gt: val },
      },
      {
        $inc: { comment_left: 2 },
      }
    );
  } else {
    // comment to root node (first comment)
    // check if post has a comment by checking the last comment
    const getMaxRight = await MyModel.findOne(
      { post_id: post_id },
      "comment_right",
      { sort: { comment_right: -1 } }
    );

    if (getMaxRight) {
      val = getMaxRight.comment_right + 1;
    } else {
      val = 1;
    }
  }

  comment.comment_left = val;
  comment.comment_right = val + 1;
  await comment.save();

  return { message: "Create Successfully" };
};

const getComment = async (data) => {
  const { post_id, comment_id } = data;
  let allComments = [];

  if (!comment_id) {
    allComments = await MyModel.find({ post_id });
  } else {
    let { comment_left, comment_right } = await MyModel.findById(comment_id);
    allComments = await MyModel.find({
      post_id: post_id,
      comment_left: { $gt: comment_left },
      comment_right: { $lt: comment_right },
    });
  }

  return { allComments };
};

module.exports = {
  createComment,
  getComment,
};
