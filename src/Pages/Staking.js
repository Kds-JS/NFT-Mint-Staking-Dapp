import React, {useState, useEffect} from 'react';
import { useAccountContext, useUpdateAccountContext } from '../APP/AppContext';

import { ethers } from 'ethers';
import LionStaking from '../artifacts/contracts/LionStaking.sol/LionStaking.json';
import LionNft from '../artifacts/contracts/LionNFT.sol/LionNFT.json';
import LionToken from '../artifacts/contracts/LionToken.sol/LionToken.json';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';

const nftContractAddress = '0xa9ABD93032E9f2e3E0177bf52aee4c1CC69B8Cec';
const tokenContractAddress = '0x2f0AE90811f0367b388c3196dE9AcfB5f46ba9c5';
const stakingContractAddress = '0x234466b0B29062228cA12510Cd1b17c0F1a414Ab';
const nftpng = "https://ipfs.io/ipfs/bafybeifo4chypbuqngrzhterzn6bxu2lxlaqhi6u66bz5nb3pdqlg3mgny/";

const Staking = () => {

    const account = useAccountContext();
    const [error, setError] = useState('');
    const [ownerTokensId, setOwnerTokensId] = useState([]);
    const [ownerTokenStakedId, setOwnerTokenStakedId] = useState([]);
    const [rewardsAmount, setRewardsAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    // console.log(balance);


    useEffect(() => {
        fetchNftData();
        fetchStakingData();
        fetchTokenData();
    }, [account])

    async function fetchNftData() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(nftContractAddress, LionNft.abi, provider);
          try {
    
            if(account) {
              const tokensId = await contract.tokensOfOwner(account[0]);
              let ownerTokensId = [];
                tokensId.map((tokenId) => (
                    ownerTokensId.push(parseInt(tokenId._hex))
                ))
              
              setOwnerTokensId(ownerTokensId);
            }
          }
          catch (err) {
            setError(err.message);
          }
        }
    }

    async function approvalForAll() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(nftContractAddress, LionNft.abi, signer);
          try {
            if(account) {
              const tokensId = await contract.setApprovalForAll(stakingContractAddress, true);
            }
          }
          catch (err) {
            setError(err.message);
          }
        }
    }

    async function addAdmin() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(tokenContractAddress, LionToken.abi, signer);
          try {
            if(account) {
              const tokensId = await contract.addAdmin(stakingContractAddress);
            }
          }
          catch (err) {
            setError(err.message);
          }
        }
    }

    async function fetchStakingData() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(stakingContractAddress, LionStaking.abi, provider);
          try {
            if(account) {
              const tokensId = await contract.tokenStakedByOwner(account[0]);
              let ownerTokenStakedId = [];
                tokensId.map((tokenId) => (
                    ownerTokenStakedId.push(parseInt(tokenId._hex))
                ))
              
                setOwnerTokenStakedId(ownerTokenStakedId);

                const rewardsAmount = await contract.getRewardsAmount(account[0], ownerTokenStakedId); 
                setRewardsAmount(parseInt(rewardsAmount._hex) / 10 ** 18)
            }
          }
          catch (err) {
            setError(err.message);
          }
        }
    }

    async function fetchTokenData() {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(tokenContractAddress, LionToken.abi, provider);
          try {
            if(account) {
              const accountBalance = await contract.balanceOf(account[0]);
              setBalance((parseInt(accountBalance._hex) / 10 ** 18).toFixed(2));
            }
          }
          catch (err) {
            setError(err.message);
          }
        }
    }

    async function stake(tokensId) {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(stakingContractAddress, LionStaking.abi, signer);
          try {
            const transaction = await contract.Stake(tokensId, { gasLimit: 1 * 10 ** 6 });
            await transaction.wait();
          }
          catch (err) {
            setError(err.message);
            console.log(err);
          }
        }
      }

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
            setError(err.message);
            console.log(err);
          }
        }
      }

      async function claim(tokensId) {
        if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(stakingContractAddress, LionStaking.abi, signer);
          try {
            const transaction = await contract.claim(tokensId, { gasLimit: 1 * 10 ** 6 });
            await transaction.wait();
          }
          catch (err) {
            setError(err.message);
            console.log(err);
          }
        }
      }


    return (
        <Box mb="100px">
            <Box >
                <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" mb="25px">Your tokens</Text>
                <Button onClick={approvalForAll} mb="25px">Approvl</Button>
                <Button onClick={addAdmin} ml="25px" mb="25px">AddAdmin</Button>

                <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="60px">
                    <Card  textAlign="center" border="1px" borderColor="secondary.800" fontSize="25px" fontWeight="bold">
                        <CardHeader fontSize="18px" >
                        <Text color="gray.400">
                            Claimable Rewards
                        </Text>
                        </CardHeader>

                        <CardBody>
                            <Text color="white">
                                {rewardsAmount} $ALF
                            </Text>
                        </CardBody>
                    </Card>

                    <Card  textAlign="center" border="1px" borderColor="secondary.800" fontSize="25px" fontWeight="bold">
                        <CardHeader fontSize="18px" >
                        <Text color="gray.400">
                            Current Balance
                        </Text>
                        </CardHeader>

                        <CardBody>
                            <Text color="white">
                                {balance} $ALF
                            </Text>
                        </CardBody>
                    </Card>

                </Grid>

                <Box textAlign="center" mt="25px" >
                    <Button colorScheme="pink" borderRadius="full" w={{base: "100%", md:"25%"}} fontSize="25px" py="7" onClick={() => claim(ownerTokenStakedId)}>
                        Claim reward
                    </Button>
                </Box>
                
            </Box>

            <Box>
                <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" my="35px">Your NFTs</Text>

                <Grid templateColumns={{base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)'}} gap="60px">

                        <Box border="1px" borderColor="secondary.800" borderRadius="15px"  px="20px" pb="25px">
                        <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap="25px" my="25px">
                            <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" >Your Staked NFTs</Text>
                            <Button colorScheme='blue' onClick={() => unstacke(ownerTokenStakedId)}>Unstaked All</Button>
                        </Flex>

                        <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="20px">

                        {ownerTokenStakedId.length != 0 ? (
                        ownerTokenStakedId.map((token, index) => (
                            
                        <Card maxW='sm' borderRadius="lg" bg="secondary.800" key={index}>
                            <CardBody h="300px" p="0">
                                <Image
                                src={nftpng + token + '.png'}
                                alt='Green double couch with wooden legs'
                                borderTopRadius='lg'
                                
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


                        <Box border="1px" borderColor="secondary.800" borderRadius="15px"  px="20px" pb="25px">
                        <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap="25px" my="25px">
                            <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" >Your Unstaked NFTs</Text>
                            <Button colorScheme='blue' onClick={() => stake(ownerTokensId)}>Staked All</Button>
                        </Flex>

                        <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="20px">

                        {ownerTokensId.length != 0 ? (
                        ownerTokensId.map((token, index) => (
                            
                        <Card maxW='sm' borderRadius="lg" bg="secondary.800" key={index}>
                            <CardBody h="300px" p="0">
                                <Image
                                src={nftpng + token + '.png'}
                                alt='Green double couch with wooden legs'
                                borderTopRadius='lg'
                                
                                />
                            </CardBody>
                            
                            <CardFooter display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="25px" px="5px">

                                <Text color="white">Alpha Lions #{token}</Text>
                            
                                <Button variant='solid' colorScheme='blue' onClick={() => stake([token])}>
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

                </Grid>
            </Box>
        </Box>
    );
};

export default Staking;