import * as yup from "yup";

const commentSchema = yup.object().shape({
  text: yup.string().required("Comment is required"),
});

export default commentSchema;
