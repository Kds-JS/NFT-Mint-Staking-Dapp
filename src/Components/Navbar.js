import { Flex, Heading, Image, Button } from '@chakra-ui/react';
import React from 'react';
import metaLogo from '../Images/metaLogo.png';
import { useAccountContext, useUpdateAccountContext } from '../APP/AppContext';

const Navbar = () => {
    const account = useAccountContext();
    const setAccount = useUpdateAccountContext();

    async function getAccounts() {
        if(typeof window.ethereum !== 'undefined') {
          let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          setAccount(accounts);
          console.log(account[0]);
        }
      }

    return (
        <Flex justify="space-between" align="center" mb="60px" py="25px"position="sticky" top="0" bg="secondary.900" zIndex="sticky" boxShadow="dark-lg">
        <Heading bgGradient='linear(to-r, primary.500, primary.800)' bgClip='text' size={{base: 'md', md: "2xl"}}>
            My NFT Collection
        </Heading>


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
        
    </Flex>
    );
};

export default Navbar;