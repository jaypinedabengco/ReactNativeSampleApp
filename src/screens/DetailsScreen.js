import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet } from 'react-native'

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const itemId = navigation.getParam('itemId', '')
    return {
      title: `Details with id of ${itemId}`,
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  render() {
    const { navigate, goBack, getParam, setParams } = this.props.navigation
    const itemId = getParam('itemId', 'NO-ID')
    const otherParam = getParam('otherParam', 'no other param ok!')

    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text>Item 1 {itemId}</Text>
        <Text>otherParam {otherParam}</Text>
        <Button
          title="Change Id"
          onPress={() =>
            setParams({ itemId: Math.floor(Math.random() * 10000) })
          }
        />
        <Button
          title="Go to Home"
          onPress={() =>
            navigate('Home', {
              itemId: itemId,
              otherParam: `Anything i want? then this : ${itemId}`
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

export default DetailsScreen
