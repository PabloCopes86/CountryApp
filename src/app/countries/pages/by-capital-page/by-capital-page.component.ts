import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesSerive: CountriesService) {}

  searchByCapital(query: string): void {
    this.isLoading = true;
    this.countriesSerive.searchCapital(query).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
