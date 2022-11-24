import React, {useState, useEffect} from 'react';
import { useAccountContext, useUpdateAccountContext } from '../APP/AppContext';

import { ethers } from 'ethers';
import LionStaking from '../artifacts/contracts/LionStaking.sol/LionStaking.json';
import LionToken from '../artifacts/contracts/LionToken.sol/LionToken.json';
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, Text } from '@chakra-ui/react';
import UnstakedNFT from '../Components/UnstakedNFT';
import StakedNFT from '../Components/StakedNFT';

const tokenContractAddress = '0x2f0AE90811f0367b388c3196dE9AcfB5f46ba9c5';
const stakingContractAddress = '0x234466b0B29062228cA12510Cd1b17c0F1a414Ab';

const Staking = () => {

    const account = useAccountContext();
    const [ownerTokenStakedId, setOwnerTokenStakedId] = useState([]);
    const [rewardsAmount, setRewardsAmount] = useState(0);
    const [balance, setBalance] = useState(0);


    useEffect(() => {
      fetchStakingData();
      fetchTokenData();
    }, [account])


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
              setRewardsAmount((parseInt(rewardsAmount._hex) / 10 ** 18).toFixed(2))
          }
        }
        catch (err) {
          console.log(err.message);
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
            console.log(err.message);
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
            console.log(err.message);
          }
        }
      }


    return (
        <Box mb="100px">
            <Box >
                <Text textAlign="center" fontSize="30px" color="white" fontWeight="bold" mb="25px">Your tokens</Text>

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

                        <StakedNFT ownerTokenStakedId={ownerTokenStakedId}/>
                        <UnstakedNFT/>

                </Grid>
            </Box>
        </Box>
    );
};

export default Staking;