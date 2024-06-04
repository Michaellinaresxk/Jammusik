import * as Yup from "yup";

export const validationCreatePlaylistForm = Yup.object().shape({
  title: Yup.string().required("The title is required"),
});
