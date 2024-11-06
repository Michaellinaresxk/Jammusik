import React from 'react';
import {ActivityIndicator, Text, TextInput, View} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';
import {Formik} from 'formik';
import {validationCreateCategoryForm} from './yup/validation_create_category';

type CategoryForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onCreateCategory: () => Promise<void>;
  isLoading: boolean;
};

export const FormCreateCategory = ({
  title,
  setTitle,
  onCreateCategory,
  isLoading,
}: CategoryForm) => {
  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        validationSchema={validationCreateCategoryForm}
        initialValues={{title: ''}}
        onSubmit={onCreateCategory}>
        {({values, handleChange, errors, touched, handleSubmit}) => (
          <View style={globalFormStyles.form}>
            <View>
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                placeholder="Title"
                value={values.title}
                autoCorrect={false}
                onChangeText={handleChange('title')}
              />
              {errors.title && touched.title ? (
                <Text style={{color: 'red'}}>{errors.title}</Text>
              ) : null}
            </View>
            <PrimaryButton
              label={
                !isLoading ? (
                  'Create Category'
                ) : (
                  <ActivityIndicator size={'large'} />
                )
              }
              bgColor={globalColors.primary}
              borderRadius={5}
              colorText={globalColors.light}
              btnFontSize={20}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
