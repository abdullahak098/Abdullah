import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStreakCount, resetStreakCount } from '../redux/actions';

const Streak = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const streakCount = useSelector((state) => state.streak.streakCount);
  const prayerRecords = useSelector((state) => state.prayer.prayerRecords);

  useEffect(() => {
    const checkStreak = async () => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const lastRecordDate = await AsyncStorage.getItem('lastRecordDate');
  
      const todayRecords = prayerRecords.find(record => record.date === today);
  
      if (todayRecords) {
        const count = todayRecords.checkedPrayers.length + todayRecords.checkedGroupPrayers.length;
        if (count === 5 && (lastRecordDate === today || lastRecordDate === yesterday)) {
          if (streakCount === 0) {
            dispatch(setStreakCount(1)); // Increment streak count by 1
          }
        } else {
          if (streakCount !== 0) {
            dispatch(resetStreakCount()); // Reset streak count
          }
        }
      } else {
        if (streakCount !== 0) {
          dispatch(resetStreakCount()); // Reset streak count
        }
      }
  
      // Update last record date
      await AsyncStorage.setItem('lastRecordDate', today);
    };
  
    if (isFocused) {
      checkStreak();
    }
  }, [isFocused, prayerRecords, dispatch, streakCount]);

  const handleNext = () => {
    navigation.navigate('Tabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Streak</Text>
      <View style={styles.menuBar}>
        <FontAwesome5 name="bars" size={24} style={styles.menuItem} />
      </View>
      <View style={styles.bigCircle}>
        <Text style={styles.circleTitle}>Streak</Text>
        <Text style={styles.circleNumber}>{streakCount}</Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2980b9',
  },
  menuBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50,
    marginBottom: 20,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  menuItem: {
    marginBottom: 10,
    color: '#2980b9',
  },
  bigCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#E94B3CFF',
    borderWidth: 5,
  },
  circleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#2980b9',
    padding: 18,
    borderRadius: 10,
    marginTop: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Streak;
