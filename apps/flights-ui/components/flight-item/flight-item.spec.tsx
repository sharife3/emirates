import { render } from 'enzyme';
import { IFlight } from '@emirates/common/model';
import FlightItem from './flight-item';

describe('FlightItem', () => {
  it('should render successfully', () => {
    const flight: IFlight = {
      airline: {
        id: 3320,
        name: 'Lufthansa',
        alias: '\\N',
        iata: 'LH',
        icao: 'DLH',
        callsign: 'LUFTHANSA',
        country: 'Germany',
      },
      flightNo: '3320-3093-340',
      departure: {
        airport: {
          id: 3093,
          name: 'Indira Gandhi International Airport',
          iata: 'DEL',
          icao: 'VIDP',
          city: 'Delhi',
          country: 'India',
        },
        city: 'Delhi',
        date: new Date('2021-09-16T13:07:41.085Z'),
      },
      arrival: {
        airport: {
          id: 340,
          name: 'Frankfurt am Main Airport',
          iata: 'FRA',
          icao: 'EDDF',
          city: 'Frankfurt',
          country: 'Germany',
        },
        city: 'Frankfurt',
        date: new Date('2021-09-16T15:14:56.258Z'),
      },
    };

    const baseElement = render(<FlightItem flight={flight} />);
    expect(baseElement).toBeTruthy();
  });

  it('should highlight the item when clicked', () => {
    //
  });

  it('should highlight the item when clicked', () => {
    //
  });
});
