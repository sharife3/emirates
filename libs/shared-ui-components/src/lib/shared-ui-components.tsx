import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SharedUiComponentsProps {}

const StyledSharedUiComponents = styled.div`
  color: pink;
`;

export function SharedUiComponents(props: SharedUiComponentsProps) {
  return (
    <StyledSharedUiComponents>
      <h1>Welcome to SharedUiComponents!</h1>
    </StyledSharedUiComponents>
  );
}

export default SharedUiComponents;
