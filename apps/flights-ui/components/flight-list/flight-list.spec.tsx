import { render } from 'enzyme';

import FlightList from './flight-list';

describe('FlightList', () => {
  it('should render successfully', () => {
    const baseElement = render(<FlightList />);
    expect(baseElement).toBeTruthy();
  });
});
