import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import commentSchema from "../validators/commentSchema";

const CommentForm = ({ onSubmit, defaultValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <textarea {...register("text")} placeholder="Your comment..." className="w-full border p-2" />
      <p className="text-red-700">{errors.text?.message}</p>
      <button className="bg-red-700 text-white px-3 py-1 rounded">Post</button>
    </form>
  );
};

export default CommentForm;
