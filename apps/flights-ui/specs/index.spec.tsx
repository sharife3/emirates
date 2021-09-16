import { render, mount } from 'enzyme';
import React from 'react';
import Index, { getServerSideProps, onClickAction } from '../pages/index';

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
describe('Index', () => {
  it('should render successfully', () => {
    const baseElement = render(<Index flights={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

describe('getServerSideProps', () => {
  it('should return empty array on error', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.reject();
    });
    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          flights: [],
        },
      })
    );
  });

  it('should return empty array on null result from api', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(null),
      });
    });
    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          flights: [],
        },
      })
    );
  });
  it('should call fetch flights api', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve([flight]),
      });
    });

    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          flights: [flight],
        },
      })
    );
  });

  it('should return empty array on props if empty result set', async () => {
    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          flights: [flight],
        },
      })
    );
  });

  it('FixedPanel should render when a Flight has been selected', async () => {
    const component = mount(<Index flights={[flight]} />);
    const listItem = component.find('li');
    const fixedPanel = component.find('FixedPanel');
    listItem.simulate('click');
    expect(fixedPanel).not.toBeNull();
  });

  it('on clickAction should callback function and call alert', () => {
    const callBack = jest.fn();
    onClickAction(callBack)();
    expect(callBack).toHaveBeenCalled();
  });
});
