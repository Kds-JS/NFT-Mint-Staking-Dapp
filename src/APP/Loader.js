import { Flex } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
    return (
        <Flex h="100vh" align="center" justify="center">
            <div className='meetup'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Flex>
    );
};

export default Loader;