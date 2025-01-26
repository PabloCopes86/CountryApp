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

  constructor(private countriesSerice: CountriesService) {}

  searchByRegion(query: string): void {
    this.countriesSerice.searchRegion(query).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
