import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Button, useToast, Input, Divider, HStack } from '@chakra-ui/react';
import DropDown from './DropDown';

// Sample locations for the "From" and "To" selection
const optionsLocations = [
    { label: 'Block 1', value: 'block_1' },
    { label: 'Block 2', value: 'block_2' },
    { label: 'Bus Ground', value: 'bus_ground' },
    { label: 'Gate 1', value: 'gate_1' },
    { label: 'Gate 2', value: 'gate_2' },
];

const hourlyRate = 30; // ₹30 per hour

const Renting = () => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [hours, setHours] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [isPaymentVisible, setPaymentVisible] = useState(false);
    const toast = useToast();

    // Handle location selection
    const handleFromLocationSelect = (event) => setFromLocation(event.target.value);
    const handleToLocationSelect = (event) => setToLocation(event.target.value);

    // Handle hour change and calculate total
    const handleHoursChange = (event) => {
        const value = event.target.value;
        setHours(value);
        setTotalAmount(value * hourlyRate); // Calculate total amount
    };

    // Handle payment submission
    const handlePayment = () => {
        // Mock payment process
        toast({
            title: "Payment Successful",
            description: `You've rented the umbrella from ${fromLocation} to ${toLocation} for ${hours} hour(s) at ₹${totalAmount}.`,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box className='w-[100vw] p-10' bg="gray.100" minH="80vh" display="flex" justifyContent="center" alignItems="center">
            <HStack>
            <Box
                maxW="100%"
                w="100%"
                py={10}
                px={8}
                bg="white"
                boxShadow="xl"
                rounded="lg"
                textAlign="center"
            >
                <Heading as="h1" size="lg" mb={6} color="teal.600">
                    Rent an Umbrella
                </Heading>

                <VStack spacing={6} align="stretch">
                    {/* Select 'From' Location */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            From Location:
                        </Text>
                        <DropDown placeholder="Select from location" options={optionsLocations} onChange={handleFromLocationSelect} />
                    </Box>

                    <Divider />

                    {/* Select 'To' Location */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            To Location:
                        </Text>
                        <DropDown placeholder="Select to location" options={optionsLocations} onChange={handleToLocationSelect} />
                    </Box>

                    <Divider />

                    {/* Enter Hours */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Number of Hours:
                        </Text>
                        <Input
                            placeholder="Enter number of hours"
                            value={hours}
                            onChange={handleHoursChange}
                            type="number"
                            focusBorderColor="teal.400"
                        />
                    </Box>

                    <Divider />

                    {/* Total Amount */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Total Amount: ₹{totalAmount}
                        </Text>
                    </Box>

                    <Divider />

                    {/* Payment Button */}
                    {fromLocation && toLocation && hours > 0 && (
                        <Button
                            colorScheme="teal"
                            size="lg"
                            w="full"
                            onClick={handlePayment}
                        >
                            Pay ₹{totalAmount} & Rent Umbrella
                        </Button>
                    )}
                </VStack>
            </Box>

            <Box>
                dvd
            </Box>
            </HStack>
        </Box>
    );
};

export default Renting;
