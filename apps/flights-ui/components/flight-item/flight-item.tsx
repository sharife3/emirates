import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FlightItemProps {}

const StyledFlightItem = styled.div`
  color: pink;
`;

export function FlightItem(props: FlightItemProps) {
  return (
    <StyledFlightItem>
      <h1>Welcome to FlightItem!</h1>
    </StyledFlightItem>
  );
}

export default FlightItem;
