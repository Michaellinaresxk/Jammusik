import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import RadioButton from "../RadioButton";
import { UserInfo } from "../../../../types/formTypes";

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

      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="userId"
            value={userId}
            placeholderTextColor="#838282"
            onChangeText={setUserId}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="Location"
            value={location}
            placeholderTextColor="#838282"
            onChangeText={setLocation}
          />
          <View style={globalFormStyles.radioButtonContainer}>
            <Text style={globalFormStyles.radioButtonTitle}>Skills</Text>
            <RadioButton
              options={options}
              setSelectedSkill={setSelectedSkill}
              selectedSkill={selectedSkill}
            />
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
            label="Save Changes"
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.light}
            btnFontSize={20}
            onPress={onProfile}
          />
        </View>
      </View>
    </View>
  );
};
