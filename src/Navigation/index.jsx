import React from 'react';
import { List, ListItem } from "@chakra-ui/react";
import {
  MdHome,
  MdPerson,
  MdOutlineSettingsInputComposite,
} from "react-icons/md";
import { NavItem } from "./NavItem";

const items = [
  {
    type: "link",
    label: "Home",
    icon: MdHome,
    path: "/",
  },
  {
    type: "link",
    label: "Profile",
    icon: MdPerson,
    path: "/profile",
  },
  {
    type: "link",
    label: "Settings",
    icon: MdOutlineSettingsInputComposite,
    path: "/",
  },
];

const Navigation = ({ collapse }) => (
  <List w="full" my={8} mt={5}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={index === 0} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);

export default Navigation;
