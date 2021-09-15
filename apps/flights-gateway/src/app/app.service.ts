import { Injectable, HttpService } from '@nestjs/common';
import { IAirline, IRoute, IFlight } from '@emirates/common/model';
import { Observable } from 'rxjs';
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
