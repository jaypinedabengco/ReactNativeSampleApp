import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#16a085'
    },
    headerTitleStyle: {
      color: 'white'
    }
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props
    const users = [
      { name: 'Rick' },
      { name: 'Morty' },
      { name: 'Summer' },
      { name: 'Beth' },
      { name: 'Jerry' }
    ]

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View>
          {users.map((user, i) => (
            <Button
              key={i}
              title={`Chat with ${user.name}`}
              onPress={() => navigation.navigate('Chat', { name: user.name })}
            />
          ))}
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
