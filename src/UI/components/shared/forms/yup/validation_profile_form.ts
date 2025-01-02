import * as Yup from 'yup';

export const validationProfileForm = Yup.object().shape({
  name: Yup.string().required('The name is required'),
  email: Yup.string().required('The email is required'),
  location: Yup.string().required('The location is required'),
  selectedSkill: Yup.string().required('The skills is required'),
  userId: Yup.string(),
  selectedInstrumentId: Yup.string(),
});
