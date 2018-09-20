import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View, Text, Button, StyleSheet } from 'react-native'
import FacebookAPI from './../api/FacebookAPI'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isFBLogin: false
    }

    FacebookAPI.isLoggedIn().then(isFBLogin => this.setState({ isFBLogin }))
  }

  _signOutAsync = async () => {
    // fb logout
    if (this.state.isFBLogin) {
      await FacebookAPI.logOut()
    } else {
      // normal logout
      await AsyncStorage.clear()
    }

    this.props.navigation.navigate('Auth')
  }

  render() {
    const { navigation } = this.props
    const name = 'Beth'
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View>
          <Button
            title={'View My Facebook Profile'}
            onPress={() => navigation.navigate('FacebookProfileInfo')}
          />
          <Button
            title={`Chat with ${name}`}
            onPress={() => navigation.navigate('Chat', { name: name })}
          />
          <Button title="logout" onPress={this._signOutAsync} />
        </View>
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

export default HomeScreen
