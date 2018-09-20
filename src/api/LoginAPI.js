const domain = 'https://reqres.in'

/**
 *
 */
export const login = async (username, password) => {
  try {
    const requestBody = {
      email: username,
      password: password
    }

    const response = await fetch(`${domain}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(requestBody)
    }).then(response => response.json())

    // return token only
    return response.token
  } catch (error) {
    console.warn(error)
    throw error
  }
}
