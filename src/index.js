import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 1000;



const inputRef = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list");
const countriesInfo = document.querySelector(".country-info");

const onCountryName = evt => {
    const inputData = evt.target.value.trim();

    // console.log(inputData);

    if (inputData !== '') {
        fetchCountries(inputData)
            
            .then(foundData => {
                console.log(foundData);
                if (foundData.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                }
                else if (foundData.length >= 2 && foundData.length <= 10) {
                    countriesInfo.innerHTML = '';
                    countriesList.innerHTML = '';

                    renderCountriesList(foundData);

                }
                else if (foundData.length === 1) {
                    countriesInfo.innerHTML = '';
                    countriesList.innerHTML = '';
    
                    renderOneCountry(foundData);
                    
                }
            })
        .catch(err => {
            if (err.message === '404') {
        
        Notiflix.Notify.failure('Oops, there is no country with that name')
       countriesInfo.innerHTML = '';
        countriesList.innerHTML = '';
      }
    })
}; }





inputRef.addEventListener("input", debounce((onCountryName), DEBOUNCE_DELAY));
    


function renderCountriesList(countries) {
  const markup = countries
    .map((country) => {
      return `
          <li class="list">
          <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width='70px' height='40px'/>
          <h2>${country.name.official}</h2>
          </li>
      `;
    })
    .join("");
  countriesList.innerHTML = markup;
};

function renderOneCountry(countries) {
  const markup = 
      ` 
    <div class="list">
 <img src="${countries[0].flags.svg}" alt="Flag of ${countries[0].name.official}" width='70px' height='40px'/>
          <h2>${countries[0].name.official}</h2>   
    </div>
    <p><b>Capital: </b>${countries[0].capital} </p>
    <p><b>Population: </b>${countries[0].population}</p>
    <p><b>Languages: </b>${Object.values(countries[0].languages)}</p>
      `;
    countriesList.innerHTML = markup;
    
    
    console.log(countries[0]);

};


// Тобі потрібні тільки наступні властивості:

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// console.log(fetchCountries);