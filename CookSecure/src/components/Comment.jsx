const Comment = ({ comment, onDelete, isOwner }) => {
    return (
      <div className="border p-2 bg-gray-200 rounded dark:bg-gray-700 dark:text-white">
        <p>{comment.text}</p>
        {isOwner && (
          <button onClick={() => onDelete(comment.id)} className="text-red-700 text-sm">
            Delete
          </button>
        )}
      </div>
    );
  };
  
  export default Comment;
  