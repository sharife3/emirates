import { IFlight } from '@emirates/common/model';
import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getData(): { message: string } {
    return { message: 'Welcome to flights-api!' };
  }

  getFlights(): Promise<AxiosResponse<IFlight[]>> {
    return this.httpService.get('http://localhost:3333/api/flights').toPromise();
  }
}
