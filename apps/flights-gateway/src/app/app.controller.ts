import { Flight } from '@emirates/backend/model';
import { IFlight } from '@emirates/common/model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): { message: string } {
    return this.appService.getData();
  }

  @ApiOperation({
    description: 'Retrieve the a list of Flights',
  })
  @ApiResponse({
    status: 201,
    description: 'The flights returned successfully',
    type: [Flight],
  })
  @Get('/flights')
  async getFlights(): Promise<IFlight[]> {
    return (await this.appService.getFlights())?.data;
  }
}
