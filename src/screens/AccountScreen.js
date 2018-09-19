import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class AccountScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text>Account</Text>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
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

export default AccountScreen
