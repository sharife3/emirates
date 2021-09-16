import { genRouteKey } from './routes';
import { IRoute } from '../interfaces';

describe('route utility', () => {
  it('When generating key from route, should create a string <airlineId>#<sourceAirportId>#<destAirportId>', () => {
    const route: Partial<IRoute> = {
      airlineId: 2183,
      sourceAirportId: 507,
      destAirportId: 2188,
    };
    expect(genRouteKey(route as IRoute)).toEqual('2183-507-2188');
  });
});
