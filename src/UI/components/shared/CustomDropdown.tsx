import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  items: DropdownItem[];
  defaultValue: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const CustomDropdown = ({
  items,
  defaultValue,
  placeholder,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue); // Correctly update internal state when defaultValue changes
  }, [defaultValue]);

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue); // Correctly pass the new value up to the parent component
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={onValueChange} // Correctly use the custom handler
        items={items}
        placeholder={placeholder}
        style={styles.pickerStyle}
        dropDownContainerStyle={styles.dropdownStyle}
        placeholderStyle={{ color: "gray" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    zIndex: 1,
  },
  pickerStyle: {
    backgroundColor: "#fafafa",
    borderColor: "#dfdfdf",
  },
  dropdownStyle: {
    backgroundColor: "#fafafa",
  },
});
