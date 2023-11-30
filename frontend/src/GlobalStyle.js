import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
}

html, body, #root {
  background: black;
  color: white;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}

// Default text selection color
::selection {
  /* color: white !important;
  background: white !important; */
}

ul li {
  list-style: none;
}

input {
  accent-color: black;
}
`;

export default GlobalStyle;
