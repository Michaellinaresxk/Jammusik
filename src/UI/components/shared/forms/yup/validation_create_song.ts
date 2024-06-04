import * as Yup from "yup";

export const validationCreateSongForm = Yup.object().shape({
  title: Yup.string().required("The title is required"),
  artist: Yup.string().required("The artist is required"),
});
