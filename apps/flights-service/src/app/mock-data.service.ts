import {
  genRouteKey,
  randomDate,
  IAirline,
  IAirport,
  ICountry,
  IRoute,
  IFlight,
  IFlightSchedule,
} from '@emirates/common/model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { readFileSync } from 'fs';
import { isEmpty, sample, take } from 'lodash';
import { parse } from 'papaparse';

@Injectable()
export class MockDataService implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(MockDataService.name);

  private countryMap: Map<string, ICountry> = new Map();
  private airportMap: Map<number, IAirport> = new Map();
  private airlineMap: Map<number, IAirline> = new Map();
  private routesMap: Map<string, IRoute> = new Map();
  private routesByAirlineId: Map<number, IRoute[]> = new Map();
  private routesByAirportSourceId: Map<number, IRoute[]> = new Map();
  private routesByAirportDestId: Map<number, IRoute[]> = new Map();

  /**
   * @codeCoverageIgnore
   */
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

  public async getAirportById(airportId: number): Promise<IAirport> {
    this.logger.log('Getting Airport by ID');
    console.log(airportId);
    return this.airportMap.get(airportId);
  }

  public async getAirlineById(airlineId: number): Promise<IAirline> {
    this.logger.log('Getting Airline by ID');
    console.log(airlineId);
    return this.airlineMap.get(airlineId);
  }

  public async getAirlines(): Promise<IAirline[]> {
    this.logger.log('Getting all Airlines');
    const res = take(
      Array.from(this.airlineMap, ([, value]) => value),
      100
    );
    console.log(sample(res));
    return res;
  }

  public async getRouteByRouteId(routeId: string): Promise<IRoute> {
    return this.routesMap.get(routeId);
  }

  public async getRoutesByAirlineId(airlineId: number): Promise<IRoute[]> {
    return this.routesByAirlineId.get(airlineId);
  }

  public async getRoutesByAirportSourceId(
    sourceAirportId: number
  ): Promise<IRoute[]> {
    return this.routesByAirportSourceId.get(sourceAirportId);
  }

  public async getRoutesByAirportDestId(
    destAirportId: number
  ): Promise<IRoute[]> {
    return this.routesByAirportDestId.get(destAirportId);
  }

  public async getFlights(): Promise<IFlight[]> {
    const routes = Array.from(this.routesMap, ([, value]) => value);
    return this.mapRoutes(routes);
  }

  public async getFlightsByAirportId(
    airportId: number,
    mapType: 'SOURCE' | 'DEST'
  ): Promise<IFlight[]> {
    const routesByDirectionMap = this.getRouteMap(mapType);
    const routes = routesByDirectionMap.get(airportId);

    return this.mapRoutes(routes);
  }

  private mapRoutes(routes: IRoute[]): IFlight[] {
    return routes.map((route) => {
      const departureAirport = this.airportMap.get(route.sourceAirportId);
      const arrivalAirport = this.airportMap.get(route.destAirportId);
      const todaysDate = randomDate(
        new Date(),
        moment(new Date()).add(3, 'hours').add(1, 'days').toDate()
      );

      if (!departureAirport || !arrivalAirport) {
        return;
      }

      const departure: IFlightSchedule = {
        airport: departureAirport,
        city: departureAirport.city,
        date: todaysDate,
      };

      const arrival: IFlightSchedule = {
        airport: arrivalAirport,
        city: arrivalAirport.city,
        date: randomDate(
          todaysDate,
          moment(todaysDate).add(1, 'days').toDate()
        ),
      };

      return {
        airline: this.airlineMap.get(route.airlineId),
        flightNo: genRouteKey(route),
        departure,
        arrival,
      };
    });
  }

  /**
   * @codeCoverageIgnore
   */
  private async loadCountries() {
    this.logger.log('Loading Countries Data  ...');

    const file = readFileSync(__dirname + '/assets/countries.dat', 'utf8');
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

  /**
   * @codeCoverageIgnore
   */
  private loadAirlines() {
    this.logger.log('Loading Airlines Data  ...');

    const file = readFileSync(__dirname + '/assets/airlines.dat', 'utf8');
    const v = parse(file);

    this.logger.log('Structuring Airlines Data  ...');

    v.data.forEach(([id, name, alias, iata, icao, callsign, country]) => {
      if (
        // alias !== '\\N' &&
        iata &&
        iata.length >= 2 &&
        icao &&
        icao.length >= 2 &&
        !isEmpty(country)
      ) {
        this.airlineMap.set(+id, {
          id: +id,
          name,
          alias,
          iata,
          icao,
          callsign,
          country,
        });
      }
    });

    this.logger.log(
      'Sample Airline Data for Emirates\n' +
        JSON.stringify(this.airlineMap.get(2183), null, 4)
    );
    this.logger.log(`Total number of Airlines: ${this.airlineMap.size}`);
  }

  /**
   * @codeCoverageIgnore
   */
  private loadAirports() {
    this.logger.log('Loading Airports Data  ...');

    const file = readFileSync(__dirname + '/assets/airports.dat', 'utf8');
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

  /**
   * @codeCoverageIgnore
   */
  private loadRoutes() {
    this.logger.log('Loading Routes Data  ...');

    const file = readFileSync(__dirname + '/assets/routes.dat', 'utf8');
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
        if (isNaN(+sourceAirportId) || isNaN(+destAirportId)) {
          return;
        }

        const route: IRoute = {
          airline,
          airlineId: +airlineId,
          sourceAirport,
          sourceAirportId: +sourceAirportId,
          destAirport,
          destAirportId: +destAirportId,
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
        this.routesByAirlineId.get(2183)?.length
      }`
    );
    this.logger.log(
      `All Routes where Source LHR\n ${
        this.routesByAirportSourceId.get(507)?.length
      }`
    );
    this.logger.log(
      `Total Routes where Destination DXB\n ${
        this.routesByAirportDestId.get(2188)?.length
      }`
    );
    this.logger.log(`Total number of routes: ${this.routesMap.size}`);
  }

  /**
   * @codeCoverageIgnore
   */
  private createOrAppendRoute(route, mapType: 'AIRLINE' | 'SOURCE' | 'DEST') {
    const id = this.getRouteMapIdentifier(route, mapType);
    const map: Map<string | number, IRoute[]> = this.getRouteMap(mapType);

    if (map) {
      const routes: IRoute[] = map.has(id) ? map.get(id) : ([] as IRoute[]);
      map.set(id, [...routes, route]);
    }
  }

  /**
   * @codeCoverageIgnore
   */
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

  /**
   * @codeCoverageIgnore
   */
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
