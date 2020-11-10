export default class RestCountriesAPI {
  constructor() {}

  fetchCountries(query) {
    const BASE_URL_NAME = "https://restcountries.eu/rest/v2/name";
    return fetch(`${BASE_URL_NAME}/${query}`).then((response) =>
      response.json()
    );

    //   .then(countCountries)
  }
}
