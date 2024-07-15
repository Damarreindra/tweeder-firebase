import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

function Jumbotron() {
  return (
    <>
      <Box>
        <Flex justify="center">
          <Image 
            src="https://github.com/user-attachments/assets/bb0a7e02-17b8-4ed2-96f2-dd69622a63b6" 
           
          />
        </Flex>    
        <Flex pl={[2, 5]} justify="space-between" flexWrap="wrap">
          <Avatar 
            border="solid 2px" 
            mt={[-6, -8, -10, -12]} 
            size="2xl" 
            src="https://github.com/user-attachments/assets/35ec50e8-7d0b-4385-95ed-24d2bb309a2c" 
          />    
          <Button 
            mt={[2, 4]} 
            variant="outline" 
            color="wheat" 
            borderRadius="3xl" 
            background="black"
          >
            Edit Profile
          </Button>
        </Flex> 
        <Flex pl={[2, 5]} flexDir="column">
          <Text fontSize={['lg', 'xl']} m={0} fontWeight="bold">orang amerisya</Text>
          <Text fontSize={['sm', 'md']}>@damareindra</Text>
        </Flex>
      </Box>    
    </>
  );
}

export default Jumbotron;
