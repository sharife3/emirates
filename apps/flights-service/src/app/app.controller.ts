import { Controller, Get } from '@nestjs/common';
import { IAirline, IRoute } from '@emirates/common/model';

import { MockDataService } from './mock-data.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  Airline,
} from '@emirates/backend/model';

@Controller()
export class AppController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Get()
  getData() {
    return this.mockDataService.getData();
  }

  @ApiResponse({
    status: 201,
    description: 'The list of stored airlines returned successfully',
    type: Airline,
  })
  @Get('/airlines')
  getAirlines(): Promise<Airline[]> {
    return this.mockDataService.getAirlines();
  }

  @Get()
  getRoutesByAirlineId(): Promise<IRoute[]> {
    throw new Error('Not yet implemented');
  }

  @Get()
  getRoutesBySourceId(): Promise<IRoute[]> {
    throw new Error('Not yet implemented');
  }
}
