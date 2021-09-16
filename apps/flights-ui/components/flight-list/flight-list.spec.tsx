import { shallow, mount, render } from 'enzyme';
import FlightList from './flight-list';

const flight = {
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
describe('FlightList', () => {

  beforeEach(()=> {
    jest.resetAllMocks();
  });

  it('should render successfully', () => {
    const component = shallow(<FlightList flights={[flight]} />);
    expect(component).toBeTruthy();
  });

  it('should add role to FlightList', () => {
    const component = render(<FlightList flights={[flight]} />);    
    expect(component.prop('role')).toEqual('list');
  });

  it('should render a list if FlightItems are present',() => {
    const component = render(<FlightList flights={[flight]} />);
    expect(component.find('li').length).toEqual(1);
  });

  it('should render no flights available ', () => {

    const component = shallow(<FlightList flights={[]} />);
    expect(component.text()).toContain('Sorry there are no flights');
  });

});
