import { IRoute } from '../interfaces/route.interface';

export function genRouteKey({
  airlineId,
  sourceAirportId,
  destAirportId,
}: IRoute): string {
  return [airlineId, sourceAirportId, destAirportId].join('#');
}
