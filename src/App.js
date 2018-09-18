import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'

const App = createStackNavigator({
  Home: { screen: HomeScreen }
})

export default App
