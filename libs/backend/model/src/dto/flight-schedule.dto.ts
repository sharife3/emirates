import { ApiProperty } from '@nestjs/swagger';
import { IAirport, IFlight, IFlightSchedule } from '@emirates/common/model';
import { Airport } from './airport.dto';

export class FlightSchedule implements IFlightSchedule {
  @ApiProperty({
    description: 'The date and time of departure/arrival',
    example: 'United Kingdom',
  })
  date: Date;
  @ApiProperty({
    description: 'The city.',
    example: 'London',
  })
  city: string;
  @ApiProperty({
    description: 'The Airport.',
    type: Airport,
  })
  airport: IAirport;
}
