import type { Country } from '../interfaces/country.interface';
import type { RestCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? restCountry.name.common,
      capital: restCountry.capital?.length
        ? restCountry.capital.join(',')
        : 'No consta capital',
      capitalList: restCountry.capital?.length
        ? restCountry.capital.slice(0,1)
        : ['No consta capital'],
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
      timeZone: restCountry.timezones,
    };
  }
  static mapRestCountryArrayToCountryArray(
    restCountry: RestCountry[]
  ): Country[] {
    return restCountry.map(this.mapRestCountryToCountry);
  }
}
