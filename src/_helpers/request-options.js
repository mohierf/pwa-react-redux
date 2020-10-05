import { readFromStorage } from "./local-storage";
import { backendConfig, getUserAgent } from "../_helpers";

export const requestOptions = {
  get(headers = {}) {
    return {
      method: "GET",
      ...userHeaders(headers)
    };
  },
  post(body, headers = {}) {
    return {
      method: "POST",
      ...userHeaders(headers),
      body: body
    };
  },
  patch(body, headers = {}) {
    return {
      method: "PATCH",
      ...userHeaders(headers),
      body: JSON.stringify(body)
    };
  },
  put(body, headers = {}) {
    return {
      method: "PUT",
      ...userHeaders(headers),
      body: JSON.stringify(body)
    };
  },
  delete(headers = {}) {
    return {
      method: "DELETE",
      ...userHeaders(headers)
    };
  }
};

function userHeaders(headers = null) {
  // If headers are null, we do not even want any content type!
  if (headers !== null && !("Content-Type" in headers)) {
    headers = backendConfig.headers;
  }

  // Set authorization header with jwt access token
  const token = readFromStorage(backendConfig.keyToken);
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  headers["X-User-Agent"] = getUserAgent();

  return { headers: headers };
}
export { userHeaders };
