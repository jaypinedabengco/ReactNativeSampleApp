import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, AsyncStorage, StyleSheet } from 'react-native'
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
    } catch (errorMessage) {
      this.setState({ loginErrorMessage: errorMessage })
      this.setState({ isLoginOngoing: false })
    }
  }

  /**
   *
   */
  _onFBLoginSuccess = async token => {
    await AsyncStorage.setItem('userToken', token)
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
    return (
      <View style={styles.container}>
        <FBLoginButton
          onSuccess={this._onFBLoginSuccess}
          onCancelled={this._onFBLoginCancelled}
          onError={this._onFBLoginError}
          onLogout={this._onFBLogout}
        />
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
