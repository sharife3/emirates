import { Airline, Flight, Route } from '@emirates/backend/model';
import { IFlight, IRoute } from '@emirates/common/model';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { sampleSize, take } from 'lodash';
import { MockDataService } from './mock-data.service';



@Controller()
export class AppController {
  constructor(private readonly mockDataService: MockDataService) {}

  private static MAXIMUM_RESULT_COUNT = 100;

  @Get()
  getData():{message:string} {
    return this.mockDataService.getData();
  }

  @ApiOperation({ description: 'Retrieve the list of Airlines' })
  @ApiResponse({
    status: 201,
    description: 'The list of stored airlines returned successfully',
    type: Airline,
  })
  @Get('/airlines')
  getAirlines(): Promise<Airline[]> {
    return this.mockDataService.getAirlines();
  }

  @ApiOperation({ description: 'Retrieve the an Airline by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the Airline' })
  @ApiResponse({
    status: 201,
    description: 'The Airline is returned successfully',
    type: Airline,
  })
  @Get('/airlines/:id')
  getAirlineById(@Param('id') airlineId: number): Promise<Airline> {
    return this.mockDataService.getAirlineById(+airlineId);
  }

  @ApiOperation({ description: 'Retrieve the a Route by its ID' })
  @ApiParam({ name: 'id', description: 'The Route ID' })
  @ApiResponse({
    status: 201,
    description: 'The route returned successfully',
    type: Route,
  })
  @Get('/routes/:id')
  getRoutesByRouteId(@Param('id') routeId: string): Promise<IRoute> {
    return this.mockDataService.getRouteByRouteId(routeId);
  }

  @ApiOperation({
    description: 'Retrieve the Routes from a departing Airport ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The Airport ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The routes returned successfully',
    type: [Route],
  })
  @Get('/routes/source/:id')
  getRoutesBySourceId(@Param('id') sourceAirportId: number): Promise<IRoute[]> {
    return this.mockDataService.getRoutesByAirportSourceId(sourceAirportId);
  }

  @ApiOperation({
    description: 'Retrieve the Routes from a arrival Airport ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The Airport ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The routes returned successfully',
    type: [Route],
  })
  @Get('/routes/dest/:id')
  getRoutesByDestId(@Param('id') destAirpotId: number): Promise<IRoute[]> {
    return this.mockDataService.getRoutesByAirportDestId(destAirpotId);
  }

  @ApiOperation({
    description: 'Retrieve the Flights to departing Airport ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The Airport ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The flights returned successfully',
    type: [Flight],
  })
  @Get('/flights/source/:id')
  async getFlightsFromSourceAirportId(
    @Param('id') sourceAirportId: string
  ): Promise<IFlight[]> {
    return take(
      await this.mockDataService.getFlightsByAirportId(
        +sourceAirportId,
        'SOURCE'
      ),
      AppController.MAXIMUM_RESULT_COUNT
    );
  }

  @ApiOperation({
    description: 'Retrieve the Flights to departing Airport ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The Airport ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The flights returned successfully',
    type: [Flight],
  })
  @Get('/flights/dest/:id')
  async getFlightsFromDestAirportId(
    @Param('id') destAirportId: number
  ): Promise<IFlight[]> {
    return take(
      await this.mockDataService.getFlightsByAirportId(+destAirportId, 'DEST'),
      AppController.MAXIMUM_RESULT_COUNT
    );
  }

  @ApiOperation({
    description: 'Retrieve the Random list of Flights',
  })
  @ApiResponse({
    status: 201,
    description: 'The flights returned successfully',
    type: [Flight],
  })
  @Get('/flights')
  async getFlights(): Promise<IFlight[]> {
    return sampleSize(
      await this.mockDataService.getFlights(),
      AppController.MAXIMUM_RESULT_COUNT
    );
  }
}
