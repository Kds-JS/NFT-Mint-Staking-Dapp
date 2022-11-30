import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  extendTheme
} from '@chakra-ui/react';
import { BrowserRouter, Routes,  Route } from 'react-router-dom';

import Mint from 'Pages/Mint';
import Staking from 'Pages/Staking';
import 'Styles/Home.css';
import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import Loader from './Loader';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// Add more wallet connexion with rainbowkit

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli, chain.hardhat],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
// Add more wallet connexion with rainbowkit

// Custom Chakra default theme 

const colors = {
  primary: {
    900: '#D0CDE0',
    800: '#636ED7',
    700: '#7CC4F4',
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

// Custom Chakra default theme 

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000)
  }, [])


  


  return loader ? (
    <Loader/>
  ) : (
        <ChakraProvider theme={theme}>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains} theme={darkTheme({
                accentColor: '#B83280',
                accentColorForeground: 'white',
                borderRadius: 'medium',
              })}>
                <BrowserRouter>
                <Box px={{base: "5%", md:"7%", lg: "10%"}}>
                  <Navbar/>
                  <Routes>
                    <Route path="/" element={<Mint />}/>
                    <Route path="/staking" element={<Staking />}/>
                  </Routes>
                  <Footer/>
                </Box>
                </BrowserRouter>
              </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
  );
}

export default App;
