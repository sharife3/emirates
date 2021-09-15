import { IFlightSchedule } from './flight-schedule.interface';
import { IAirline } from './airline.interface';
export interface IFlight {
  flightNo: string;
  airline: IAirline;
  departure: IFlightSchedule;
  arrival: IFlightSchedule;
}
