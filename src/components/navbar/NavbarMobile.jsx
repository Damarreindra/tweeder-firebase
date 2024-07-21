import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarMobile() {
  const navigate = useNavigate();

  return (
    <>
      <Flex
      as="nav"
      alignItems="center"
      justifyContent={'center'}
      p={2}
      bg="rgba(255, 255, 255, 0.2)" // Semi-transparent background
      backdropFilter="blur(10px)" // Blur effect
      borderRadius="md"
      boxShadow="lg"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
    >
      <Flex gap={5} alignItems="center">
        <Flex flexDir="column" mt={1}>
          <Image
            src="https://user-images.githubusercontent.com/80618060/209421785-aa078881-83eb-41e3-ae28-9b05ee0d5dc0.png"
            w={42}
          />
        </Flex>
      </Flex>
    </Flex>
    </>
  );
}

export default NavbarMobile;
