/*
 * Users login, logout and some other services
 */
import {
  backendConfig,
  requestOptions,
  jwtParse,
  userHeaders,
  handleResponse,
  writeToStorage, removeFromStorage
} from "../_helpers";


export const userService = {
  login,
  profile,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  return fetch(`${backendConfig.apiUrl}${backendConfig.login}`, {
    method: "POST",
    ...userHeaders({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({username: username, password: password})
  })
      .then(handleResponse)
      .then(response => {
        const {uuid, token, refresh_token} = response;

        // store the jwt tokens in the local storage to keep user logged in between page refreshes
        writeToStorage(backendConfig.keyToken, token);
        writeToStorage(backendConfig.keyRefreshToken, refresh_token);

        if (process.env.NODE_ENV === 'development') {
          const decodedJWT = jwtParse(token);
          console.log('Received JWT content', decodedJWT);
        }

        return uuid;
      });
}

function profile() {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.profile}`,
      requestOptions.get()
  )
      .then(handleResponse)
      .then(profile => {
        /*
         Profile specific layout
        // Set the default profile layout if none (or empty) is provided
        if (!profile.layout || Object.entries(profile.layout).length === 0) {
          try {
            profile.layout = require(`../assets/layout-${profile.firstname.toLowerCase()}-${profile.lastname.toLowerCase()}.json`);
          } catch (e) {
            try {
              profile.layout = require("../assets/layout-default.json");
            } catch (e) {
              // Do nothing
            }
          }
        }
         */
        // Check an existing language - this to check if the profile is the expected one
        if (!profile.language) {
          return Promise.reject("Missing user language in the profile");
        }
        console.log('Profile', profile)

        return profile;
      });
}

function logout() {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.logout}`,
      requestOptions.post()
  )
      .then(handleResponse)
      .then(() => {
        // remove user from local storage to log user out
        removeFromStorage(backendConfig.keyToken);
        removeFromStorage(backendConfig.keyRefreshToken);
      });
}

function register(values) {
  return fetch(`${backendConfig.apiUrl}${backendConfig.sign_up}`, {
    method: "POST",
    ...userHeaders({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(values)
  })
      .then(handleResponse)
      .then(response => {
        console.log('Response', response);
        return response;
      });
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(user)
  // };
  //
  // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.users}`,
      requestOptions.get()
  )
      .then(handleResponse)
      .then(users => {
        return users;
      });
  // const requestOptions = {
  //   method: 'GET',
  //   headers: authHeader()
  // };
  //
  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.users}/${id}`,
      requestOptions.get()
  )
      .then(handleResponse)
      .then(user => {
        return user;
      });
  // const requestOptions = {
  //   method: 'GET',
  //   headers: authHeader()
  // };
  //
  // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
  return fetch(`${backendConfig.apiUrl}${backendConfig.users}/${id}`, requestOptions.put(user))
      .then(handleResponse)
      .then(response => {
        console.log('Response', response);
        return response;
      });
  // const requestOptions = {
  //   method: 'PUT',
  //   headers: {...authHeader(), 'Content-Type': 'application/json'},
  //   body: JSON.stringify(user)
  // };
  //
  // return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return fetch(`${backendConfig.apiUrl}${backendConfig.users}/${id}`, requestOptions.delete())
      .then(handleResponse)
      .then(response => {
        console.log('Response', response);
        return response;
      });

  // const requestOptions = {
  //   method: 'DELETE',
  //   headers: authHeader()
  // };
  //
  // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }
//
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//
//         return data;
//     });
// }