import { IFlight } from '@emirates/common/model';
import styled from 'styled-components';
import { FlightItem } from '../flight-item/flight-item';
import {
  CallToAction,
  CallToActionContainer,
} from '../common/styled-components';
import { ReactElement } from 'react';
/* eslint-disable-next-line */
export interface FlightListProps {
  flights: IFlight[];
  onSelected?: (flight: IFlight) => void;
}

interface FlightListContainerProps {
  role: string;
}

const FlightListContainer = styled.ul.attrs<FlightListContainerProps>(
  (prop) => ({
    role: prop.role,
  })
)`
  margin: 0px;
  list-style-type: none;
  padding: 60px 0px 140px 0px;
`;

export function FlightList({
  flights,
  onSelected,
}: FlightListProps): ReactElement {

  if (flights?.length === 0 ) {
    return <div>Sorry there are no flights</div>;
  }

  return (
    <FlightListContainer role={'list'}>
      {flights?.map(
        (flight) =>
          flight && (
            <FlightItem
              key={flight?.flightNo}
              flight={flight}
              nest={true}
              onSelected={(v) => onSelected && onSelected(v)}
              callToAction={
                <CallToActionContainer>
                  <CallToAction>More Details</CallToAction>
                </CallToActionContainer>
              }
            />
          )
      )}
    </FlightListContainer>
  );
}

FlightList.displayName = 'Flight List';

export default FlightList;
