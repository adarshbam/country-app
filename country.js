const main = document.querySelector(".main");
const backButton = document.querySelector(".back-button");
let country = new URLSearchParams(window.location.search)
  .get("country")
  .toLocaleLowerCase();

async function getCountry() {
  let response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  country = await response.json();
  console.log(country[0]);

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    borders,
    languages,
    tld,
    currencies,
  } = country[0];

  response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`
  );
  let borderNames = await response.json();
  borderNames = borderNames.map((country) => country.name.common);
  console.log(borderNames);

  let countryElement = document.createElement("div");
  countryElement.classList.add("country");

  console.dir(currencies);
  const nativeName = name.nativeName[Object.keys(languages)[0]].common;
  console.log(nativeName);

  countryElement.innerHTML = `<img src="${flags.svg}" alt="country-img" />
  <div class="country-about">
  
    <h1 class="country-name">${name.common}</h1>
    <div class="country-details">

      <div class="section-left">
        <p class="native-name"><span>Native Name: </span>${nativeName}</p>
        <p class="population"><span>Population: </span>${population.toLocaleString(
          "en-IN"
        )}</p>
        <p class="region"><span>Region: </span>${region}</p>
        <p class="sub-region"><span>Sub Region: </span>${subregion}</p>
        <p class="capital"><span>Capital: </span>${capital.map(
          (capital, i) => `${capital}`
        )}</p>
      </div>
      <div class="section-right">
        <p class="top-lvl-domain"><span>Top Level Domain: ${tld}</span></p>
        <p class="currencies"><span>Currencies: </span>${Object.keys(
          currencies
        ).map((currency, i) => `${currencies[currency].name}`)}</p>
        <p class="languages"><span>Languages: </span>${Object.keys(
          languages
        ).map((keys, i) => `${languages[keys]}`)}</p>
      </div>
    </div>
    <div class="border-countries">
      <p><span class="title">Border Countries: </span><span class="borders">${borderNames
        .map(
          (countryName) =>
            `<a href="?country=${countryName}" class="button">${countryName}</a>`
        )
        .join(" ")}</span></p>
    </div>
  </div>`;
  console.log(window.history);

  main.append(countryElement);
}

backButton.addEventListener("click", () => {
  window.history.back();
});

getCountry();
console.log(country);
