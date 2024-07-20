import { Flex, HStack, IconButton, Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { Sidebar } from "../Sidebar/Sidebar";

const PagesTemplate = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collapse, setCollapse] = React.useState(true);

  return (
    <Flex
      w="full"
      h="100vh"
      bg="gray.100"
      p={10}
      flexDirection={{ base: 'column', md: 'row' }}
      position="relative"
    >
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open menu"
        icon={<MdMenu />}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        position="absolute"
        top={4}
        left={4}
        zIndex="docked"
      />

      {/* Mobile Sidebar */}
      <Flex
        as="aside"
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        w="full"
        h="full"
        maxW={collapse ? 250 : 'none'} // Adjust width for mobile
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

      {/* Desktop Sidebar */}
      <Flex
        as="aside"
        display={{ base: 'none', md: 'flex' }}
        w={collapse ? 350 : 'auto'}
        h="full"
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
        maxW={{ base: 'full', md: '550px' }}
        overflowY="auto"
        p={{ base: 4, md: 6 }}
        ml={{ base: 0, md: collapse ? 0 : 'auto' }}
        mr={{ base: 0, md: 4 }}
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

      {/* Right Sidebar */}
      <Flex
        as="aside"
        display={{ base: 'none', md: 'flex' }}
        w={{ base: 'full', md: 350 }}
        h="full"
        bg="white"
        alignItems="start"
        p={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
        ml="auto"
      >
        {/* Additional content for the right sidebar can go here */}
      </Flex>
    </Flex>
  );
};

export default PagesTemplate;
