export default {
  /**
   * * Array of objects
   *  * ref_id
   *  * value
   *  * type
   * @param {*} formDefinition
   */
  getAllFieldReferenceIdAndValuesFromFormDefinition: async formDefinition => {
    try {
      const fieldReferencesAndValues = []
      // recursive function to get all content
      const recursiveContentGetter = childFormDefinition => {
        const refAndValue = childFormDefinition
        // add logic here for type based checker
        if (refAndValue.type === 'container') {
          // if container, then do nothing..
        } else {
          // if text
          // if checkbox
          fieldReferencesAndValues.push(refAndValue)
        }
        if (childFormDefinition.children) {
          childFormDefinition.children.forEach(innerChildFormDefinition => {
            recursiveContentGetter(innerChildFormDefinition)
          })
        }
      }
      // trigger
      recursiveContentGetter(formDefinition)

      return fieldReferencesAndValues
    } catch (error) {
      throw error
    }
  },

  /**
   *
   * @param {*} documentDefinition
   */
  getAllDocumentDefinitionObjectWithReferenceIds: async documentDefinition => {
    try {
      const objectsWithRefId = []
      const _getObjectsWithReferenceIds = targetObject => {
        // if array
        if (targetObject instanceof Array) {
          targetObject.forEach(arrayContent => {
            // pass array content to recursive
            _getObjectsWithReferenceIds(arrayContent)
          })
        } else if (targetObject instanceof Object) {
          // object && has ref_id

          // add to list
          if (targetObject.ref_id) {
            objectsWithRefId.push(targetObject)
          }

          // loop through object contents
          const keys = Object.keys(targetObject)
          keys.forEach(key => {
            _getObjectsWithReferenceIds(targetObject[key])
          })
        }
      }

      // trigger recursive object getter
      _getObjectsWithReferenceIds(documentDefinition)

      return objectsWithRefId
    } catch (error) {
      throw error
    }
  },

  /**
   * Will not include 'container' type
   * @param {*} formDefinition
   */
  extractFieldsWithReferenceFromFormDefinition: async formDefinition => {
    try {
      const fieldReferencesAndValues = []

      // recursive function to get all content
      const recursiveContentGetter = childFormDefinition => {
        const refAndValue = childFormDefinition

        // add logic here for type based checker
        if (refAndValue.type === 'container') {
          // if container, then do nothing..
        } else {
          // add to 1 layer list
          fieldReferencesAndValues.push(childFormDefinition)
        }

        // if has children, then trigger recursive on child
        if (childFormDefinition.children) {
          childFormDefinition.children.map(innerChildFormDefinition =>
            recursiveContentGetter(innerChildFormDefinition)
          )
        }
      }

      // trigger recursive function
      recursiveContentGetter(formDefinition)

      return fieldReferencesAndValues
    } catch (error) {
      throw error
    }
  },

  /**
   * Will not include 'container' type
   * @param {*} formDefinition
   */
  extractClonedFieldsWithReferenceFromFormDefinition: async formDefinition => {
    try {
      const fieldReferencesAndValues = []

      // recursive function to get all content
      const recursiveContentGetter = childFormDefinition => {
        const refAndValue = childFormDefinition

        // add logic here for type based checker
        if (refAndValue.type === 'container') {
          // if container, then do nothing..
        } else {
          const refAndValueClone = JSON.parse(
            JSON.stringify(childFormDefinition)
          )

          // we do cleanup before adding to list
          // if has children, then delete them
          // we only need the current form definitions content & other info,
          // but not children
          if (refAndValueClone.children) {
            delete refAndValueClone.children
          }

          fieldReferencesAndValues.push(refAndValueClone)
        }

        if (childFormDefinition.children) {
          childFormDefinition.children.map(recursiveContentGetter)
        }
      }

      // trigger recursive function
      recursiveContentGetter(formDefinition)

      return fieldReferencesAndValues
    } catch (error) {
      throw error
    }
  }
}
