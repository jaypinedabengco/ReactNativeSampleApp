import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

class FBLoginButton extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onCancelled: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  /**
   *
   */
  _fbLoginFinishedHandler = async (error, result) => {
    const { onSuccess, onCancelled, onError } = this.props
    if (error) {
      return onError(error)
    }
    if (result.isCancelled) {
      return onCancelled('login cancelled')
    }
    const data = await AccessToken.getCurrentAccessToken()
    return onSuccess(data.accessToken.toString())
  }

  /**
   *
   */
  _fbLogoutFinishedHandler = async () => {
    this.props.onLogout()
  }

  render() {
    const fbPublishPermissions = ['email']
    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={fbPublishPermissions}
          onLoginFinished={this._fbLoginFinishedHandler}
          onLogoutFinished={this._fbLogoutFinishedHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})

export default FBLoginButton
