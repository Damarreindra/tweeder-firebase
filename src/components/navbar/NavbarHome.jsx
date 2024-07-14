import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaIcons } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NavbarHome() {
  return (
    <>
    <Flex as={'nav'} mt={5}>
       
        <Text as={'h3'} style={{marginLeft:'300px'}}>Home</Text>
       
    </Flex>
    </>
  )
}

export default NavbarHome