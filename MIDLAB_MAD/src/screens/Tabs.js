import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Graph from "./Graph";
import Monthly from "./Monthly";
import Past7Days from "./Past7Days";
const Tab= createBottomTabNavigator()
function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Graph" component={Graph}/>
            <Tab.Screen name="Monthly" component={Monthly}/>
            <Tab.Screen name="Past7Days" component={Past7Days}/>
        </Tab.Navigator>
        
    )
}
export default Tabs