import React, { Component } from 'react'
import { View, Text, Image, Button, Dimensions, StyleSheet } from 'react-native'
import documentDefinition from './../sample-data/documentDefinition/entry-notice-form-9.json'
import pdfMake from 'pdfmake/build/pdfmake.js'
import 'pdfmake/build/vfs_fonts'
import Pdf from 'react-native-pdf'
import SignatureCapture from 'react-native-signature-capture'
class PDFMakeDemoScreen extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      documentDefinition: documentDefinition,
      savedSignature: null,
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

  _onSaveSignatureEvent(result) {
    // save base64 image
    this.setState({ savedSignature: `data:image/png;base64,${result.encoded}` })
  }

  render() {
    const source = { uri: this.state.base64Pdf }
    const { savedSignature } = this.state
    return (
      <View style={styles.container}>
        {this.state.base64Pdf === null ? (
          <View>
            <SignatureCapture
              style={styles.signature}
              onSaveEvent={result => this._onSaveSignatureEvent(result)}
              viewMode={'portrait'}
              saveImageFileInExtStorage={false}
              showTitleLabel={false}
            />
            <View style={styles.preview}>
              {savedSignature ? (
                <Image
                  style={styles.previewSignature}
                  source={{ uri: savedSignature }}
                />
              ) : (
                <Text>No Saved Signature</Text>
              )}
              <Button title="build pdf" onPress={() => this._buildPDF()} />
            </View>
          </View>
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
  },
  preview: {
    flex: 2
  },
  signature: {
    flex: 1
  },
  previewSignature: {
    flex: 1,
    alignItems: 'center'
  }
})

export default PDFMakeDemoScreen
