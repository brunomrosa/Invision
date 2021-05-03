import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: var(--max-height);
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  justify-content: space-between;
  background-color: var(--primary-initial-bg);

  width: var(--max-width);
  max-width: calc(var(--max-width) / 2);
  height: var(--max-height);
  max-height: var(--max-height);
  @media screen and (max-width: 798px) {
    max-width: 500px;
  }

  h1:first-of-type {
    display: flex;
    justify-content: flex-start;
    font: var(--invision-title-font);
    color: var(--secondary-initial-text);
    margin-left: 60%;
    margin-top: 5%;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  animation: ${appearFromLeft} 1s;

  img {
    display: flex;
    height: 75px;
    width: 75px;
    position: relative;
    margin-left: auto;
  }
  h2 {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5%;
    color: var(--primary-initial-text);
  }
  form {
    width: 400px;

    p {
      color: var(--secondary-initial-text);
      margin: 0;
    }

    button {
      margin: auto;
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 0 16px;
      height: 45px;
      width: 175px;
      border-radius: 40px;
      background-color: var(--primary-color);
      margin-top: 30px;
      color: var(--color-white);
      font-weight: var(--default-font-weight);
      transition: background-color 0.4s;

      &:hover {
        background: ${shade(0.2, '#3C8ACB')};
      }
    }

    a {
      color: var(--secondary-initial-text);

      display: flex;
      margin-top: 10px;
      justify-content: flex-end;
      transition: color 0.2s;
    }
  }

  @media screen and (max-width: 458px) {
    form {
      width: 350px;
    }
  }

  @media screen and (max-width: 378px) {
    form {
      width: 320px;
    }
  }

  @media screen and (max-width: 328px) {
    form {
      width: 300px;
    }
  }
`;

export const OrBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  hr {
    width: 50%;
    background: var(--primary-initial-input);
    border: 1px solid var(--primary-initial-input);
    margin: 0 20px;
  }
`;
export const RedirectLink = styled.div`
  display: flex;
  margin: 5px 0;
  text-align: center;
  p {
    margin: 0;
  }
  a {
    margin: 0;
    color: var(--terciary-initial-text);
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }
  div {
    display: flex;
  }
`;
export const GoogleSignIn = styled.div`
  :hover {
    cursor: pointer;
  }
  background: var(--primary-initial-bg) 0% 0% no-repeat padding-box;
  box-shadow: var(--box-shadow);
  height: 45px;
  border-radius: 100px;
  width: 225px;
  display: flex;
  img {
    margin: auto;
    height: 30px;
    width: 30px;
  }
  p {
    font: var(--google-font-settings);
    color: var(--secondary-initial-text);
    margin-top: auto;
    margin-right: auto;
    margin-bottom: auto;
  }
`;

export const Background = styled.div`
  max-width: calc(var(--max-width) / 2);

  display: flex;

  background-color: var(--secondary-initial-bg);
`;
