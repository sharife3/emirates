import { ApiProperty } from '@nestjs/swagger';
import { IFlight, IFlightSchedule } from '@emirates/common/model';
import { FlightSchedule} from './flight-schedule.dto'

export class Flight implements IFlight {
  @ApiProperty({
    description: 'The flight number.',
    example: 'United Kingdom',
  })
  flightNo: Date;
  @ApiProperty({
    description: 'The Airline ID',
    example: 'BA',
  })
  airline: string;
  @ApiProperty({
    description: 'The Flight Schedule for Departure',
    type: FlightSchedule
  })
  departure: IFlightSchedule;
  @ApiProperty({
    description: 'The Flight Schedule for Arrival',
    type: FlightSchedule
  })
  arrival: IFlightSchedule;
}
