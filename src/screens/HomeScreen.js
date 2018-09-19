import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Button
          title="Details"
          onPress={() => navigation.navigate('Details')}
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

export default HomeScreen
