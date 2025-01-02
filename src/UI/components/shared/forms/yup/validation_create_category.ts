import * as Yup from 'yup';

export const validationCreateCategoryForm = Yup.object().shape({
  title: Yup.string().required('The title is required'),
});
