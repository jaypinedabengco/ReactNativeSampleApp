import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  AsyncStorage,
  Button,
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from 'react-native'
import { login } from './../api/LoginAPI'
import FBLoginButton from './../components/CustomFBLoginButton'

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoginOngoing: false,
      loginErrorMessage: null
    }
  }

  _signinAsync = async () => {
    try {
      this.setState({ isLoginOngoing: true })
      const token = await login('johndoe@yopmail.com', 'hello')
      await AsyncStorage.setItem('userToken', token)
      this.props.navigation.navigate('App')
      this.setState({ isLoginOngoing: false })
    } catch (errorMessage) {
      alert(errorMessage)
      this.setState({ loginErrorMessage: errorMessage })
      this.setState({ isLoginOngoing: false })
    }
  }

  /**
   *
   */
  _onFBLoginSuccess = async () => {
    this.props.navigation.navigate('App')
  }

  /**
   *
   */
  _onFBLoginCancelled = () => {
    alert('Login Cancelled')
  }

  /**
   *
   */
  _onFBLoginError = error => {
    alert(`Login Failed ${error.message}`)
  }

  _onFBLogout = () => {
    alert('Logged out!')
  }

  render() {
    const { isLoginOngoing } = this.state
    return (
      <View style={styles.container}>
        {isLoginOngoing ? (
          <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        ) : (
          <View>
            <Button title="Normal Login" onPress={this._signinAsync} />
            <FBLoginButton
              onSuccess={this._onFBLoginSuccess}
              onCancelled={this._onFBLoginCancelled}
              onError={this._onFBLoginError}
              onLogout={this._onFBLogout}
            />
          </View>
        )}
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

export default LoginScreen
