import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Monthly = () => {
  const [graphData, setGraphData] = useState({
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [{ data: [0, 0, 0, 0, 0] }],
  });

  const [prayersOffered, setPrayersOffered] = useState(0);

  useEffect(() => {
    const fetchPrayerRecord = async () => {
      try {
     
        const past30Days = [];
        const currentDate = new Date();

       
        for (let i = 0; i < 30; i++) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - i);
          past30Days.unshift(date.toISOString().slice(0, 10)); 
        }

        
        const past30DaysData = Array(5).fill(0);
        let totalPrayersCount = 0;

        
        for (const date of past30Days) {
          const savedRecordJSON = await AsyncStorage.getItem(`prayerRecord_${date}`);
          if (savedRecordJSON) {
            const savedRecord = JSON.parse(savedRecordJSON);
            const { checkedPrayers, checkedGroupPrayers } = savedRecord;

           
            graphData.labels.forEach((prayer, index) => {
              if (checkedPrayers.includes(prayer) || checkedGroupPrayers.includes(prayer)) {
                past30DaysData[index]++;
                totalPrayersCount++;
              }
            });
          }
        }

        
        setGraphData(prevState => ({
          ...prevState,
          datasets: [{ data: past30DaysData }],
        }));

       
        setPrayersOffered(totalPrayersCount);
      } catch (error) {
        console.error('Error fetching prayer record:', error);
      }
    };

    fetchPrayerRecord();
  }, []);

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
      <Text style={styles.title}>Prayer Record Graph for Past 30 Days</Text>
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
      <Text style={styles.prayerOfferedText}>You Offered 0 out of 150 Prayers</Text>
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
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
  prayerOfferedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9',
  },
});

export default Monthly;
