import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [value, setValue] = useState(null);

  const onValueChange = (newValue: string | null) => {
    setValue(newValue);
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={onValueChange}
        items={items}
        placeholder={placeholder}
        style={styles.pickerStyle}
        dropDownContainerStyle={styles.dropdownStyle}
        placeholderStyle={{color: 'gray'}}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
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
    backgroundColor: '#fafafa',
    borderColor: '#dfdfdf',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
});
