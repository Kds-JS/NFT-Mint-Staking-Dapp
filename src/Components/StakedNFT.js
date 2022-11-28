import { Box, Flex, Grid, Image, Card, CardBody, CardFooter, Text, Button } from '@chakra-ui/react';
import React from 'react';

import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import LionStaking from '../artifacts/contracts/LionStaking.sol/LionStaking.json';

const stakingContractAddress = '0x234466b0B29062228cA12510Cd1b17c0F1a414Ab';

const nftpng = "https://ipfs.io/ipfs/bafybeifo4chypbuqngrzhterzn6bxu2lxlaqhi6u66bz5nb3pdqlg3mgny/";

const StakedNFT = ({ownerTokenStakedId}) => {
    
    const { address, isConnecting, isDisconnected } = useAccount();

    async function unstacke(tokensId) {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(stakingContractAddress, LionStaking.abi, signer);
          try {
            const transaction = await contract.unstack(tokensId, { gasLimit: 1 * 10 ** 6 });
            await transaction.wait();
          }
          catch (err) {
            console.log(err.message);
          }
        }
      }


    return (
        <Box border="1px" borderColor="secondary.800" borderRadius="15px"  px="20px" pb="25px">
            <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap="25px" my="25px">
                <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" >Your Staked NFTs</Text>
                {!isDisconnected && <Button colorScheme='blue' onClick={() => unstacke(ownerTokenStakedId)}>Unstaked All</Button>}
            </Flex>

            <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="20px">

            {ownerTokenStakedId.length != 0 ? (
            ownerTokenStakedId.map((token, index) => (
                
            <Card maxW='sm' borderRadius="lg" bg="secondary.800" key={index}>
                <CardBody p="0" overflow="hidden" borderTopRadius='lg'>
                    <Image
                    src={nftpng + token + '.png'}
                    alt='Alpha Lions'
                    transform="scale(1)"
                    transition= "0.3s ease-in-out"
                    _hover={{transform: "scale(1.15)"}}
                    />
                </CardBody>
                
                <CardFooter display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="25px" px="5px">

                    <Text color="white">Alpha Lions #{token}</Text>
                
                    <Button variant='solid' colorScheme='blue' onClick={() => unstacke([token])}>
                        Unstaked
                    </Button>
                </CardFooter>
            </Card>

            ))
            )
            :
            (
                <Box>You don't have any NFT</Box>
            )
            }
            

            </Grid>

        </Box>
    );
};

export default StakedNFT;