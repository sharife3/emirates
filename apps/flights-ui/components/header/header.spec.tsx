import React from 'react';
import Header from './header';
import { shallow } from 'enzyme';

describe('Header', () => {
  const mockTitle = 'FlightTitle';
  it('Should render the title', () => {
    const component = shallow(<Header title={mockTitle} />);
    expect(component.text()).toEqual(mockTitle);
  });
});