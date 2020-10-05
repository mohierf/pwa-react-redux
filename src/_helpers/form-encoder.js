/*
 * Encode data as a for a HTML form
 * --------------------------------
 * From:
 * { username: test@test.com, password: 123456 }
 * Returns:
 * username=test%40test.com&password=123456
 */
export function formEncode(data) {
  let encodedData = [];
  Object.keys(data).forEach(function(key) {
    encodedData.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    );
  });

  return encodedData.join("&").replace(/%20/g, "+");
}
