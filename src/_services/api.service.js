/*
 * API base services: version, information, ...
 */
import {
  backendConfig,
  requestOptions,
  handleResponse, userHeaders, formEncode, readFromStorage, writeToStorage
} from "../_helpers";

export const apiService = {
  version,
  information,
  refreshTokens
};

function refreshTokens() {
  console.log("Refresh token...");
  return fetch(`${backendConfig.apiUrl}${backendConfig.refreshToken}`, {
    method: "POST",
    // Use form encoded data
    ...userHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }),
    body: formEncode({refresh_token: readFromStorage(backendConfig.keyRefreshToken)})
  })
      .then(handleResponse)
      .then(tokens => {
        // login successful if there's a jwt token in the response
        // response contains:
        // {
        //   "token": "string",
        //   "refresh_token": "string"
        // }
        if (tokens.token && tokens.refresh_token) {
          // store the jwt tokens in the local storage to keep user logged in between page refreshes
          writeToStorage(backendConfig.keyToken, tokens.token);
          writeToStorage(backendConfig.keyRefreshToken, tokens.refresh_token);
        }
      });
}

function version() {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.apiVersion}`,
      requestOptions.get()
  )
      .then(handleResponse)
      .then(version => {
        console.log("API version", version);
        return version;
      });
}

function information() {
  return fetch(
      `${backendConfig.apiUrl}${backendConfig.apiInfo}`,
      requestOptions.get()
  )
      .then(handleResponse)
      .then(info => {
        console.log("API information", info);
        return info;
      });
}
