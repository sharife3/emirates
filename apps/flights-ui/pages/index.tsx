import styled from 'styled-components';
import { useState } from 'react';
import { IFlight } from '@emirates/common/model';
import { FlightItem } from '../components/flight-item/flight-item';
import { FlightList } from '../components/flight-list/flight-list';
import { ReactElement } from 'react';
import { API_ENDPOINT } from '../config/settings';
import {
  CallToAction,
  CallToActionContainer,
} from '../components/common/styled-components';

const FixedPanel = styled.ul`
  position: fixed;
  bottom: -19px;
  margin-bottom: 19px;
  right: 0;
  left: 0;
  background: white;
  list-style-type: none;
  padding: 10px;
  border-top: 2px solid #ccc;
  // border-top: 2px solid #1f5a2d;
  box-shadow: 0px -6px 14px 0px rgb(0 0 0 / 10%);
`;

FixedPanel.displayName = 'FixedPanel';

export interface IndexProps {
  flights: IFlight[];
}

export const onClickAction = (setSelectedFlight) => (): void => {
  alert('Flight Booked');
  setSelectedFlight(null);
};

export function Index({ flights }: IndexProps): ReactElement {
  const [selectedFlight, setSelectedFlight] = useState(null);

  return (
    <>
      <FlightList flights={flights} onSelected={(v) => setSelectedFlight(v)} />
      <FixedPanel>
        {selectedFlight && (
          <FlightItem
            key={`selected-${selectedFlight.flightNo}`}
            flight={selectedFlight}
            onSelected={onClickAction(setSelectedFlight)}
            callToAction={
              <CallToActionContainer>
                <CallToAction style={{ background: 'green' }}>
                  Book Flight
                </CallToAction>
              </CallToActionContainer>
            }
          />
        )}
      </FixedPanel>
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { flights: IFlight[] };
}> {
  try {
    const res = await fetch(`${API_ENDPOINT}/flights`);
    const flights = await res.json();

    if (!flights) {
      return {
        props: {
          flights: [],
        },
      };
    }

    return {
      props: {
        flights,
      },
    };
  } catch (e) {
    return {
      props: {
        flights: [],
      },
    };
  }
}

export default Index;
