import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, HStack, Image, Input, Link, Progress, Stack, Text, useNumberInput } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import img from '../Images/56.png';
import { useAccountContext} from '../APP/AppContext';


import { ethers } from 'ethers';
import AlphaLions from '../artifacts/contracts/LionNFT.sol/LionNFT.json';

const ALaddress = '0xa9ABD93032E9f2e3E0177bf52aee4c1CC69B8Cec';



const Mint = () => {

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 5,
        precision: 0,
    })
  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const value = input.value;
//   console.log(value);

  const account = useAccountContext();
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [owner, setOwner] = useState(false);
 

  console.log(account);
  

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    verifyIsOwner();
    fetchData();
  }, [account])

  function verifyIsOwner() {
    if(account) {
        if('0x3a098505103ccf5e5cc21b60df7aad9daf7a6241' === account[0]){
            setOwner(true);
            
        } else {
            setOwner(false);
        }
    } else{
        setOwner(false);
    }
  }

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ALaddress, AlphaLions.abi, provider);
      try {
        const mintPrice = await contract.mintPrice();
        const totalSupply = await contract.totalSupply();
        const object = {"price": String(mintPrice), "totalSupply": String(totalSupply)};
        setData(object);
      }
      catch (err) {
        setError(err.message);
      }
    }
  }
  

  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      let account = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ALaddress, AlphaLions.abi, signer);
      try {
        let overrides = {
          from: account[0],
          value: (data.price * value).toString()
        }
        const transaction = await contract.publicSaleMint(account[0], value, overrides);
        await transaction.wait();
        fetchData();
      }
      catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    }
  }

  async function withdraw() {
    if(typeof window.ethereum !== 'undefined') {
      let account = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ALaddress, AlphaLions.abi, signer);
      try {
        const transaction = await contract.releaseAll();
        await transaction.wait();
      }
      catch (err) {
        setError(err.message);
      }
    }
  }


    return (
        <Box  mb="100px">

            <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap="60px">
                <Stack order={{base: '2', md:'1'}} spacing="25px" >
                    <Text color="white" fontSize="5xl" fontWeight="bold">
                        Alpha Lions
                    </Text>

                    <Flex justify="space-between" align="center">
                        <Text fontSize="18px" color="primary.600">
                            TOTAL ITEMS: <span style={{fontWeight: 'bold', color: 'white'}}>333</span>
                        </Text>

                        <Text fontSize="18px" color="primary.600">
                            PRICE: <span style={{fontWeight: 'bold', color: 'white'}}>0.003 ETH</span>
                        </Text>

                    </Flex>

                    <Flex justify="space-between" align="center" wrap='wrap' gap="15px">
                    <Text>
                        Network: <span>Göerli Testnet</span>
                    </Text>

                    <Link href='https://goerli-faucet.pk910.de/' _hover={{textDecoration: 'none'}} target="_blank">
                        <Button colorScheme="cyan">
                            Claim ETH on Göerli faucet
                        </Button>
                    </Link>

                    </Flex>

                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos pariatur similique sequi. Voluptatem voluptate quod architecto voluptates deserunt, tenetur laudantium at veniam vitae. Dolorem sequi nobis eaque iusto, ullam ipsa.
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iusto optio corporis eligendi doloribus tenetur itaque assumenda corrupti accusantium quam, perferendis amet asperiores fugiat? Nostrum ut libero recusandae reprehenderit quas!
                    </Text>

                    <Link href='https://testnets.opensea.io/collection/alpha-lions-nft-v2' _hover={{textDecoration: 'none'}} target="_blank">
                        <Button colorScheme="facebook" w="100%">
                            View on Opensea
                        </Button>
                    </Link>

                    { owner && (
                        <>
                            <Button onClick={withdraw}>withdraw</Button>
                        </>
                    )
                    }

                </Stack>

                <Stack order={{base: '1', md:'2'}} spacing="25px">
                    <Flex justify="center">
                      <Image src={img} alt="nftImage"borderRadius="md" w={{base: 'auto', lg: "300px"}} h="300px" objectFit="contain"/>
                    </Flex>

                    <Box>
                        <Flex justify="space-between" fontSize="17px">
                            <span>Total minted</span>
                            <Text><span style={{color: 'white', fontWeight: 'bold'}}>{((data.totalSupply/333)*100).toFixed(0)}%</span> ({data.totalSupply}/333)</Text>
                        </Flex>
                        <Box mt="5px">
                            <Progress bg="secondary.800" size="md" value={((data.totalSupply/333)*100).toFixed(0)} colorScheme="pink" borderRadius="full"/>
                        </Box>
                    </Box>

                    <Card bg="secondary.700" color="white">
                        <CardHeader fontSize="18px" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="15px">
                        <Text >
                            Price: <span style={{fontWeight: 'bold'}}>0.003 ETH</span>
                        </Text>
                        <HStack maxW='320px'>
                            <Button {...dec} colorScheme="cyan">-</Button>
                            <Input {...input}/>
                            <Button {...inc} colorScheme="cyan">+</Button>
                        </HStack>
                        </CardHeader>

                        <CardBody>
                            <Button w="100%" colorScheme="pink" onClick={mint}>Mint {value}</Button>
                        </CardBody>
                    </Card>
                </Stack>
            </Grid>
        </Box>
    );
};

export default Mint;