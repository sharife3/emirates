import { IFlightSchedule } from './flight-schedule.interface';

export interface IFlight {
  flightNo: Date;
  airline: string;
  departure: IFlightSchedule;
  arrival: IFlightSchedule;
}
