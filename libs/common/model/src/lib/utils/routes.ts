import { IRoute } from '../interfaces/route.interface';
import { join } from 'lodash';

export function extractRoute(): string {
  return 'backend-model';
}

export function genRouteKey({
  airlineId,
  sourceAirportId,
  destAirportId,
}: IRoute): string {
  return [airlineId, sourceAirportId, destAirportId].join('#');
}
