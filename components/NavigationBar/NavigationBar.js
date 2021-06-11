import React from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Styles from './styles'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import ExploreScreen from '../../screens/ExploreScreen/ExploreScreen'
import ExportScreen from '../../screens/ExportScreen/ExportScreen'
import FavoritesScreen from '../../screens/FavoritesScreen/FavoritesScreen'
import AboutScreen from '../../screens/AboutScreen/AboutScreen'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: Dictionary.HOME_SCREEN.NAME,
    title: Dictionary.HOME_SCREEN.TITLE,
    icon: Icons.home,
    component: HomeScreen,
  },
  {
    name: Dictionary.EXPLORE_SCREEN.NAME,
    title: Dictionary.EXPLORE_SCREEN.TITLE,
    icon: Icons.search,
    component: ExploreScreen,
  },
  {
    name: Dictionary.EXPORT_SCREEN.NAME,
    title: Dictionary.EXPORT_SCREEN.TITLE,
    icon: Icons.generator,
    component: ExportScreen,
  },
  {
    name: Dictionary.FAVORITES_SCREEN.NAME,
    title: Dictionary.FAVORITES_SCREEN.TITLE,
    icon: Icons.favorite,
    component: FavoritesScreen,
  },
  {
    name: Dictionary.ABOUT_SCREEN.NAME,
    title: Dictionary.ABOUT_SCREEN.TITLE,
    icon: Icons.info,
    component: AboutScreen,
  },
  
]

const NavigationBar = props => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          initialRouteName: 'home',
          keyboardHidesTabBar: true,
          style: Styles.tabBar,
          tabStyle: {
            margin: 5
          }
        }}
      >
        { screens.map(screen => (
          <Tab.Screen
            key={screen.name}
            title={screen.title}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image source={screen.icon} style={Styles.icon(focused)}/>
              ),
              tabBarLabel: ({ focused }) => (
                <Text style={Styles.title(focused)}>{screen.title}</Text>
              )
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar