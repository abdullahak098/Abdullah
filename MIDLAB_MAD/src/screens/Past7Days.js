import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Past7DaysGraph = () => {
  const isFocused = useIsFocused();

  const [graphData, setGraphData] = useState({
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [{ data: [0, 0, 0, 0, 0] }],
  });

  const [totalPrayers, setTotalPrayers] = useState(0);
  const fetchPast7DaysRecords = useCallback(async () => {
    try {
      const currentDate = new Date('2024-05-12'); // Assuming today's date is 12th May 2024
      const past7Days = [];
    
      // Generate dates for the past 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        past7Days.unshift(date.toISOString().slice(0, 10)); // Add the date to the beginning of the array
      }
  
      const past7DaysData = Array(5).fill(0); // Initialize an array to store data for each prayer
      let totalPrayersCount = 0;
    
      // Iterate over each day in the past 7 days
      for (const date of past7Days) {
        const savedRecordJSON = await AsyncStorage.getItem(`prayerRecord_${date}`);
        if (savedRecordJSON) {
          const savedRecord = JSON.parse(savedRecordJSON);
          const { checkedPrayers, checkedGroupPrayers } = savedRecord;
  
          // Update data for each prayer based on the saved record
          graphData.labels.forEach((prayer, index) => {
            if (checkedPrayers.includes(prayer) || checkedGroupPrayers.includes(prayer)) {
              past7DaysData[index]++;
              totalPrayersCount++;
            }
          });
        }
      }
  
      // Update the graph data and total prayers count
      setGraphData(prevState => ({
        ...prevState,
        datasets: [{ data: past7DaysData }],
      }));
      setTotalPrayers(totalPrayersCount);
    } catch (error) {
      console.error('Error fetching past seven days records:', error);
    }
  }, [graphData.labels]);
  
  useEffect(() => {
    if (isFocused) {
      fetchPast7DaysRecords();
    }
  }, [isFocused, fetchPast7DaysRecords]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prayer Record Graph for Past 7 Days</Text>
      <LineChart
        data={graphData}
        width={350}
        height={220}
        yAxisSuffix=""
        fromZero={true}
        chartConfig={chartConfig}
        style={styles.chart}
        bezier
        renderDotContent={({ x, y, index, value }) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: getPrayerColor(graphData.labels[index]) },
              { top: y - 4, left: x - 4 },
            ]}
          />
        )}
      />
      <View style={styles.legendContainer}>
        {graphData.labels.map((prayer, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: getPrayerColor(prayer) }]} />
            <Text style={styles.legendText}>{prayer}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.prayerOfferedText}>
        You Offered {totalPrayers} out of {7 * 5} prayers
      </Text>
    </View>
  );
};

const getPrayerColor = (prayer) => {
  switch (prayer) {
    case 'Fajr':
      return 'red';
    case 'Dhuhr':
      return 'green';
    case 'Asr':
      return 'blue';
    case 'Maghrib':
      return 'purple';
    case 'Isha':
      return 'orange';
    default:
      return 'black';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  prayerOfferedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default Past7DaysGraph;
