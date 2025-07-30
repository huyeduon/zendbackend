const {
  createComment,
  getComment,
  deleteComment,
} = require("../services/comment.service");
const {
  status_code,
  OK,
  CREATED,
  BAD_REQUEST,
} = require("../core/http_response");
const postComment = async (req, res, next) => {
  const newComment = req.body;
  await createComment(newComment);

  new CREATED({
    message: "Create comment successfully.",
  }).send(res);
};

const getCommentById = async (req, res, next) => {
  const data = await getComment({
    post_id: req.params.id,
    comment_id: req.query.comment_id,
  });

  new OK({
    message: "Get comment successfully.",
    metadata: data,
  }).send(res);
};

const deleteCommentById = async (req, res, next) => {
  // service to deleteComment
  const comment_id = req.params.id;
  const user_id = req.userid;
  await deleteComment({ comment_id, user_id });
  new OK({
    message: "Delete comment successfully.",
  }).send(res);
};

module.exports = {
  postComment,
  getCommentById,
  deleteCommentById,
};
