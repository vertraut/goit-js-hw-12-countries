import { notice, error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";

import CountriesApiService from "./countries-api";

import countryTpl from "../template/country.hbs";
import countriesListTpl from "../template/countries-list.hbs";

const fetchCountriesByName = new CountriesApiService();
const debounce = require("lodash/debounce");

const refs = {
  searchResult: document.querySelector(".search-result"),
  inputField: document.querySelector(".input-field"),
};

refs.inputField.addEventListener("input", debounce(inputName, 500));

function inputName(e) {
  const query = e.target.value;
  if (query === "") {
    clearMarkup();
    return;
  }

  const fetchResponse = fetchCountriesByName.fetchCountries(query);

  fetchResponse.then(countCountries).catch((e) => {
    errorNotFound();
    clearMarkup();
  });
}

function countCountries(response) {
  const qtyCountries = response.length;

  if (qtyCountries > 10) {
    clearMarkup();
    errorTooManyCountries();
    return;
  }

  if (qtyCountries <= 10 && qtyCountries > 1) {
    listCountries(response);
    return;
  }

  renderCountry(...response);
}

function listCountries(countries) {
  const markup = countriesListTpl(countries);
  renderMarkup(markup);
}

function renderCountry(country) {
  const markup = countryTpl(country);
  renderMarkup(markup);
}

function clearMarkup() {
  refs.searchResult.innerHTML = "";
}

function renderMarkup(markup) {
  refs.searchResult.innerHTML = markup;
}

function errorTooManyCountries() {
  notice({
    text: "Too many matches found. Please enter a more specific query!",
    delay: 1000,
  });
}

function errorNotFound() {
  error({
    text: "WE COULD NOT FIND ANYTHING",
    delay: 1000,
  });
}
