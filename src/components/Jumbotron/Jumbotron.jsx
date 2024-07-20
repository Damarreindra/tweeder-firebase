import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import EditPictureModal from '../EditProfile/EditPictureModal';

function Jumbotron({user}) {
  return (
    <>
      <Box>
        <Flex justify="center">
          <Image 
            src="/images/header.jpg" 
           
          />
        </Flex>    
        <Flex pl={[2, 5]} justify="space-between" flexWrap="wrap">
          <Avatar 
            border="solid 2px" 
            mt={[-6, -8, -10, -16]} 
            size="2xl" 
            src={user.user.photoURL}
          />    
         
          <EditPictureModal/>
        </Flex> 
        <Flex p={2} pl={[2, 5]} flexDir="column">
          <Text fontSize={['lg', 'xl']} m={0} fontWeight="bold">{user.name}</Text>
         <Text fontSize={'sm'} color={'gray.500'}>@{user.user.displayName}</Text>
        </Flex>
      </Box>    
    </>
  );
}

export default Jumbotron;
