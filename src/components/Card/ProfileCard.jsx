import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
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
import { useDispatch } from "react-redux";
import {
  getThread,
  getThreads,
  likeThread,
  unLikeThread,
} from "../../actions/threadsAction";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import moment from "moment";

function ProfileCard({ thread, user }) {
  const result = moment(thread.createdAt).startOf("hour").fromNow();

  const userId = localStorage.getItem("uid");
  const dispatch = useDispatch();

  const isLiked = thread.likedBy.includes(userId);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unLikeThread(thread.id, userId);
      } else {
        await likeThread(thread.id, userId);
      }
      dispatch(getThread());
    } catch (error) {
      console.error("Error liking/unliking thread: ", error);
    }
  };

  return (
    <>
      <Card borderWidth="1px" borderRadius={"unset"} borderColor="gray.200">
        <Link style={{ color: "black" }} to={`/status/${thread.uid}`}>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={thread.author.displayName}
                  src={thread.author.photoUrl}
                />
                <Box display={'flex'} gap={2}>
                  <Text m={0} fontSize={'md'} fontWeight={"bold"}>
                    {user.name}
                  </Text>
                 
                  <Text fontSize={'sm'} color={'gray.500'}>@{user.user.displayName}</Text>
             
                </Box>
              </Flex>
              <Text float={"right"} fontSize={"sm"}>
                {result}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody mb={"-8"} ml={4} mt={"-12"}>
            <Text ml={12}>{thread.content}</Text>
          </CardBody>
        </Link>
        <Box ml={12}>
          {isLiked ? (
            <Button
              variant=""
              fontSize="sm"
              fontWeight={"sm"}
              leftIcon={<FcLike />}
              ml={6}
              onClick={handleLike}
            >
              {thread.likes}
            </Button>
          ) : (
            <Button
              variant=""
              fontSize="sm"
              fontWeight={"sm"}
              leftIcon={<FcLikePlaceholder />}
              ml={6}
              onClick={handleLike}
            >
              {thread.likes}
            </Button>
          )}
          <Button
            variant=""
            fontSize="sm"
            fontWeight={"sm"}
            leftIcon={<AiOutlineComment />}
          >
            0
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default ProfileCard;
