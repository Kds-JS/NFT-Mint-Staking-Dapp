import { Flex, Heading, Image, Button, Text, Menu,
  MenuButton,
  MenuList, IconButton, Box } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {

    return (
        <Flex justify="space-between" align="center" mb="60px" py="25px"position="sticky" top="0" bg="secondary.900" zIndex="sticky" boxShadow="dark-lg">
        <Heading bgGradient='linear(to-r, primary.500, primary.800)' bgClip='text' size={{base: 'md', md: "xl"}}>
            My NFT Collection
        </Heading>

        <Flex gap="20px" wrap="wrap" display={{base: 'none', lg: 'flex'}}>

            <Link to="/">
                <Text fontSize="25px" color="blue.300" _hover={{color: 'primary.500'}}>
                  Mint
                </Text>
              </Link>

              <Link to="/staking">
                <Text fontSize="25px" color="blue.300" _hover={{color: 'primary.500'}}>
                  Staking
                </Text>
              </Link>
              
        </Flex>

      <Box display={{base: 'none', lg: 'block'}}> 
              <ConnectButton />
      </Box>

        <Box display={{base: 'block', lg: 'none'}}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<FaBars />}
              colorScheme="blue"
            />
            <MenuList bg="secondary.700" >

                <Link to="/">
                  <Text fontSize="25px" color="white" _hover={{bg: 'primary.500'}} px="15px">
                    Mint
                  </Text>
                </Link>


                <Link to="/staking">
                  <Text fontSize="25px" color="white" _hover={{bg: 'primary.500'}} px="15px">
                    Staking
                  </Text>
                </Link>

                <ConnectButton />

                
            </MenuList>
          </Menu>
        </Box>
    </Flex>
    );
};

export default Navbar;