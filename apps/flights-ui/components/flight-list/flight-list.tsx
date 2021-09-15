import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FlightListProps {}

const StyledFlightList = styled.div`
  color: pink;
`;

export function FlightList(props: FlightListProps) {
  return (
    <StyledFlightList>
      <h1>Welcome to FlightList!</h1>
    </StyledFlightList>
  );
}

export default FlightList;
