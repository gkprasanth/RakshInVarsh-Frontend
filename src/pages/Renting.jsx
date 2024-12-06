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
    Select,
} from "@chakra-ui/react";

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

const RENTAL_PRICE_PER_HOUR = 100;

const Renting = () => {
    const [currentLocation] = useState("Block 1");
    const [selectedFromLocation, setSelectedFromLocation] = useState(optionsFrom[0].value); // Default to first option
    const [selectedToLocation, setSelectedToLocation] = useState(optionsTo[0].value); // Default to first option
    const [hours, setHours] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isOtpSent, setOtpSent] = useState(false);
    const [amount, setAmount] = useState(0);
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

    const currency = "INR";
    const receiptId = "qwsaq1";

    useEffect(() => {
        if (hours) {
            setAmount(hours * RENTAL_PRICE_PER_HOUR);
        }
    }, [hours]);

    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) > 0) {
            setHours(Number(value));
        } else {
            setHours("");
            setAmount(0);
        }
    };

    const validateMobileNumber = (number) => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(number);
    };

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

    const handlePayment = async (e) => {
        try {
            console.log("Selected From Location:", selectedFromLocation);
            console.log("Selected To Location:", selectedToLocation);
            console.log("Hours:", hours);
            console.log("Mobile Number:", mobileNumber);
    
            if (!selectedFromLocation || !selectedToLocation || !hours || !validateMobileNumber(mobileNumber)) {
                toast({
                    title: "Error",
                    description: "Please fill out all fields correctly.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
    
            // Fetch order details from the server
            const response = await fetch("https://rakshinvarsh-backend.onrender.com/order", {
                method: "POST",
                body: JSON.stringify({
                    amount: amount * 100,  // Replace with your amount variable
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



            const sendOtp = async () => {
                if (!validateMobileNumber(mobileNumber)) {
                  toast({
                    title: "Error",
                    description: "Please enter a valid mobile number.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  return;
                }
            
                try {
                  // Send OTP request to backend
                  const response = await fetch('https://rakshinvarsh-backend.onrender.com/api/sendOtp', { 
                    method: 'POST', 
                    body: JSON.stringify({ mobileNumber }),
                    headers: { 'Content-Type': 'application/json' }
                  });
            
                  if (!response.ok) {
                    toast({
                      title: "Error",
                      description: "Failed to send OTP. Please try again.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    return;
                  }
            
                  const data = await response.json();
                  setGeneratedOtp(data.otp); // Assume your backend sends back the OTP
                  setOtpSent(true); // Show OTP verification input
                  toast({
                    title: "Success",
                    description: "OTP sent successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
            
                } catch (error) {
                  console.error("Error sending OTP:", error);
                  toast({
                    title: "Error",
                    description: "An error occurred while sending OTP.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              };
            
    
            // Razorpay payment processing...
            const options = {
                key: "rzp_test_6Q8fYAxMWNjmHG", // Replace with your Razorpay key
                amount: amount * 100, // Convert amount to paise (1 INR = 100 paise)
                currency,
                name: "RakshInVarsh", // Your business name
                description: "Test Transaction",
                image: "/logo.png", // Replace with your logo URL
                order_id: order.id, // Order ID from backend
                handler: async function (response) {
                    // Handle payment success
                    console.log("Payment Successful:", response);
                    sendOtp()
                    // Show success toast
                    toast({
                        title: "Success",
                        description: "Your payment was successful!, Your OTP",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    setPaymentProcessed(true);
                },
                prefill: {
                    name: "Rahul Sohan", // Replace with customer's name
                    email: "nonygundi33@gmail.com", // Replace with customer's email
                    contact: mobileNumber, // Use the entered mobile number
                },
                notes: {
                    address: "RakshInVarsh",
                },
                theme: {
                    color: "#3399cc", // Theme color
                },
            };
    
            const rzp1 = new window.Razorpay(options);
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
                        <Text fontSize="xl" fontWeight="bold" color="gray.800">
                            {currentLocation}
                        </Text>
                    </Box>

                    <DropDown
                        label="From Location"
                        options={optionsFrom}
                        onSelect={setSelectedFromLocation}
                    />
                    <DropDown
                        label="To Location"
                        options={optionsTo}
                        onSelect={setSelectedToLocation}
                    />

                    <Box>
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Duration (Hours):
                        </Text>
                        <Input
                            type="number"
                            value={hours}
                            onChange={handleHoursChange}
                            placeholder="Enter hours"
                            min={1}
                        />
                    </Box>

                    <Box>
                        <Text fontSize="md" color="gray.600" mb={2}>
                            Mobile Number:
                        </Text>
                        <Input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter mobile number"
                        />
                    </Box>

                    {isOtpSent && (
                        <>
                            <Box>
                                <Text fontSize="md" color="gray.600" mb={2}>
                                    Enter OTP:
                                </Text>
                                <Input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                />
                            </Box>
                            <Button colorScheme="teal" onClick={handleOtpVerification}>
                                Verify OTP
                            </Button>
                        </>
                    )}

                    {!isOtpSent && (
                        <Button colorScheme="teal" onClick={handlePayment}>
                            Confirm and Pay {amount > 0 ? `₹${amount}` : ""}
                        </Button>
                    )}
                </VStack>
            </Box>
        </Box>
    );
};

const DropDown = ({ label, options, onSelect }) => (
    <Box>
        <Text fontSize="md" color="gray.600" mb={2}>
            {label}:
        </Text>
        <Select onChange={(e) => onSelect(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    </Box>
);

export default Renting;
