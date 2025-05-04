import Comment from "./Comment";

const CommentList = ({ comments, onDelete, currentUser }) => {
  return (
    <div className="space-y-2 mt-4">
      {comments.map(c => (
        <Comment
          key={c.id}
          comment={c}
          onDelete={onDelete}
          isOwner={currentUser?.id === c.userId}
        />
      ))}
    </div>
  );
};

export default CommentList;
