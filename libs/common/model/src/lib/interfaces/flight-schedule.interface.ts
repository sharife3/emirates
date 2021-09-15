import { IAirport } from './airport.interface';

export interface IFlightSchedule {
  date: Date;
  city: string;
  airport: IAirport;
}
