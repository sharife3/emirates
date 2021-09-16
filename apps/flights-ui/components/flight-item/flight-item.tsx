import { Columns } from '@bedrock-layout/columns';
import { IFlight } from '@emirates/common/model';
import styled from 'styled-components';
import { formatDate } from '../../helpers/utils';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface FlightItemProps {
  flight: IFlight;
  onSelected?: (flight: IFlight) => void;
  callToAction?: React.ReactNode;
  nest?: boolean;
}

interface FlightDetailProps {
  title?: string;
  subTitle?: string;
  detail?: string;
}
interface FlightDetailStyleProps {
  alignItems?: 'start' | 'center' | 'end';
}

const FlightContainer = styled.div<FlightDetailStyleProps>`
  display: flex;
  justify-content: center;
  align-items: ${(prop) => (prop.alignItems ? prop.alignItems : 'start')};
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.5em;
`;

const SubTitle = styled.div`
  font-size: 0.8em;
`;

const Detail = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

function FlightDetail({
  title,
  subTitle,
  detail,
  alignItems = 'start',
}: FlightDetailProps & FlightDetailStyleProps) {
  return (
    <FlightContainer alignItems={alignItems}>
      {title && <Title>{title}</Title>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      {detail && <Detail>{detail}</Detail>}
    </FlightContainer>
  );
}

interface RowContainerProp {
  role: string;
  nest?: boolean;
}

export const RowContainer = styled.li.attrs<RowContainerProp>((prop) => ({
  role: prop.role,
}))<RowContainerProp>`
  margin: ${(prop) => (prop.nest ? '10px' : '0px')};
  padding: ${(prop) => (prop.nest ? '10px' : '0px')};
  cursor: pointer;
  border: ${(prop) => (prop.nest ? '1px solid #ccc' : '0')};
  border-top: ${(prop) => (prop.nest ? '2px solid #b14242' : '0')};
  background: #fff;

  &:hover {
    background: ${(prop) => (prop.nest ? '#F5F5F5' : '#fff')};
  }
`;

export function FlightItem({
  flight,
  onSelected,
  callToAction,
  nest,
}: FlightItemProps): ReactElement {
  const departure = flight?.departure;
  const arrival = flight?.arrival;

  return (
    <RowContainer
      onClick={() => onSelected && onSelected(flight)}
      role={'listItem'}
      nest={nest}
    >
      <Columns columns={3} gutter={'md'} switchAt="35rem">
        <FlightDetail
          title={departure?.airport?.iata}
          subTitle={departure?.airport?.name}
          detail={formatDate(departure?.date)}
        />
        <FlightDetail
          subTitle={flight?.flightNo}
          detail={flight?.airline?.name}
          alignItems="center"
        />
        <FlightDetail
          title={arrival?.airport?.iata}
          subTitle={arrival?.airport?.name}
          detail={formatDate(arrival?.date)}
          alignItems="end"
        />
        {callToAction}
      </Columns>
    </RowContainer>
  );
}

export default FlightItem;
