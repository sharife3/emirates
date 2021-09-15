import { IAirport } from '@emirates/common/model';
import { ApiProperty } from '@nestjs/swagger';

export class Airport implements IAirport {
  @ApiProperty({
    description: 'The internal ID of the Airline',
    example: '324',
  })
  id: number;
  @ApiProperty({
    description: 'Name of airport. May or may not contain the City name',
    example: 'London Heathrow Airport',
  })
  name: string;
  @ApiProperty({
    description: 'Main city served by airport. May be spelled differently from Name.',
    example: 'London',
  })
  city: string;
  @ApiProperty({
    description: 'Country or territory where airport is located.',
    example: 'United Kingdom',
  })
  country: string;
}
