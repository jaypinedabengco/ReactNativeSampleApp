import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class TabA extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text>TabA</Text>
        <Button title="TabB" onPress={() => navigation.navigate('TabBStack')} />
        <Button title="TabC" onPress={() => navigation.navigate('TabCStack')} />
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

export default TabA
