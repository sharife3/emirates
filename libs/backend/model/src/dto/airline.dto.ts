import { IAirline } from '@emirates/common/model';
import { ApiProperty } from '@nestjs/swagger';

export class Airline implements IAirline {
  @ApiProperty({
    description: 'The internal ID of the Airline',
    example: '324',
  })
  id: number;
  @ApiProperty({
    description: 'Name of the airline.',
    example: 'All Nippon Airways',
  })
  name: string;
  @ApiProperty({
    description: 'The associated country of the Airline',
    example: '501',
  })
  country: string;
  @ApiProperty({
    description: 'Alias of the airline. For example, All Nippon Airways is commonly known as "ANA".',
    example: 'ANA',
  })
  alias: string;
  @ApiProperty({
    description: '2-letter IATA code, if available.',
    example: 'NH',
  })
  iata: string;
  @ApiProperty({
    description: '3-letter ICAO code, if available.',
    example: 'ANA',
  })
  icao: string;
  @ApiProperty({
    description: 'Airline callsign.',
    example: 'ALL NIPPON',
  })
  callsign: string;
}
