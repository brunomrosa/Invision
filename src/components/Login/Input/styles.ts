import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-bottom: 1px solid var(--primary-initial-text);
  width: 100%;
  color: var(--secondary-initial-text);
  display: flex;
  align-items: center;
  margin: 8px 0px;

  ${props =>
    props.isErrored &&
    css`
      border-radius: 5px;
      border-bottom: 1px solid var(--color-danger);
      border-left: 1px solid var(--color-danger);
    `}

  input {
    padding: 0 0 5px 15px;
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--secondary-initial-text);
    &::placeholder {
      color: var(--secondary-initial-text);
    }
  }

  input:invalid {
    border-color: black;
    box-shadow: none;
  }

  svg {
    margin-right: 16px;
  }

  @media screen and (max-width: 360px) {
    padding: 12px;
    svg {
      margin-right: 12px;
    }
  }

  @media screen and (max-width: 328px) {
    padding: 10px;
    svg {
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 320px) {
    padding: 8px;
    svg {
      margin-right: 8px;
      width: 16px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: var(--color-danger);
    color: var(--color-white);
    &::before {
      border-color: var(--color-danger) transparent;
    }
  }
`;
