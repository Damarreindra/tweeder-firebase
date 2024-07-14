import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Avatar,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { formatDistanceStrict } from "date-fns";

function MainCard({ content, author, createdAt }) {

  const result = formatDistanceStrict(new Date(createdAt), new Date(), {
    unit:'hour'
  })
  return (
    <>
      <Card  borderWidth="1px"  borderColor="gray.200">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              
              <Avatar name={author.displayName} src={author.photoUrl} />
              
              <Box>
                <Heading size="sm">{author.displayName}</Heading>
                {/* <Text>Creator, Chakra UI</Text> */}
              </Box>
            </Flex>
            <Text float={'right'} fontSize={'sm'}>{result}</Text>

          </Flex>
        </CardHeader>
        <CardBody mb={'-8'} mt={'-6'}>
          <Text>
          {content}
          </Text>
        </CardBody>
        {/* <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  /> */}

        <Box p={2}>
          <Button variant fontSize="sm" fontWeight={"sm"} leftIcon={<AiOutlineLike />}>
            0
          </Button>
          <Button variant fontSize="sm" fontWeight={"sm"} leftIcon={<AiOutlineComment />}>
            0
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default MainCard;
