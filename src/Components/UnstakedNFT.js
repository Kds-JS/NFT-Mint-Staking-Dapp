import { Box, Flex, Grid, Image, Card, CardBody, CardFooter, Text, Button } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';

import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import LionStaking from '../artifacts/contracts/LionStaking.sol/LionStaking.json';
import LionNft from '../artifacts/contracts/LionNFT.sol/LionNFT.json';


const stakingContractAddress = '0x234466b0B29062228cA12510Cd1b17c0F1a414Ab'; 

const nftContractAddress = '0xa9ABD93032E9f2e3E0177bf52aee4c1CC69B8Cec';

const nftpng = "https://ipfs.io/ipfs/bafybeifo4chypbuqngrzhterzn6bxu2lxlaqhi6u66bz5nb3pdqlg3mgny/";

const UnstakedNFT = () => {

    const { address, isConnecting, isDisconnected } = useAccount();
    const [ownerTokensId, setOwnerTokensId] = useState([]);


    useEffect(() => {
        fetchNftData();
        updateData();
    }, [address])

    const updateData = () => {
      if(isDisconnected) {
        setOwnerTokensId([]);
      }
    }

    async function fetchNftData() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(nftContractAddress, LionNft.abi, provider);
          try {
    
            if(address) {
              const tokensId = await contract.tokensOfOwner(address);
              let ownerTokensId = [];
                tokensId.map((tokenId) => (
                    ownerTokensId.push(parseInt(tokenId._hex))
                ))
              
              setOwnerTokensId(ownerTokensId); 
            }
          }
          catch (err) {
            console.log(err.message);
          }
        }
    }

    async function approvalForAll() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(nftContractAddress, LionNft.abi, provider);
          const newContract = new ethers.Contract(nftContractAddress, LionNft.abi, signer);
          try {
            if(address) {
                const isApprovedForAll = await contract.isApprovedForAll(address,stakingContractAddress);
                if (!isApprovedForAll) {
                    const approval = await newContract.setApprovalForAll(stakingContractAddress, true);
                }
            }
          }
          catch (err) {
            console.log(err.message);
          }
        }
    }

    async function stake(tokensId) {
        await approvalForAll();
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(stakingContractAddress, LionStaking.abi, signer);
          try {
            const transaction = await contract.Stake(tokensId, { gasLimit: 1 * 10 ** 6 });
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
                <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" >Your Unstaked NFTs</Text>
                {!isDisconnected && <Button colorScheme='teal' onClick={() => stake(ownerTokensId)}>Staked All</Button>}
            </Flex>

            <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="20px">

            {ownerTokensId.length != 0 ? (
            ownerTokensId.map((token, index) => (
                
            <Card maxW='sm' borderRadius="lg" bg="secondary.800" key={index} >
                    <CardBody p="0" overflow="hidden" borderTopRadius="lg">
                        <Image
                        src={nftpng + token + '.png'}
                        alt='Alpha Lions'
                        transform="scale(1)"
                        transition= "0.3s ease-in-out"
                        _hover={{transform: "scale(1.15)"}}
                        />
                    </CardBody>
                    
                    <CardFooter display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="25px" px="5px">

                        <Text color="white" >Alpha Lions #{token}</Text>
                    
                        <Button variant='solid' colorScheme='teal' onClick={() => stake([token])}>
                            Staked
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

export default UnstakedNFT;