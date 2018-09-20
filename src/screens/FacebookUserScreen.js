import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View, Text, Image, StyleSheet } from 'react-native'
import FacebookAPI from './../api/FacebookAPI'

class FacebookUserScreen extends Component {
  static navigationOptions = {
    title: 'Facebook User Info'
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fbProfileInformation: null,
      notLoggedInViaFB: null
    }

    this._fetchFacebookUserInformation()
  }

  /**
   *
   */
  _fetchFacebookUserInformation = async () => {
    const fieldsToFetch =
      'first_name, last_name, name, email, picture.type(large)'

    const isLoggedIn = await FacebookAPI.isLoggedIn()

    if (!isLoggedIn) {
      this.setState({ notLoggedInViaFB: true })
      return
    }

    const fbProfileInformation = await FacebookAPI.fetchUserInformation(
      fieldsToFetch
    )
    // create 'profile_picture_url' field to make it more accessible
    // on render
    fbProfileInformation.profile_picture_url =
      fbProfileInformation.picture.data.url
    this.setState({ fbProfileInformation: fbProfileInformation })
  }

  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString())
    } else {
      alert('Success fetching data: ' + result.toString())
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    // const { navigation } = this.props
    const { fbProfileInformation, notLoggedInViaFB } = this.state
    return (
      <View style={styles.container}>
        {fbProfileInformation ? (
          <View>
            <Image
              style={styles.profilePicture}
              source={{
                uri: fbProfileInformation.profile_picture_url
              }}
            />
            <Text>Firstname : {fbProfileInformation.first_name}</Text>
            <Text>Lastname : {fbProfileInformation.last_name}</Text>
            <Text>Email : {fbProfileInformation.email}</Text>
          </View>
        ) : notLoggedInViaFB ? (
          <Text>You are not logged in via FB</Text>
        ) : (
          <Text>Loading...</Text>
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
  },
  profilePicture: {
    width: 50,
    height: 50
  }
})

export default FacebookUserScreen
