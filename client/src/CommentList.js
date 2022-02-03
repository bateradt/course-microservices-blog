import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const getComments = async () => {
  //   const response = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(response.data);
  // };

  // useEffect(() => {
  //   getComments();
  // }, []);

  const showComment = (comment) => {
    switch (comment.status) {
      case "pending":
        return "The comment is waiting admin moderation!";
        break;
      case "rejected":
        return "The comment has been rejected!";
        break;
      default:
        return comment.content;
    }
  };

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{showComment(comment)}</li>;
  });

  return (
    <div className="d-flex flex-row flew-wrap justify-content-between">
      <div>{`${comments.length} comments`}</div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
