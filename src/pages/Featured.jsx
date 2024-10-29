import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    SimpleGrid,
    Box,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  import card1 from '../assets/card1.avif';
  import card2 from '../assets/card2.avif';
  import card3 from '../assets/card3.avif';
  
  // Array of card data
  const cardData = [
    {
      heading: 'Stay Dry, Stay Focused',
      description:
        "Never let unexpected rain disrupt your day. Rent an umbrella on the go from any of our conveniently placed kiosks across campus and stay comfortable, whether you're heading to class or the cafeteria.",
      image: card1,
    },
    {
      heading: 'Affordable and Flexible Rentals',
      description:
        'We know student budgets are tight! Our umbrella rentals start as low as 30 rupees per hour. Enjoy the flexibility of returning your umbrella at any kiosk on campus—no extra hassle.',
      image: card2,
    },
    {
      heading: 'Eco-Friendly & Convenient Solution',
      description:
        'Support sustainability by renting instead of buying! Our program helps reduce waste by offering high-quality, reusable umbrellas. Simply grab one when you need it and return it to the nearest kiosk.',
      image: card3,
    },
  ];
  
  const FeatureHighlights = () => {
    const bgColor = useColorModeValue('white', 'gray.800'); // Adjust background based on theme
  
    return (
      <Box className='cursor-pointer' id='about' bg="gray.50" py={{ base: 8, md: 12 }}>
        <Text
          className="text-purple-700"
          fontWeight="bold"
          textAlign="center"
          mb={5}
          fontSize={{ base: '3xl', md: '5xl' }} // Responsive font size
        >
          WHY CHOOSE US
        </Text>
        <Box maxW="6xl" mx="auto" px={{ base: 4, md: 6 }}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {cardData.map((card, index) => (
              <Card
                key={index}
                bg={bgColor}
                maxW="full"
                boxShadow="lg"
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.05)' }} // Subtle hover effect
                role="group" // Accessibility: Indicates an interactive element
              >
                <CardBody p={6}>
                  <Image
                    src={card.image}
                    alt={card.heading}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    maxH="200px"
                    w="full"
                    loading="lazy" // Lazy loading for performance
                  />
                  <Stack spacing={4}>
                    <Heading
                      size="lg"
                      fontWeight="bold"
                      color="gray.700"
                      textAlign="center"
                      _groupHover={{ color: 'purple.600' }} // Change color on hover
                    >
                      {card.heading}
                    </Heading>
                    <Text
                      fontSize="md"
                      textAlign="justify"
                      color="gray.600"
                    >
                      {card.description}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    );
  };
  
  export default FeatureHighlights;
  