import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesSerice: CountriesService) {}

  searchByCountry(query: string): void {
    this.isLoading = true;
    this.countriesSerice.searchCountry(query).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
