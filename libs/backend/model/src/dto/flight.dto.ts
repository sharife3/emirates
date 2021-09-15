import { ApiProperty } from '@nestjs/swagger';
import { IFlight, IFlightSchedule, IAirline } from '@emirates/common/model';
import { Airline } from './airline.dto';
import { FlightSchedule } from './flight-schedule.dto';

export class Flight implements IFlight {
  @ApiProperty({
    description: 'The flight number.',
    example: 'United Kingdom',
  })
  flightNo: string;
  @ApiProperty({
    description: 'The Airline ID',
    example: 'BA',
    type: Airline,
  })
  airline: IAirline;
  @ApiProperty({
    description: 'The Flight Schedule for Departure',
    type: FlightSchedule,
  })
  departure: IFlightSchedule;
  @ApiProperty({
    description: 'The Flight Schedule for Arrival',
    type: FlightSchedule,
  })
  arrival: IFlightSchedule;
}
