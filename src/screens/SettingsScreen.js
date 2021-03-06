import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      drawerLabel: 'Settings',
      headerRight: <Button onPress={navigation.toggleDrawer} title="Menu" />
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Text>Settings</Text>
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

export default SettingsScreen
