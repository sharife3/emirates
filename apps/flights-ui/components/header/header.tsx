import { Columns } from '@bedrock-layout/columns';
import { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
  top: 0px;
  right: 0px;
  left: 0px;
  text-align: center;
  font-size: 1.8em;
  padding: 8px;
  outline: 0px;
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 1px solid red;
  margin-bottom: 10px;
  position: fixed;
  background: #c60d30;
  color: #fff;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 10%);
`;

type HeaderProps = {
  title: string;
};

const Header: FunctionComponent<HeaderProps> = ({
  title,
}: HeaderProps): ReactElement => {
  return (
    <HeaderBlock>
      <Columns column={1} gutter="md">
        {title}
      </Columns>
    </HeaderBlock>
  );
};

export default Header;
