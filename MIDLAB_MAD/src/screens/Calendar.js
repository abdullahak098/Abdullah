import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars'; // Rename the imported Calendar component
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../redux/actions'; // Correct the path based on your directory structure
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => { // Rename the component to CalendarScreen
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
    navigation.navigate('PrayerRecord');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salah Tracker</Text>
      <View style={styles.calendarContainer}>
        <RNCalendar // Use the renamed Calendar component
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={{ [Date.now()]: { selected: true } }}
          theme={{
            selectedDayBackgroundColor: '#2980b9',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#2980b9',
            arrowColor: '#2980b9',
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto',
            textDayHeaderFontFamily: 'Roboto',
            textDayFontWeight: '400',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2980b9',
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    elevation: 5,
  },
});

export default CalendarScreen;
