import { IRoute } from '../interfaces/route.interface';

export function genRouteKey({
  airlineId,
  sourceAirportId,
  destAirportId,
}: IRoute): string {
  return [airlineId, sourceAirportId, destAirportId].join('-');
}

export function randomDate(start:Date, end:Date):Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
