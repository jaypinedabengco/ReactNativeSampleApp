import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Button, StyleSheet } from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

class CustomFBLoginButton extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onCancelled: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showLoadingModal: false,
      notificationMessage: null
    }
  }

  _loginViaFBNativeOnly = async permissions => {
    try {
      LoginManager.setLoginBehavior('NATIVE_ONLY')
      return await LoginManager.logInWithReadPermissions(permissions)
    } catch (error) {
      console.warn(`native only login error : ${error}`)
      throw error
    }
  }

  _loginViaFBWebOnly = async permissions => {
    try {
      LoginManager.setLoginBehavior('WEB_ONLY')
      return await LoginManager.logInWithReadPermissions(permissions)
    } catch (error) {
      console.warn(`web only login error : ${error}`)
      throw error
    }
  }

  _loginViaFB = async () => {
    let result
    const permissions = ['public_profile', 'email']

    try {
      //   //do native login first
      //   result = this._loginViaFBNativeOnly(permissions)
      //     .then(result => result)
      //     // if login native failed, then do webonly
      //     .catch(() => this._loginViaFBWebOnly(permissions))
      result = await LoginManager.logInWithReadPermissions(permissions)
    } catch (error) {
      console.warn(`Login error ${error}`)
      return this.props.onError(error)
    }

    if (result.isCancelled) {
      //   this.setState({
      //     showLoadingModal: false,
      //     notificationMessage: 'Login cancelled'
      //   })
      return this.props.onCancelled()
    }

    const accessData = await AccessToken.getCurrentAccessToken()
    const accessToken = accessData.accessToken

    return this.props.onSuccess(accessToken)
  }

  render() {
    // const fbPublishPermissions = ['email']
    return (
      <View style={styles.container}>
        <Button title="Login via FB" onPress={this._loginViaFB} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})

export default CustomFBLoginButton
