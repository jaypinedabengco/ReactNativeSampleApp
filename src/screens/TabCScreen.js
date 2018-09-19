import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

class TabC extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    // const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text>TabC</Text>
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

export default TabC
