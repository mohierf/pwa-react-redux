/*
 * Standard handle of the API response
 */
import { backendConfig } from "../_helpers";
// import { store } from "../_store";

export function handleResponse(response) {
  return response.text().then(text => {
    let data;
    try {
      // Response text should be json data!
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }

    if (response.ok) {
      return data;
    }

    const { message } = data;

    if (response.status === 410) {
      throw new Error('errors.app.unauthorized');
    }

    if (response.status === 401) {
      console.log("401", data);
      if (message === 'Expired JWT Token') {
        throw new Error('errors.expired.jwt');
        // todo: refresh token management!
        // return refreshToken(url, options);
      }

      if (message === 'Invalid JWT Token') {
        // Do not care if we are logging out, else we will indefinitely log out!
        if (response.url !== `${backendConfig.apiUrl}${backendConfig.logout}`) {
          // todo: auto logout if 401 response returned from api?
          // store.dispatch("user/logout", error);
          throw new Error('errors.invalid.jwt');
        }
      }

      if (message === 'Bad credentials') {
        throw new Error('errors.bad.credentials');
      }

      // Looks like this message is not API documented -)
      throw new Error(data.message);
    }

    if (response.status === 403) {
      // store.dispatch("user/userDenied", error, { root: true }).then(() => {
      //   console.log("403!", error, response);
      // });
      throw new Error('Access denied');
    }

    const error = data['hydra:description'] ? data['hydra:description'] : response.statusText;
    if (!data.violations) {
      throw Error(error);
    }

    const errors = { };
    data.violations.map(violation => (errors[violation.propertyPath] = violation));

    // todo: Redux forms?
    // throw new SubmissionError(errors);
    //
    return Promise.reject(errors);
  });
}
