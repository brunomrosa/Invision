import styled, { css } from 'styled-components';

interface ContainerProps {
  img: string;
}
interface ButtonProps {
  isActive?: boolean;
}
export const Container = styled.div<ContainerProps>`
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  width: 50vw;
  background-color: var(--quartenary-color);
  flex-direction: column;
  align-content: center;
  justify-content: flex-end;
  align-items: center;

  color: var(--color-white);
  img {
    width: 40vw;
    height: 60vh;
  }
  h1 {
    color: var(--color-white);
  }
  p {
    max-width: 400px;
    text-align: center;
  }
`;

export const Buttons = styled.div`
  flex-direction: row;
`;

export const Button = styled.button<ButtonProps>`
  ${props =>
    props.isActive
      ? css`
          width: 25px;
        `
      : css`
          width: 10px;
          opacity: 0.5;
        `};
  height: 10px;
  background: var(--primary-initial-bg) 0% 0% no-repeat padding-box;
  margin: 40px 5px;
  border-radius: 50px;
`;
