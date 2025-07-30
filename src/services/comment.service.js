const MyModel = require("../models/comment.model");
const { status_code, UNAUTHORIZED } = require("../core/http_response");
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

  // if no comment_id is provided, retrieve all parent comments, not child (level 1 comment)
  if (!comment_id) {
    allComments = await MyModel.find({ post_id, parent_id: null });
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

const deleteComment = async (data) => {
  const { comment_id, user_id: userid } = data;

  const deletedComment = await MyModel.findById(comment_id);
  const { comment_left, comment_right, post_id, user_id } = deletedComment;
  if (userid !== user_id) {
    throw new UNAUTHORIZED(
      "Unauthorized, you cannot delete other person comment"
    );
  }

  const delta = comment_right - comment_left + 1;

  // delete all comment with left less or equal than deletedComment left and right less or equal than deletedcomment right
  //console.log(delta);
  await MyModel.deleteMany({
    comment_left: { $gte: comment_left },
    comment_right: { $lte: comment_right },
    post_id: post_id,
  });

  // update left and right of the remaning comment
  // if left bigger than deletedComment left => left = left - delta
  // if right bigger than deletedComment right => right = right -delta
  await MyModel.updateMany(
    {
      comment_left: { $gt: comment_left },
    },
    { $inc: { comment_left: -delta } }
  );

  await MyModel.updateMany(
    {
      comment_right: { $gt: comment_right },
    },
    { $inc: { comment_right: -delta } }
  );

  return;
};

module.exports = {
  createComment,
  getComment,
  deleteComment,
};
