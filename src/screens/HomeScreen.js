import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      )
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigate, getParam, goBack } = this.props.navigation

    // default
    const itemId = getParam('itemId', 86)
    const otherParam = getParam('otherParam', 'Hey Im default')
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Text>Item Id : {itemId}</Text>
        <Text>otherParam : {otherParam}</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            navigate('Details', {
              itemId: itemId,
              otherParam: otherParam
            })
          }
        />
        <Button title="Go back" onPress={() => goBack()} />
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
