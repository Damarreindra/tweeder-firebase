import { Flex, HStack, IconButton, Box, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Sidebar } from "../Sidebar/Sidebar";
import NavbarMobile from "../navbar/NavbarMobile";

const PagesTemplate = ({ children }) => {
  const [collapse, setCollapse] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      w="full"
      h="100vh"
      bg="gray.100"
      p={{base:1, md:10}}
      display={"flex"}
      flexDir={{base:'column', md:'row'}}
      justifyContent={"center"}
    >
      <Flex
       display={{md:'none'}}
      >
        <NavbarMobile/>
      </Flex>
      <IconButton
        aria-label="Open menu"
        icon={<MdMenu />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        position="absolute"
        top={4}
        left={0}
        zIndex="docked"
      />

      {/* Mobile Sidebar */}
      <Flex
        as="aside"
        display={{ base: isOpen ? "flex" : "none", md: "none" }}
        w="full"
        h="full"
        maxW={collapse ? 250 : "none"}
        bg="white"
        alignItems="start"
        p={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
        position="fixed"
        top={0}
        left={0}
        zIndex="docked"
        overflowY="auto"
      >
        <Sidebar collapse={collapse} />
        <IconButton
          aria-label="Close menu"
          icon={<MdMenu />}
          onClick={onClose}
          position="absolute"
          top={4}
          right={4}
        />
      </Flex>

      <Flex
        as="aside"
        display={{ base: 'none', md: 'flex' }}

        w="full"
        h="full"
        maxW={collapse ? 350 : 100}
        bg="white"
        alignItems="start"
        p={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
        position="relative"
      >
        <Sidebar collapse={collapse} />
      </Flex>
      <Box
       as="main"
       w="full"
       h="full"
       bg="white"
       alignItems="center"
       justifyContent="flex-start"
       flexDirection="column"
       position="relative"
       overflowY="auto"
      
       ml={{ base: 0, md: collapse ? 0 : '350px' }}
        maxW={550}
       
        // borderRadius="3xl"
 
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {children}
      </Box>
      <Flex
        as="aside"
        display={{ base: 'none', md: 'flex' }}

        w="full"
        h="full"
        maxW={350}
        bg="white"
        alignItems="start"
        p={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        {/* Additional content for the right sidebar can go here */}
      </Flex>
    </HStack>
  );
};

export default PagesTemplate;
