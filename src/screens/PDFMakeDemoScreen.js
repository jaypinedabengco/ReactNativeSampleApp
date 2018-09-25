import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import documentDefinition from './../sample-data/documentDefinition/entry-notice-form-9.json'
import * as pdfMake from 'pdfmake/build/pdfmake.js'
import 'pdfmake/build/vfs_fonts'

class SettingsScreen extends Component {
  async _buildPDF() {
    try {
      const createdPdf = pdfMake.createPdf(documentDefinition)
      createdPdf.getDataUrl(dataUrl => {
        console.log(dataUrl)
      })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>PDFMake Demo</Text>
        <Button title="build pdf" onPress={this._buildPDF} />
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
