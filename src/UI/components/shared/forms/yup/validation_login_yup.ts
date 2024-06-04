import * as Yup from 'yup'



export const validationLoginForm = Yup.object().shape({
  email:
    Yup.string()
      .email('The email is not valid')
      .required("The email is required")
  ,

  password:
    Yup.string().required('The password is required')
      .min(4, 'Password have it more than 4 words')


})