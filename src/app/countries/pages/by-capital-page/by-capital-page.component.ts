import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {


  searchByCapital(term: string): void {
    console.log('Desde ByCapital');
    console.log({ term });
  }
}
