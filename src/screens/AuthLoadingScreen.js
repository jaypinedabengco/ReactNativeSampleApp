import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacebookAPI from './../api/FacebookAPI'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'

class AuthLoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    let isLoggedIn = !!userToken
    // check if logged in via fb
    if (!isLoggedIn) {
      isLoggedIn = await FacebookAPI.isLoggedIn()
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AuthLoadingScreen
