import {
  IAirport,
  IAirline,
  ICountry,
  IRoute,
  genRouteKey,
} from '@emirates/common/model';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { readFileSync } from 'fs';
import { map, sample, isEmpty } from 'lodash';
import { parse } from 'papaparse';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(AppService.name);

  private countryMap: Map<string, ICountry> = new Map();
  private airportMap: Map<number, IAirport> = new Map();
  private airlineMap: Map<number, IAirline> = new Map();
  private routesMap: Map<string, IRoute> = new Map();
  private routesByAirlineId: Map<string, IRoute[]> = new Map();
  private routesByAirportSourceId: Map<string, IRoute[]> = new Map();
  private routesByAirportDestId: Map<string, IRoute[]> = new Map();

  async onApplicationBootstrap() {
    this.logger.log('Load Countries');
    this.loadCountries();
    this.logger.log('Load Airports');
    this.loadAirports();
    this.logger.log('Load Airlines');
    this.loadAirlines();
    this.logger.log('Load Routes');
    this.loadRoutes();
  }

  private async loadCountries() {
    this.logger.log('Loading Countries Data  ...');

    const file = readFileSync(__dirname + '/assets/countries.dat', 'utf8');
    // parse(file, { complete: (result) => this.logger.log(JSON.stringify(result.data)) });
    const v = parse(file);

    this.logger.log('Structuring Countries Data  ...');

    v.data.forEach(([name, isoCode]) => {
      this.countryMap.set(isoCode, {
        name: name as string,
        isoCode: isoCode as string,
      });
    });

    this.logger.log(
      'Sample Country Data for AU\n' +
        JSON.stringify(this.countryMap.get('AU'), null, 4)
    );
    this.logger.log(`Total number of Countries: ${this.countryMap.size}`);
  }

  private loadAirlines() {
    this.logger.log('Loading Airlines Data  ...');

    const file = readFileSync(__dirname + '/assets/airlines.dat', 'utf8');
    // parse(file, { complete: (result) => this.logger.log(JSON.stringify(result.data)) });
    const v = parse(file);

    this.logger.log('Structuring Airlines Data  ...');

    v.data.forEach(([id, name, alias, iata, icao, callsign, country]) => {
      this.airlineMap.set(+id, {
        id: +id,
        name,
        alias,
        iata,
        icao,
        callsign,
        country,
      });
    });

    this.logger.log(
      'Sample Airline Data for Emirates\n' +
        JSON.stringify(this.airlineMap.get(2183), null, 4)
    );
    this.logger.log(`Total number of Airlines: ${this.airlineMap.size}`);
  }

  private loadAirports() {
    this.logger.log('Loading Airports Data  ...');

    const file = readFileSync(__dirname + '/assets/airports.dat', 'utf8');
    // parse(file, { complete: (result) => this.logger.log(JSON.stringify(result.data)) });
    const v = parse(file);

    this.logger.log('Structuring Airports Data  ...');

    v.data.forEach(([id, name, city, country, iata, icao]) => {
      if (
        iata &&
        iata.length === 3 &&
        icao &&
        icao.length === 4 &&
        !isEmpty(country)
      ) {
        this.airportMap.set(+id, {
          id: +id,
          name,
          city,
          country: country,
        });
      }
    });

    this.logger.log(
      'Sample Airport Data for LHR\n' +
        JSON.stringify(this.airportMap.get(507), null, 4)
    );
    this.logger.log(`Total number of Airports: ${this.airportMap.size}`);
  }

  private loadRoutes() {
    this.logger.log('Loading Routes Data  ...');

    const file = readFileSync(__dirname + '/assets/routes.dat', 'utf8');
    // parse(file, { complete: (result) => this.logger.log(JSON.stringify(result.data)) });
    const v = parse(file);

    this.logger.log('Structuring Routes Data  ...');

    v.data.forEach(
      ([
        airline,
        airlineId,
        sourceAirport,
        sourceAirportId,
        destAirport,
        destAirportId,
        ,
        stops,
      ]) => {
        const route: IRoute = {
          airline,
          airlineId,
          sourceAirport,
          sourceAirportId,
          destAirport,
          destAirportId,
          stops,
        };
        this.routesMap.set(genRouteKey(route), route);

        this.createOrAppendRoute(route, 'AIRLINE');
        this.createOrAppendRoute(route, 'SOURCE');
        this.createOrAppendRoute(route, 'DEST');
      }
    );
    this.logger.log(
      `Sample Route Data for LHR -> DXB via Emirates\n ${JSON.stringify(
        this.routesMap.get('2183#507#2188'),
        null,
        4
      )}`
    );
    this.logger.log(
      `All Routes for Emirates Airline\n ${
        this.routesByAirlineId.get('2183')?.length
      }`
    );
    this.logger.log(
      `All Routes where Source LHR\n ${
        this.routesByAirportSourceId.get('507')?.length
      }`
    );
    this.logger.log(
      `Total Routes where Destination DXB\n ${
        this.routesByAirportDestId.get('2188')?.length
      }`
    );
    this.logger.log(`Total number of routes: ${this.routesMap.size}`);
  }

  private createOrAppendRoute(route, mapType: 'AIRLINE' | 'SOURCE' | 'DEST') {
    const id = this.getRouteMapIdentifier(route, mapType);
    const map: Map<string | number, IRoute[]> = this.getRouteMap(mapType);

    if (map) {
      const routes: IRoute[] = map.has(id) ? map.get(id) : ([] as IRoute[]);
      map.set(id, [...routes, route]);
    }
  }

  private getRouteMapIdentifier(
    route: IRoute,
    mapType: 'AIRLINE' | 'SOURCE' | 'DEST'
  ) {
    switch (mapType) {
      case 'AIRLINE':
        return route.airlineId;
      case 'SOURCE':
        return route.sourceAirportId;
      case 'DEST':
        return route.destAirportId;
    }
  }

  private getRouteMap(mapType: 'AIRLINE' | 'SOURCE' | 'DEST') {
    switch (mapType) {
      case 'AIRLINE':
        return this.routesByAirlineId;
      case 'SOURCE':
        return this.routesByAirportSourceId;
      case 'DEST':
        return this.routesByAirportDestId;
    }
  }

  getData(): { message: string } {
    return { message: 'Welcome to flights-service!' };
  }
}
