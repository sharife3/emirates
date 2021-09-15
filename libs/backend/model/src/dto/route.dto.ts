import { IRoute } from '@emirates/common/model';
import { ApiProperty } from '@nestjs/swagger';

export class Route implements IRoute {
  @ApiProperty({
    description: '2-letter (IATA) or 3-letter (ICAO) code of the airline',
    example: 'EK',
  })
  airline: string;
  @ApiProperty({
    description: 'The internal ID of the Airline',
    example: '2183',
  })
  airlineId: number;
  @ApiProperty({
    description: '3-letter (IATA) or 4-letter (ICAO) code of the source airport.',
    example: 'DXB',
  })
  sourceAirport: string;
  @ApiProperty({
    description: 'The internal ID of the Airport',
    example: '2188',
  })
  sourceAirportId: number;
  @ApiProperty({
    description: '3-letter (IATA) or 4-letter (ICAO) code of the destination airport.',
    example: 'LHR',
  })
  destAirport: string;
  @ApiProperty({
    description: 'The internal ID of the Airport',
    example: '507',
  })
  destAirportId: number;
  @ApiProperty({
    description: 'Number of stops on this flight ("0" for direct)',
    example: '0',
  })
  stops: number;


}
