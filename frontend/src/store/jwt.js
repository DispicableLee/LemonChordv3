function getCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) return value;
  }
  return null;
}

// Define the base URL for your API, you can set this in your environment variables
const BASE_URL = process.env.REACT_APP_API // Update this to your back-end URL when deployed

async function jwtFetch(url, options = {}) {
  // Set options.method to 'GET' if there is no method.
  options.method = options.method || "GET";
  
  // Set options.headers to an empty object if there are no headers.
  options.headers = options.headers || {};
  
  // Set the "Authorization" header to the value of "jwtToken" in localStorage.
  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;

  // If the options.method is not 'GET', then set the "Content-Type" header to "application/json".
  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }

  // Construct the full URL by combining the base URL and the endpoint URL.
  console.log("BASE_URL",BASE_URL)
  console.log("url", url)

  const fullUrl = `${BASE_URL}${url}`;
  console.log("full url", fullUrl)

  // Call fetch with the full URL and the updated options hash.
  const res = await fetch(fullUrl, options);

  // If the response status code is 400 or above, then throw an error with the response.
  if (res.status >= 400) throw res;

  // If the response status code is under 400, then return the response to the next promise chain.
  return res;
}

export default jwtFetch;
