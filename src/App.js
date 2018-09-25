import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import FacebookUserScreen from './screens/FacebookUserScreen'
import PDFMakeDemoScreen from './screens/PDFMakeDemoScreen'

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  FacebookProfileInfo: FacebookUserScreen,
  PDFMakeDemo: PDFMakeDemoScreen
})
const AuthStack = createStackNavigator({ LogIn: LoginScreen })

/**
 * Main App
 */
const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default App
