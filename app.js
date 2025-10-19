const filterMenu = document.querySelector(".filter-menu");
const filterTitle = document.querySelector(".filter-title");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const countriesDOM = document.querySelector(".countries");

let countries = [];

async function getCountries() {
  try {
    let response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3,population,region,maps"
    );
    countries = await response.json();
    countriesRender(countries);
  } catch (e) {
    console.log(e);
  }
}

getCountries();

function countriesRender(countries = []) {
  let countriesHtml = "";
  countries.forEach((country) => {
    let { flags, name, population, region, capital } = country;
    countriesHtml += `<a href="country.html?country=${
      name.common
    }"><div class="country-card">
    <img src=${flags?.svg} alt="flag" class="country-img" />
    <div class="country-details">
      <h3>${name.common}</h3>
      <p><span>Population: </span>${population.toLocaleString("en-IN")}</p>
      <p><span>Region: </span>${region}</p>
      <p><span>Capital: </span>${capital[0]}</p>
    </div>
  </div></a>`;
  });

  countriesDOM.innerHTML = countriesHtml;
}

function searchCountries() {
  let searchCountries = countries.filter((country) =>
    country.name.common
      .toLocaleLowerCase()
      .includes(searchInput.value.toLocaleLowerCase())
  );
  countriesRender(searchCountries);
  console.log(countries, searchCountries);
}

function filterCountriesByRegion(region) {
  console.log(region);
  let filterCountries = countries.filter(
    (country) => country.region.toLowerCase() == region.toLowerCase()
  );

  countriesRender(filterCountries);
  console.log(countries, filterCountries);
}

filterTitle.addEventListener("click", () => {
  filterMenu.classList.toggle("open");
});

filterMenu.addEventListener("click", (e) => {
  if (e.target.closest(".option")) {
    console.log(e.target.value);
    filterCountriesByRegion(e.target.value);
  }
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value === "") {
    countriesRender(countries);
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    searchCountries();
    console.log("enter");
  }
});

searchIcon.addEventListener("click", searchCountries);

export { countries };
