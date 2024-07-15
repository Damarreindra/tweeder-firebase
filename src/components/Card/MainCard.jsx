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
import { Link } from "react-router-dom";

function MainCard({ thread }) {
  const result = formatDistanceStrict(new Date(thread.createdAt), new Date(), {
    unit: "hour",
  });
  return (
    <>
      <Link to={`/status/${thread.uid}`}>
        <Card borderWidth="1px" borderRadius={"unset"} borderColor="gray.200">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={thread.author.displayName} src={thread.author.photoUrl} />

                <Box>
                  <Heading size="sm">{thread.author.displayName}</Heading>
                  {/* <Text>Creator, Chakra UI</Text> */}
                </Box>
              </Flex>
              <Text float={"right"} fontSize={"sm"}>
                {result}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody mb={"-8"} ml={4}  mt={"-12"}>
            <Text ml={12}>{thread.content}</Text>
          </CardBody>
          {/* <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  /> */}

          <Box ml={12} >
            <Button
              variant
              fontSize="sm"
              fontWeight={"sm"}
              leftIcon={<AiOutlineLike />}
              ml={6}
            >
              0
            </Button>
            <Button
              variant
              fontSize="sm"
              fontWeight={"sm"}
              leftIcon={<AiOutlineComment />}
            >
              0
            </Button>
          </Box>
        </Card>
      </Link>
    </>
  );
}

export default MainCard;
