import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View, Text, Image, StyleSheet } from 'react-native'
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

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
      fbProfileInformation: null
    }
    this._fetchUserInfo()
  }

  _fetchUserInfo = async () => {
    const accessToken = await AsyncStorage.getItem('userToken')
    const fields = 'first_name, last_name, name, email, picture.type(large)'

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: fields
          }
        }
      },
      (err, result) => {
        if (err) {
          return alert(err)
        }
        this.setState({
          fbProfileInformation: result
        })
      }
    )
    new GraphRequestManager().addRequest(infoRequest).start()
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
    const { fbProfileInformation } = this.state
    return (
      <View style={styles.container}>
        {fbProfileInformation ? (
          <View>
            <Image
              style={styles.profilePicture}
              source={{
                uri: fbProfileInformation.picture.data.url
              }}
            />
            <Text>Firstname : {fbProfileInformation.first_name}</Text>
            <Text>Lastname : {fbProfileInformation.last_name}</Text>
            <Text>Email : {fbProfileInformation.email}</Text>
          </View>
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
