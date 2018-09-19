import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import AccountScreen from './screens/AccountScreen'
import TabAScreen from './screens/TabAScreen'
import TabBScreen from './screens/TabBScreen'
import TabCScreen from './screens/TabCScreen'

const Stacks = createStackNavigator({
  Home: HomeScreen,
  Account: AccountScreen,
  Chat: ChatScreen
})

const Tabs = createBottomTabNavigator(
  {
    TabA: createStackNavigator({
      TabAStack: TabAScreen,
      TabBStack: TabBScreen,
      TabCStack: TabCScreen
    }),
    TabB: TabBScreen,
    TabC: TabCScreen
  },
  {
    animationEnabled: true
  }
)

const StacksWithDrawerWithTabs = createStackNavigator({
  DrawerWithTab: createDrawerNavigator({
    Home: HomeScreen,
    Account: AccountScreen,
    Chat: createMaterialTopTabNavigator({
      Chat: ChatScreen,
      TabA: createBottomTabNavigator({
        TabA: TabAScreen,
        Home: HomeScreen
      }),
      TabC: createBottomTabNavigator({
        'And now the end is near?': HomeScreen,
        TabC: TabCScreen,
        TabB: createDrawerNavigator({
          'new world?': TabBScreen,
          yeah: ChatScreen
        })
      })
    })
  }),
  TabWithDrawer: createMaterialTopTabNavigator({
    TabA: createDrawerNavigator({
      TabA: TabAScreen,
      Chat: ChatScreen
    })
  })
})

const App = createDrawerNavigator(
  {
    Stack: Stacks,
    Tabs: Tabs,
    StacksWithDrawerWithTabs: StacksWithDrawerWithTabs
  },
  {
    initialRouteName: 'Stack'
  }
)

export default App
