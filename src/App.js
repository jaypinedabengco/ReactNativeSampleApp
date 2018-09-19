import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
// import ModalScreen from './screens/ModalScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
})

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen
})

const RootStack = createBottomTabNavigator({
  Home: HomeStack,
  Settings: SettingsStack
})

class App extends React.Component {
  render() {
    return <RootStack />
  }
}

export default App
