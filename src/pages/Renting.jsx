import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Button, useToast, Input, Divider } from '@chakra-ui/react';
import DropDown from './DropDown';

const optionsTo = [
    { label: 'Block 1', value: 'block_1' },
    { label: 'Block 2', value: 'block_2' },
    { label: 'Bus Ground', value: 'bus_ground' },
    { label: 'Gate 1', value: 'gate_1' },
    { label: 'Gate 2', value: 'gate_2' },
];

const Renting = () => {
    const [currentLocation] = useState('Block 1');
    const [selectedToLocation, setSelectedToLocation] = useState('');
    const [hours, setHours] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isOtpSent, setOtpSent] = useState(false);
    const toast = useToast();

    const handleHoursChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && Number(value) >= 1) {
            setHours(Number(value));
        } else {
            setHours('');
        }
    };

    const handleLocationSelect = (event) => {
        setSelectedToLocation(event.target.value);
    };

    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
    };

    const handleSendOtp = () => {
        if (!selectedToLocation || !hours || !mobileNumber || Number(hours) < 1) {
            toast({
                title: "Error",
                description: "Please fill out all fields correctly.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const otp = generateOtp();
        setGeneratedOtp(otp);
        setOtpSent(true); // OTP has been "sent"
        toast({
            title: "OTP Sent",
            description: `Your OTP is ${otp}`, // Display OTP here for demo purposes
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleOtpVerification = () => {
        if (otp === generatedOtp) {
            toast({
                title: "Verified",
                description: "OTP verified successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setOtp(''); // Clear OTP input
            setOtpSent(false); // Reset OTP state
        } else {
            toast({
                title: "Error",
                description: "Invalid OTP. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box className='w-[100vw] p-10' bg="gray.100" minH="100vh" display="flex" justifyContent="center" alignItems="center">
            <Box
                maxW="500px"
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
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Current Umbrella Location:
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" color="teal.500">
                            {currentLocation}
                        </Text>
                    </Box>

                    <Divider />

                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Select your drop-off location:
                        </Text>
                        <DropDown placeholder="Select drop-off" options={optionsTo} onChange={handleLocationSelect} />
                    </Box>

                    <Divider />

                    <VStack spacing={4} align="stretch" mt={4}>
                        <Text fontSize="md" color="gray.600">
                            Booking Hours:
                        </Text>
                        <Input
                            placeholder="Enter number of hours"
                            value={hours}
                            onChange={handleHoursChange}
                            type="number"
                            min={1}
                            focusBorderColor="teal.400"
                        />

                        <Text fontSize="md" color="gray.600">
                            Mobile Number:
                        </Text>
                        <Input
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            type="tel"
                            focusBorderColor="teal.400"
                        />

                        <Button
                            colorScheme="teal"
                            size="lg"
                            w="full"
                            onClick={handleSendOtp}
                            isDisabled={!selectedToLocation || !hours || Number(hours) < 1 || !mobileNumber}
                        >
                            Send OTP
                        </Button>

                        {isOtpSent && (
                            <>
                                <Input
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text"
                                    focusBorderColor="teal.400"
                                    mt={4}
                                />
                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    w="full"
                                    onClick={handleOtpVerification}
                                    mt={2}
                                >
                                    Verify OTP
                                </Button>
                            </>
                        )}
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default Renting;
