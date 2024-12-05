import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    Button,
    useToast,
    Input,
    Divider,
} from "@chakra-ui/react";
import DropDown from "./DropDown"; // Ensure DropDown is correctly implemented

const optionsFrom = [
    { label: "Block 1", value: "block_1" },
    { label: "Block 2", value: "block_2" },
    { label: "Bus Ground", value: "bus_ground" },
    { label: "Gate 1", value: "gate_1" },
    { label: "Gate 2", value: "gate_2" },
];

const optionsTo = [
    { label: "Block 1", value: "block_1" },
    { label: "Block 2", value: "block_2" },
    { label: "Bus Ground", value: "bus_ground" },
    { label: "Gate 1", value: "gate_1" },
    { label: "Gate 2", value: "gate_2" },
];

const RENTAL_PRICE_PER_HOUR = 10;

const Renting = () => {
    const [currentLocation] = useState("Block 1");
    const [selectedFromLocation, setSelectedFromLocation] = useState("");
    const [selectedToLocation, setSelectedToLocation] = useState("");
    const [hours, setHours] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isOtpSent, setOtpSent] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentProcessed, setPaymentProcessed] = useState(false);

    const toast = useToast();


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => {
            console.log("Razorpay script loaded successfully.");
        };

        script.onerror = () => {
            console.error("Failed to load Razorpay script.");
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);



    const amount = 500;
    const currency = "INR";
    const receiptId = "qwsaq1";


    useEffect(() => {
        if (hours) {
            setTotalPrice(hours * RENTAL_PRICE_PER_HOUR);
        }
    }, [hours]);

    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) > 0) {
            setHours(Number(value));
        } else {
            setHours("");
            setTotalPrice(0);
        }
    };

    const validateMobileNumber = (number) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(number);
    };

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

    const handleSendOtp = () => {
        if (
            !selectedFromLocation ||
            !selectedToLocation ||
            !hours ||
            !validateMobileNumber(mobileNumber)
        ) {
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
        setOtpSent(true);
        toast({
            title: "OTP Sent",
            description: `Your OTP is ${otp}`, // Only for demo
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleOtpVerification = () => {
        if (otp === generatedOtp) {
            toast({
                title: "Success",
                description: "OTP verified successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setOtp("");
            setOtpSent(false);
            setPaymentProcessed(true);
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

    const handlePayment = async (e) => {
        try {
            // Ensure paymentProcessed flag is checked before proceeding
            if (!paymentProcessed) {
                toast({
                    title: "Error",
                    description: "Please verify OTP before proceeding.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            // Fetch order details from the server
            const response = await fetch("http://localhost:5000/order", {
                method: "POST",
                body: JSON.stringify({
                    amount,  // Replace with your amount variable
                    currency,  // Replace with your currency variable
                    receipt: receiptId,  // Replace with your receiptId variable
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Failed to initiate payment. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            const order = await response.json();
            console.log(order);

            // Configure Razorpay options
            const options = {
                key: "rzp_test_6Q8fYAxMWNjmHG", // Replace with your Razorpay key
                amount, // Amount is in currency subunits
                currency,
                name: "Acme Corp", // Your business name
                description: "Test Transaction",
                image: "/logo.png", // Replace with your logo URL
                order_id: order.id, // Order ID from backend
                handler: async function (response) {
                    try {
                        const body = { ...response };

                        const validateRes = await fetch(
                            "http://localhost:5000/order/validate",
                            {
                                method: "POST",
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        const jsonRes = await validateRes.json();

                        if (validateRes.ok) {
                            toast({
                                title: "Payment Successful",
                                description: "Transaction completed successfully.",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                            console.log("Validation response:", jsonRes);
                        } else {
                            toast({
                                title: "Error",
                                description: "Payment validation failed. Please contact support.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                        }
                    } catch (error) {
                        console.error("Error validating payment:", error);
                        toast({
                            title: "Error",
                            description: "An error occurred during payment validation.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                },
                prefill: {
                    name: "Web Dev Matrix", // Replace with customer's name
                    email: "webdevmatrix@example.com", // Replace with customer's email
                    contact: "9000000000", // Replace with customer's phone number
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc", // Theme color
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                console.error("Payment failed:", response);
                toast({
                    title: "Payment Failed",
                    description: response.error.description || "An unknown error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });

            rzp1.open();
            e.preventDefault();
        } catch (error) {
            console.error("Error initiating payment:", error);
            toast({
                title: "Error",
                description: "An error occurred while initiating payment.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <Box
            className="w-[100vw] p-10"
            bg="gray.100"
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
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
                            Select Pickup Location:
                        </Text>
                        <DropDown
                            placeholder="Pickup Location"
                            options={optionsFrom}
                            onChange={(e) => setSelectedFromLocation(e.target.value)}
                        />
                    </Box>

                    <Divider />

                    <Box textAlign="left">
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Select Drop-off Location:
                        </Text>
                        <DropDown
                            placeholder="Drop-off Location"
                            options={optionsTo}
                            onChange={(e) => setSelectedToLocation(e.target.value)}
                        />
                    </Box>

                    <Divider />

                    <VStack spacing={4} align="stretch" mt={4}>
                        <Input
                            placeholder="Number of hours"
                            value={hours}
                            onChange={handleHoursChange}
                            type="number"
                            min={1}
                            focusBorderColor="teal.400"
                        />
                        {hours && (
                            <Text fontSize="lg" color="teal.500" fontWeight="bold">
                                Total Price: ₹{totalPrice}
                            </Text>
                        )}
                        <Input
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            type="tel"
                            focusBorderColor="teal.400"
                        />
                        <Button colorScheme="teal" size="lg" onClick={handleSendOtp}>
                            Send OTP
                        </Button>

                        {isOtpSent && (
                            <>
                                <Input
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    focusBorderColor="teal.400"
                                />
                                <Button colorScheme="teal" size="lg" onClick={handleOtpVerification}>
                                    Verify OTP
                                </Button>
                            </>
                        )}
                    </VStack>
                </VStack>

                {paymentProcessed && (
                    <Button colorScheme="teal" size="lg" mt={6} onClick={handlePayment}>
                        Proceed to Payment
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Renting;



