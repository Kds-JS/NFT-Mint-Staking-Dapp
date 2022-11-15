import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, Heading, HStack, Image, Input, Link, Progress, Stack, Text, useNumberInput } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import img from '../Images/56.png';

const Home = () => {

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
  console.log(value);

    return (
        <Box  mb="100px">
            <Flex justify="space-between" align="center" mb="60px" py="25px"position="sticky" top="0" bg="secondary.900" zIndex="sticky" boxShadow="dark-lg">
                <Heading bgGradient='linear(to-r, primary.500, primary.800)' bgClip='text' size={{base: 'md', md: "2xl"}}>
                    My NFT Collection
                </Heading>


                <Button colorScheme="pink">
                    Connect wallet
                </Button>
                
            </Flex>

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
                            PRICE: <span style={{fontWeight: 'bold', color: 'white'}}>0.002 ETH</span>
                        </Text>

                    </Flex>

                    <Flex justify="space-between" align="center" wrap='wrap' gap="15px">
                    <Text>
                        Network: <span>Göerli Testnet</span>
                    </Text>

                    <Link href='https://faucets.chain.link/' _hover={{textDecoration: 'none'}} target="_blank">
                        <Button colorScheme="cyan">
                            Claim ETH on Chainlink faucet
                        </Button>
                    </Link>

                    </Flex>

                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos pariatur similique sequi. Voluptatem voluptate quod architecto voluptates deserunt, tenetur laudantium at veniam vitae. Dolorem sequi nobis eaque iusto, ullam ipsa.
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iusto optio corporis eligendi doloribus tenetur itaque assumenda corrupti accusantium quam, perferendis amet asperiores fugiat? Nostrum ut libero recusandae reprehenderit quas!
                    </Text>

                    <Link href='https://faucets.chain.link/' _hover={{textDecoration: 'none'}} target="_blank">
                        <Button colorScheme="facebook" w="100%">
                            View on Opensea
                        </Button>
                    </Link>

                </Stack>

                <Stack order={{base: '1', md:'2'}} spacing="25px">
                    <Image src={img} alt="nftImage" borderRadius="3xl" boxShadow="dark-lg"/>

                    <Box>
                        <Flex justify="space-between" fontSize="17px">
                            <span>Total minted</span>
                            <Text><span style={{color: 'white', fontWeight: 'bold'}}>11%</span> (11/333)</Text>
                        </Flex>
                        <Box mt="5px">
                            <Progress bg="secondary.800" size="md" value={12} colorScheme="pink" borderRadius="full"/>
                        </Box>
                    </Box>

                    <Card bg="secondary.700" color="white">
                        <CardHeader fontSize="18px" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="15px">
                        <Text >
                            Price: <span style={{fontWeight: 'bold'}}>0.002 ETH</span>
                        </Text>
                        <HStack maxW='320px'>
                            <Button {...dec} colorScheme="cyan">-</Button>
                            <Input {...input}/>
                            <Button {...inc} colorScheme="cyan">+</Button>
                        </HStack>
                        </CardHeader>

                        <CardBody>
                            <Button w="100%" colorScheme="pink">Mint {value}</Button>
                        </CardBody>
                    </Card>
                </Stack>
            </Grid>
        </Box>
    );
};

export default Home;