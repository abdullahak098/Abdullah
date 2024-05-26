
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calendar from './src/screens/Calendar';
import PrayerRecord from './src/screens/PrayerRecord';
import Streak from './src/screens/Streak';
import Tabs from './src/screens/Tabs';
import { Provider } from 'react-redux';
import store from './src/redux/store';
const Tab = createBottomTabNavigator();


const App = () => {
  
return (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="PrayerRecord" component={PrayerRecord} />
        <Tab.Screen name="Streak" component={Streak} />
        <Tab.Screen name="Tabs" component={Tabs} />
 
      </Tab.Navigator>
      
    </NavigationContainer>
    </Provider>
  );
};

export default App;