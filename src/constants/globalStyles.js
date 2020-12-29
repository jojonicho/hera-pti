import theme from 'utils/theme'

const globalStyles = `
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    display: flex;
    flex-direction: column;
    font-family: ${theme.fonts.body};
  }
  input {
    border: none;
  }
  button {
    cursor: pointer;
    border: none;
  }
  h1 {
    font-family: ${theme.fonts.heading};
  }
  textarea:focus,
  button:focus,
  input:focus {
    outline: none;
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #5f637e #dedede;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #dedede;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #5f637e;
    border-radius: 20px;
    border: 2px solid #5f637e;
  }
`

export default globalStyles
