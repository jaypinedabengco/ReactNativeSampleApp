import React, { Component } from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import documentDefinition from './../sample-data/documentDefinition/entry-notice-form-9.json'
import pdfMake from 'pdfmake/build/pdfmake.js'
import 'pdfmake/build/vfs_fonts'
import Pdf from 'react-native-pdf'

class PDFMakeDemoScreen extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      documentDefinition: documentDefinition,
      base64Pdf: null
    }
  }

  _buildPDF() {
    try {
      this.setState({ base64Pdf: null })
      // clone document definition
      // & prevent document definition being updated
      // which causes unexpected document structure
      const docDef = JSON.parse(JSON.stringify(this.state.documentDefinition))
      const createdPdf = pdfMake.createPdf(docDef)
      createdPdf.getDataUrl(dataUrl => {
        this.setState({ base64Pdf: dataUrl })
      })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const source = { uri: this.state.base64Pdf }
    return (
      <View style={styles.container}>
        <Text>PDFMake Demo</Text>
        {this.state.base64Pdf === null ? (
          <Button title="build pdf" onPress={() => this._buildPDF()} />
        ) : (
          <View>
            <Button
              title="close pdf"
              onPress={() => this.setState({ base64Pdf: null })}
            />
            <Pdf style={styles.pdf} source={source} />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width
  }
})

export default PDFMakeDemoScreen
