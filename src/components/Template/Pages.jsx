import { Flex, HStack, IconButton, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Sidebar } from "../Sidebar/Sidebar";

const PagesTemplate = ({ children }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <HStack
      w="full"
      h="100vh"
      bg="gray.100"
      p={10}
      pl={60}
      pr={60}
    >
      <Flex
        as="aside"
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
        // borderRadius="3xl"
        overflowY="auto"
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
