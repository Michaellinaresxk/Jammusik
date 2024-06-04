import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import RadioButton from "../RadioButton";
import { UserInfo } from "../../../../types/formTypes";
import { Formik } from "formik";
import { validationProfileForm } from "./yup/validation_profile_form";

type ProfileForm = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedSkill: string;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string>>;
  onProfile: (userInfo: UserInfo) => Promise<void>;
  isLoading: boolean;
};

export const FormProfile = ({
  email,
  setEmail,
  name,
  setName,
  userId,
  setUserId,
  location,
  setLocation,
  selectedSkill,
  setSelectedSkill,
  isLoading,
  onProfile,
}: ProfileForm) => {
  const instruments = [
    { name: "Bass", id: "1" },
    { name: "Drums", id: "2" },
    { name: "Vocals", id: "3" },
    { name: "Guitar", id: "4" },
    { name: "Keyboard", id: "5" },
    { name: "DJ Controller", id: "6" },
  ];
  const options = [
    { label: "Musician", value: "musician" },
    { label: "Dj", value: "dj" },
    { label: "Producer", value: "producer" },
  ];
  const dropdownInstruments = instruments.map(instrument => ({
    label: instrument.name,
    value: instrument.id,
  }));

  const [selectedInstrumentId, setSelectedInstrumentId] = useState(
    dropdownInstruments[0].value,
  );

  const onSelect = value => {
    console.log("Selected:", value);
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <Text style={globalFormStyles.labelTitle}>General Information:</Text>
      <Formik
        validationSchema={validationProfileForm}
        initialValues={{ name: '', email: '', location: '', selectedSkill: '', userId, selectedInstrumentId: '' }}

        onSubmit={values => console.log(values)}

      >
        {({ values, errors, handleChange, handleSubmit, touched }) => (

          <View style={globalFormStyles.form}>
            <View>
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name ?
                (
                  <Text style={{ color: 'red' }}>{errors.name}</Text>
                ) : null}
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email ?
                (
                  <Text style={{ color: 'red' }}>{errors.email}</Text>
                ) : null}
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholder="userId"
                value={userId}
                placeholderTextColor="#838282"
                onChangeText={text => setUserId(text)}
              />

              <TextInput
                style={globalFormStyles.inputLogin}
                placeholder="Location"
                value={values.location}
                placeholderTextColor="#838282"
                onChangeText={handleChange('location')}
              />
              {errors.location && touched.location ?
                (
                  <Text style={{ color: 'red' }}>{errors.location}</Text>
                ) : null}

              <View style={globalFormStyles.radioButtonContainer}>
                <Text style={globalFormStyles.radioButtonTitle}>Skills</Text>
                <RadioButton
                  options={options}
                  setSelectedSkill={handleChange('selectedSkill')}
                  selectedSkill={values.selectedSkill}
                />
                {errors.selectedSkill && touched.selectedSkill ?
                  (
                    <Text style={{ color: 'red' }}>{errors.selectedSkill}</Text>
                  ) : null}

              </View>
              <CustomDropdown
                items={dropdownInstruments}
                defaultValue={selectedInstrumentId}
                placeholder="Choose an instrument"
                onChange={setSelectedInstrumentId}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <PrimaryButton
                label={!isLoading ? "Save Changes" : <ActivityIndicator size={'large'} />}
                bgColor={globalColors.primary}
                borderRadius={5}
                colorText={globalColors.light}
                btnFontSize={20}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}


      </Formik>

    </View>
  );
};
