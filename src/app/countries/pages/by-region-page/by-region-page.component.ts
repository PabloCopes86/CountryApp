import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesSerice: CountriesService) {}

  searchByRegion(query: string): void {
    this.isLoading = true;
    this.countriesSerice.searchRegion(query).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
