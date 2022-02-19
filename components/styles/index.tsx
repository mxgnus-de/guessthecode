import * as styled from 'styled-components';

const GlobalStyles = styled.createGlobalStyle`
   * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: 'Roboto', sans-serif;
   }

   body {
      background-image: linear-gradient(
         to left top,
         #ff7d41,
         #ff9333,
         #ffab23,
         #ffc40f,
         #ffdd00,
         #f5e800,
         #eaf400,
         #dcff00,
         #bfff00,
         #9dff00,
         #72ff00,
         #22ff00
      );
      background-size: cover;
      background-repeat: no-repeat;
   }

   body,
   html {
      height: 100%;
      width: 100%;
      overflow-x: hidden;
   }

   #__next {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
   }

   .gist-meta {
      display: none;
   }

   .gist-title {
      display: none;
   }

   /** REMOVE DEFAULT STYLING **/
   textarea {
      background-color: transparent;
      resize: none;
      padding: 0;
      border: none;
      outline: none;
   }
   li {
      list-style: none;
   }
   a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      font-size: 1rem;
   }
   button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 1rem;
   }
   input {
      border: none;
      background-color: transparent;
   }
   input:focus {
      outline: none;
   }
   select {
      border: none;
      background-color: transparent;
   }
   select:focus {
      outline: none;
   }

   /** UTILS **/

   .pointer {
      cursor: pointer;
   }
`;

export default GlobalStyles;
