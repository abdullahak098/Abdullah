import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { savePrayerRecord } from '../redux/actions';

const PrayerRecord = () => {
  const [checkedPrayers, setCheckedPrayers] = useState([]);
  const [checkedGroupPrayers, setCheckedGroupPrayers] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedDate = useSelector((state) => state.prayer.selectedDate);

  const prayers = [
    { name: 'Fajr', urduName: 'فجر' },
    { name: 'Dhuhr', urduName: 'ظهر' },
    { name: 'Asr', urduName: 'عصر' },
    { name: 'Maghrib', urduName: 'مغرب' },
    { name: 'Isha', urduName: 'عشاء' },
  ];

  const handlePrayerRecord = (prayer, type) => {
    if (type === 'individual') {
      if (!checkedPrayers.includes(prayer.name)) {
        setCheckedPrayers([...checkedPrayers, prayer.name]);
        setCheckedGroupPrayers(checkedGroupPrayers.filter(item => item !== prayer.name));
      }
    } else if (type === 'group') {
      if (!checkedGroupPrayers.includes(prayer.name)) {
        setCheckedGroupPrayers([...checkedGroupPrayers, prayer.name]);
        setCheckedPrayers(checkedPrayers.filter(item => item !== prayer.name));
      }
    }
  };

  const handleUncheck = (prayerName) => {
    setCheckedPrayers(checkedPrayers.filter(item => item !== prayerName));
    setCheckedGroupPrayers(checkedGroupPrayers.filter(item => item !== prayerName));
  };

  const isPrayerChecked = (prayer, type) => {
    if (type === 'individual') {
      return checkedPrayers.includes(prayer.name);
    } else if (type === 'group') {
      return checkedGroupPrayers.includes(prayer.name);
    }
    return false;
  };

  const handleNext = () => {
    const prayerRecord = {
      date: selectedDate,
      checkedPrayers,
      checkedGroupPrayers,
    };
  
    dispatch(savePrayerRecord(prayerRecord));
    console.log('Prayer record saved successfully!');
    navigation.navigate('Streak');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Prayer for {selectedDate}</Text>
      {prayers.map((prayer, index) => (
        <View key={index} style={styles.prayerRow}>
          <Text style={styles.prayerText}>{prayer.name} / {prayer.urduName}</Text>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={isPrayerChecked(prayer, 'individual')}
              onPress={() => handlePrayerRecord(prayer, 'individual')}
              containerStyle={styles.checkBox}
            />
            <TouchableOpacity onPress={() => handlePrayerRecord(prayer, 'individual')} style={styles.iconContainer}>
              <Icon name="person" size={30} color="#2980b9" />
            </TouchableOpacity>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={isPrayerChecked(prayer, 'group')}
              onPress={() => handlePrayerRecord(prayer, 'group')}
              containerStyle={styles.checkBox}
            />
            <TouchableOpacity onPress={() => handlePrayerRecord(prayer, 'group')} style={styles.iconContainer}>
              <Icon name="people-group" size={30} color="#2980b9" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleUncheck(prayer.name)} style={styles.iconContainer}>
            <Icon name="times-circle" size={30} color="#2980b9" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2980b9',
    fontWeight: 'bold',
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  prayerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  iconContainer: {
    marginRight: 10,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkBox: {
    borderWidth: 0,
  },
  nextButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PrayerRecord;
