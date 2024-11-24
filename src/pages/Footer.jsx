import {
    Box,
    Stack,
    HStack,
    VStack,
    Link,
    Divider,
    Image,
    Text,
    Button,
    IconButton,
  } from '@chakra-ui/react';
  import { FaGithub, FaEnvelope } from 'react-icons/fa';
  import { BsDiscord, BsTelephone } from 'react-icons/bs';
  import { GrContact } from 'react-icons/gr';
  
  const Footer = () => {
    return (
      <Box p={{ base: 5, md: 8 }} maxW="6xl" mx="auto" width="100%">
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Logo Section */}
          <Box maxW="300px" mb={{ base: 4, md: 0 }}>
            <Link href="/">
              <Image w="100px" src="/logo.png" alt="TemplatesKart" rounded="md" />
            </Link>
          </Box>
  
          {/* Footer Links Section */}
          <HStack spacing={{ base: 8, md: 12 }} alignItems="flex-start" wrap="wrap">
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Company
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.600">
                <Link>About Us</Link>
                 
              </VStack>
            </VStack>
  
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Support
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.600">
                <Link>Contact Us</Link>
                <Link>Terms & Conditions</Link>
                <Link>Privacy Policy</Link>
                <Link>FAQ</Link>
              </VStack>
            </VStack>
  
            <VStack spacing={4} alignItems="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Contact
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.600">
                <HStack>
                  <BsTelephone />
                  <Text>Rahul Sohan</Text>
                </HStack>

                <HStack>
                  <BsTelephone />
                  <Text>Shivesh</Text>
                </HStack>

                <HStack>
                  <BsTelephone />
                  <Text>Venkat</Text>
                </HStack>

                <HStack>
                  <BsTelephone />
                  <Text>Manoj Kumar</Text>
                </HStack>

                <HStack>
                  <BsTelephone />
                  <Text>Rohitha </Text>
                </HStack>

                <HStack>
                  <BsTelephone />
                  <Text>Amrutha</Text>
                </HStack>
                 
              </VStack>
            </VStack>
          </HStack>
        </Stack>
  
        {/* Divider */}
        <Divider my={6} />
  
        {/* Footer Bottom Section */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
            &copy; {new Date().getFullYear()} RakhInVarsh. All rights reserved.
          </Text>
  
          <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
            <Button
              leftIcon={<GrContact />}
              as={Link}
              href="/"
              rounded="md"
              bg="purple.500"
              color="white"
              _hover={{ bg: 'purple.600' }}
              isExternal
            >
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };
  
  export default Footer;
  