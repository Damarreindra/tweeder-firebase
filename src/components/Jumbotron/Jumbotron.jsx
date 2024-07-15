import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

function Jumbotron() {
  return (
    <>
      <Box>
        <Flex justify="center">
          <Image 
            src="https://github-production-user-asset-6210df.s3.amazonaws.com/80618060/348557615-a1e25797-db15-4d48-9dc2-e0956b3b4c70.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240714%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240714T164146Z&X-Amz-Expires=300&X-Amz-Signature=16a4e2ed55058616ea91d19bdfdee4def570255539e80837283fcb81ba82225a&X-Amz-SignedHeaders=host&actor_id=80618060&key_id=0&repo_id=694494643" 
           
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
