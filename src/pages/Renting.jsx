import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Button, useToast, Input, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import DropDown from './DropDown';
import GooglePayButton from '@google-pay/button-react';

const optionsFrom = [
    { label: 'Block 1', value: 'block_1' },
    { label: 'Block 2', value: 'block_2' },
    { label: 'Bus Ground', value: 'bus_ground' },
    { label: 'Gate 1', value: 'gate_1' },
    { label: 'Gate 2', value: 'gate_2' },
];

const optionsTo = [
    { label: 'Block 1', value: 'block_1' },
    { label: 'Block 2', value: 'block_2' },
    { label: 'Bus Ground', value: 'bus_ground' },
    { label: 'Gate 1', value: 'gate_1' },
    { label: 'Gate 2', value: 'gate_2' },
];

const RENTAL_PRICE_PER_HOUR = 10; // Example price per hour, you can modify this value

const Renting = () => {
    const [currentLocation] = useState('Block 1');
    const [selectedFromLocation, setSelectedFromLocation] = useState('');  // Pickup location
    const [selectedToLocation, setSelectedToLocation] = useState('');
    const [hours, setHours] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isOtpSent, setOtpSent] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // State for the total price
    const [paymentProcessed, setPaymentProcessed] = useState(false); // To track if payment has been processed
    const [showModal, setShowModal] = useState(false); // To control the modal visibility
    const [bankDetails, setBankDetails] = useState({
        accountNumber: '',
        ifscCode: '',
        bankName: ''
    });
    const toast = useToast();

    const handleHoursChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && Number(value) >= 1) {
            setHours(Number(value));
            setTotalPrice(Number(value) * RENTAL_PRICE_PER_HOUR); // Calculate the total price based on hours
        } else {
            setHours('');
            setTotalPrice(0); // Reset the total price if input is invalid
        }
    };

    const handleLocationSelect = (event, locationType) => {
        if (locationType === 'from') {
            setSelectedFromLocation(event.target.value);
        } else {
            setSelectedToLocation(event.target.value);
        }
    };

    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
    };

    const handleSendOtp = () => {
        if (!selectedFromLocation || !selectedToLocation || !hours || !mobileNumber || Number(hours) < 1) {
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
            setShowModal(true); // Show bank details modal
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

    // Simulate a fake payment gateway
    const handleFakePayment = () => {
        if (!hours || !mobileNumber || !selectedFromLocation || !selectedToLocation || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.bankName) {
            toast({
                title: "Error",
                description: "Please complete all required fields before proceeding to payment.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // Simulate payment processing delay
        setTimeout(() => {
            const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit random confirmation code
            toast({
                title: "Payment Successful",
                description: `Your transaction ID is ${confirmationCode}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setPaymentProcessed(true); // Mark payment as processed
            setShowModal(false); // Close the modal after payment
        }, 2000); // Simulate 2-second delay for payment processing
    };

    const handleInputChange = (e, field) => {
        setBankDetails((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));
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

                    {/* Pickup Location Dropdown */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Select your pickup location:
                        </Text>
                        <DropDown placeholder="Select pickup location" options={optionsFrom} onChange={(e) => handleLocationSelect(e, 'from')} />
                    </Box>

                    <Divider />

                    {/* Drop-off Location Dropdown */}
                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Select your drop-off location:
                        </Text>
                        <DropDown placeholder="Select drop-off" options={optionsTo} onChange={(e) => handleLocationSelect(e, 'to')} />
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

                        {/* Display Total Price */}
                        {hours && (
                            <Text fontSize="lg" color="teal.500" fontWeight="bold">
                                Total Price: ₹{totalPrice}
                            </Text>
                        )}

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
                            isDisabled={!selectedFromLocation || !selectedToLocation || !hours || Number(hours) < 1 || !mobileNumber}
                        >
                            Send OTP
                        </Button>

                        {isOtpSent && (
                            <>
                                <Text fontSize="md" color="gray.600" mt={4}>
                                    Enter OTP:
                                </Text>
                                <Input
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    focusBorderColor="teal.400"
                                />
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    w="full"
                                    mt={4}
                                    onClick={handleOtpVerification}
                                >
                                    Verify OTP
                                </Button>
                            </>
                        )}
                    </VStack>
                </VStack>
            </Box>

            {/* Bank Details Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Your Bank Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Input
                                placeholder="Account Number"
                                value={bankDetails.accountNumber}
                                onChange={(e) => handleInputChange(e, 'accountNumber')}
                            />
                            <Input
                                placeholder="IFSC Code"
                                value={bankDetails.ifscCode}
                                onChange={(e) => handleInputChange(e, 'ifscCode')}
                            />
                            <Input
                                placeholder="Bank Name"
                                value={bankDetails.bankName}
                                onChange={(e) => handleInputChange(e, 'bankName')}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        {/* <Button
                            colorScheme="teal"
                            ml={3}
                            onClick={handleFakePayment}
                            isLoading={paymentProcessed}
                            isDisabled={paymentProcessed}
                        >
                            Confirm Payment
                        </Button> */}

                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'example',
                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                        },
                                    },
                                ],
                                merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: `${totalPrice}`,
                                    currencyCode: 'INR',
                                    countryCode: 'IN',
                                },
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Renting;
