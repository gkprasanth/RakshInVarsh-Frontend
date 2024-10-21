import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Stack,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#about' },
  { name: 'Contact', path: '/contact' },
];

const dropdownLinks = [
  { name: 'Blog', path: '#' },
  { name: 'Documentation', path: '#' },
  { name: 'Github Repo', path: '#' },
];

export default function Navbar() {
  return (
    <Box px={4} py={6} bg={useColorModeValue('#3584e4', 'gray.800')} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent={{ base: 'center', md: 'space-between' }}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          RakshInVarsh
        </Text>

        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} />
            ))}
          </HStack>

          <Button
            colorScheme="blue"
            size="md"
            display={{ base: 'none', md: 'block' }}
            onClick={() => alert('Rent Button Clicked')}
          >
            Rent
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

// NavLink Component
const NavLink = ({ name, path }) => (
  <Link href={path} _hover={{ textDecoration: 'underline', color: 'blue.200' }}>
    <Text color="white" fontSize="lg">{name}</Text>
  </Link>
);
