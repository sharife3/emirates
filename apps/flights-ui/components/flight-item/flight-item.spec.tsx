import { render } from 'enzyme';

import FlightItem from './flight-item';

describe('FlightItem', () => {
  it('should render successfully', () => {
    const baseElement = render(<FlightItem />);
    expect(baseElement).toBeTruthy();
  });
});
