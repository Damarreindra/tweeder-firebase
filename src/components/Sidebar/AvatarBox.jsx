import React from "react";
import { Avatar, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useState } from "react";
import app from "../../firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
} from "@chakra-ui/react";
import Logout from "../Logout/Logout";

function AvatarBox({ collapse }) {
  const auth = getAuth(app);

  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Flex
      borderWidth={collapse ? 1 : 0}
      borderColor="gray.100"
      borderRadius="full"
      w="full"
      p={2}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection={collapse ? "row" : "column-reverse"}
    >
      {user ? <Avatar src={user.photoURL} bg="teal.300" /> : ""}

      {collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
            {user.displayName}
          </Text>
          <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
            {user.email}
          </Text>
        </Flex>
      )}
      <Menu>
        <MenuButton borderRadius="full" color="gray.400" variant="ghost">
          {" "}
          <IconButton borderRadius="full" icon={<MdOutlineMoreHoriz />} />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem><Logout/></MenuItem>
            
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  );
}

export { AvatarBox };
