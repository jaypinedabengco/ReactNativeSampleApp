import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'

export default {
  isLoggedIn: async () => {
    const accessData = await AccessToken.getCurrentAccessToken()
    return !!accessData
  },
  logOut: async () => {
    return await LoginManager.logOut()
  },
  fetchUserInformation: async fields => {
    const accessData = await AccessToken.getCurrentAccessToken()

    if (!accessData) {
      throw new Error('Not logged in')
    }

    // return result & not a promise
    return await new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessData.accessToken,
          parameters: {
            fields: {
              string: fields
            }
          }
        },
        // callback
        // trigger promise reject or resolve
        // within the callback
        // !!! LOGIC ENDS HERE !!!
        (err, result) => (err ? reject(err) : resolve(result))
      )
      new GraphRequestManager().addRequest(infoRequest).start()
    })
  }
}
