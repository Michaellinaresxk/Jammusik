import * as Yup from "yup";

export const validationRegisterForm = Yup.object().shape({
  email: Yup.string()
    .email("The email is not valid")
    .required("The email is required"),
  userName: Yup.string()
    .required("The userName is required")
    .min(4, "The userName is not less than 4 words"),
  password: Yup.string()
    .required("The password is required")
    .min(4, "Password have it more than 4 words"),
});
