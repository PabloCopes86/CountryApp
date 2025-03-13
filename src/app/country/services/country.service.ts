import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { RestCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        // console.log('Error fetchinig', error);

        return throwError(
          () => new Error(`No se pudo obtener paises con la capital: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.queryCacheCountry.has(query)) {
      // console.log(`devolviendo query sin necesidad de server`)
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        // console.log('Error fetchinig', error);

        return throwError(
          () => new Error(`No se pudo obtener el país: ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      map((countries) => countries.at(0)),
      catchError((error) => {
        // console.log('Error fetchinig', error);

        return throwError(
          () => new Error(`No se pudo obtener país con ese código: ${code}`)
        );
      })
    );
  }

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      console.log('retornando de cache');

      return of(this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RestCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        // console.log('Error fetchinig', error);
        return throwError(
          () => new Error(`No se pudo obtener países con: ${region}`)
        );
      })
    );
  }
}
