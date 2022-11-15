import React from 'react';
import {
  ChakraProvider,
  Box,
  extendTheme
} from '@chakra-ui/react';
import Home from './Components/Home';
import Styles from './Styles/Home.module.css';

const colors = {
  primary: {
    900: '#D0CDE0',
    800: '#636ED7',
    700: '##7CC4F4',
    600: '#D4618D',
    500: '#D3336D'
  },
  secondary: {
    900: '#01040D',
    800: '#575761',
    700: '#1C1326'
  }
}

const styles = {
  global: {
    'html, body': {
      color: 'secondary.800',
      lineHeight: 'tall',
      fontSize: '16px',
      backgroundColor: "secondary.900",
      boxSizing: 'border-box'
    },
    a: {
      fontSize: "20px",
      textDecoration: "none"
    }
  },
}

const breakpoints = {
  sm: '385px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({ colors,styles, breakpoints})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box px={{base: "5%", md:"7%", lg: "10%"}}>
        <Home/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
