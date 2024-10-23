import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Button, useToast, Input, Divider } from '@chakra-ui/react';
import DropDown from './DropDown';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Helmet from 'react-helmet';
import PaymentModal from './PaymentModal'; // Import the PaymentModal

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
    const [paymentAmount, setPaymentAmount] = useState(30);
    const [hours, setHours] = useState('');
    const [isModalOpen, setModalOpen] = useState(false); // State for modal
    const toast = useToast();
    const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY_HERE');

    const handleHoursChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && Number(value) >= 1) {
            const selectedHours = Number(value);
            setHours(selectedHours);
            setPaymentAmount(selectedHours * 3000);
        } else {
            setHours('');
            setPaymentAmount(30);
        }
    };

    const handleLocationSelect = (event) => {
        setSelectedToLocation(event.target.value);
    };

    const handlePayment = async () => {
        if (!selectedToLocation || !hours || Number(hours) < 1) {
            toast({
                title: "Error",
                description: "Please fill out all fields correctly.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        
        const stripe = await stripePromise;

        try {
            const response = await axios.post('http://localhost:5000/api/booking/book', {
                fromLocation: currentLocation,
                toLocation: selectedToLocation,
                hours: hours,
            });

            if (response.data) {
                const { sessionId } = response.data; 
                const { error } = await stripe.redirectToCheckout({ sessionId });

                if (error) {
                    toast({
                        title: "Error",
                        description: "An error occurred during the payment process.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
        } catch (error) {
            console.error("Error during payment:", error);
            toast({
                title: "Error",
                description: "An error occurred while processing your payment.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <Box className='w-[100vw] p-10' bg="gray.100" minH="100vh" display="flex" justifyContent="center" alignItems="center">
            <Helmet>
                <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
            </Helmet>
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

                        <Text fontSize="lg" fontWeight="bold" color="teal.500">
                            Total Amount: ₹{paymentAmount / 100} (30 INR per hour)
                        </Text>

                        <Button
                            colorScheme="teal"
                            size="lg"
                            w="full"
                            onClick={handleOpenModal} // Open modal on button click
                            isDisabled={!selectedToLocation || !hours || Number(hours) < 1} // Validations
                        >
                            Pay & Rent Umbrella
                        </Button>
                    </VStack>
                </VStack>
            </Box>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                handlePayment={handlePayment}
                paymentAmount={paymentAmount}
            />
        </Box>
    );
};

export default Renting;
