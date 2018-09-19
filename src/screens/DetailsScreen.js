import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class DetailsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text>Details</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
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

export default DetailsScreen
