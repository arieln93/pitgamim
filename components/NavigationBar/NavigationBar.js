import React from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Styles from './styles'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import ExploreScreen from '../../screens/ExploreScreen/ExploreScreen'
import FavoritesScreen from '../../screens/FavoritesScreen/FavoritesScreen'
import AboutScreen from '../../screens/AboutScreen/AboutScreen'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'

const Tab = createBottomTabNavigator();
const infoIcon = require('../../icons/info.png')
const favoriteIcon = require('../../icons/favorite.png')
const searchIcon = require('../../icons/search.png')
const homeIcon = require('../../icons/home.png')

const screens = [
  {
    key: 'home',
    name: Dictionary.HOME_SCREEN.TITLE,
    icon: homeIcon,
    component: HomeScreen,
  },
  {
    key: 'explore',
    name: Dictionary.EXPLORE_SCREEN.TITLE,
    icon: searchIcon,
    component: ExploreScreen,
  },
  {
    key: 'favorites',
    name: Dictionary.FAVORITES_SCREEN.TITLE,
    icon: favoriteIcon,
    component: FavoritesScreen,
  },
  {
    key: 'about',
    name: Dictionary.ABOUT_SCREEN.TITLE,
    icon: infoIcon,
    component: AboutScreen,
  }
]

const NavigationBar = props => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: Styles.tabBar,
          tabStyle: {
            margin: 5
          }
        }}
      >
        { screens.map(screen => (
            <Tab.Screen
              key={screen.key}
              title={screen.name}
              name={screen.name}
              component={screen.component}
              options={{
                tabBarIcon: ({ focused }) => (<Image source={screen.icon} style={Styles.icon(focused)}/>),
                tabBarLabel: ({ focused }) => (<Text style={Styles.title(focused)}>{screen.name}</Text>)
              }}
            />
          ))
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default NavigationBar