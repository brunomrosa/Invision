import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {

    --primary-color: #707070;
    --secondary-color: #64C77C;
    --terciary-color: #17EAD9;
    --quartenary-color: #A9C5BA;
    --color-white: #ffffff;


    --color-danger: #D82143;


    --primary-initial-bg: #FFF;
    --secondary-initial-bg: #F5F5F5;

    --box-shadow: 0px 3px 6px #00000029;

    --primary-initial-button: #3C8ACB;


    --primary-initial-text: #707070;
    --secondary-initial-text: #000000;
    --terciary-initial-text: #A9C5BA;


    --primary-initial-input: #D9D9D9;

    --default-font-weight: 500;
    --google-font-settings: normal normal normal 18px/22px Lato;
    --default-font-components: 16px 'Mulish';
    --default-font-text: 15px;
    --invision-title-font: normal normal 900 35px/48px Lato;

    --max-height: 100vh;
    --max-width: 100vw;
  }

  body {
    background: var(--primary-initial-bg);
    color: var(--primary-initial-text);
    -webkit-font-smoothing: antialised;
    max-height: var(--max-height);
    max-width: var(--max-width);
  }

  body, input, button {
    font: var(--default-font-components)

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: var(--default-font-weight);
  }

  button {
    cursor: pointer;
    border: none;
  }



  p, a {
    font-size: var(--default-font-text)
  }


`;
