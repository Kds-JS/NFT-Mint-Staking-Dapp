import { Flex, Heading, Image, Button, Text, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, IconButton, Box } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import React, { useEffect } from 'react';
import metaLogo from '../Images/metaLogo.png';
import { useAccountContext, useUpdateAccountContext } from '../APP/AppContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const account = useAccountContext();
    const setAccount = useUpdateAccountContext();

    useEffect(() => {
      getAccounts();
    }, [])

    async function getAccounts() {
        if(typeof window.ethereum !== 'undefined') {
          let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          setAccount(accounts);
          console.log(account[0]);
        }
      }

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

        { account.length != 0 ? (
            <Flex color="white"  gap="10px" border="1px" borderColor="secondary.800" borderRadius="5px" py="5px" align="center" px="15px" _hover={{bg: "gray.700"}}>
              <Image src={metaLogo} alt="metaLogo" h="16px" borderRadius="2px"/>
              <span>{(account[0]).substr(0,6) + '.....' + (account[0]).substr(38)}</span>
            </Flex>
        )
        :
        (
              <Button colorScheme="pink" onClick={getAccounts}>
                Connect wallet
              </Button>
        )

        }
      </Box>

        <Box display={{base: 'block', lg: 'none'}}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<FaBars />}
              colorScheme="blue"
            />
            <MenuList bg="secondary.800" >

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

                { account.length != 0 ? (
                    <Flex mt="15px" bg="gray.400" color="white"  gap="10px" border="1px" borderColor="secondary.800" borderRadius="5px" py="5px" align="center" px="15px" _hover={{bg: "gray.700"}}>
                      <Image src={metaLogo} alt="metaLogo" h="16px" borderRadius="2px"/>
                      <span>{(account[0]).substr(0,6) + '.....' + (account[0]).substr(38)}</span>
                    </Flex>
                  )
                  :
                  (
                        <Button colorScheme="pink" onClick={getAccounts} w="100%" mt="15px">
                          Connect wallet
                        </Button>
                  )

                }

                
            </MenuList>
          </Menu>
        </Box>
    </Flex>
    );
};

export default Navbar;