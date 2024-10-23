import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Input,
    VStack,
    FormControl,
    FormLabel,
    Select,
    HStack,
    Image,
    Divider,
} from '@chakra-ui/react';

// UPI logos array
const upiOptions = [
    { name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Google_Pay_logo.png' },
    { name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PhonePe_logo.png' },
    { name: 'Paytm', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Paytm_logo.svg' },
];

const PaymentModal = ({ isOpen, onClose, handlePayment, paymentAmount }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiMethod, setUpiMethod] = useState('');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        You are about to pay: <strong>₹{paymentAmount / 100}</strong> for renting the umbrella.
                    </Text>
                    <VStack spacing={4} mt={4}>
                        <FormControl>
                            <FormLabel>Customer Name</FormLabel>
                            <Input
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Card Number</FormLabel>
                            <Input
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Enter your card number"
                                type="text"
                            />
                        </FormControl>
                        <HStack>
                            <FormControl>
                                <FormLabel>Expiry Date</FormLabel>
                                <Input
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    placeholder="MM/YY"
                                    type="text"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>CVV</FormLabel>
                                <Input
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="CVV"
                                    type="text"
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Choose UPI Method</FormLabel>
                            <Select onChange={(e) => setUpiMethod(e.target.value)} placeholder="Select UPI method">
                                {upiOptions.map((option) => (
                                    <option key={option.name} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <HStack>
                            <div className='w-[30px] h-[2px] bg-gray-200' />
                            <Text>OR</Text>
                            <div className='w-[30px] h-[2px] bg-gray-200' />

                        </HStack>

                        {upiMethod && (
                            <HStack spacing={4} mt={4}  >
                                <Text>Selected UPI: {upiMethod}</Text>
                                {upiOptions
                                    .filter((option) => option.name === upiMethod)
                                    .map((option) => (
                                        <Image key={option.name} src={option.logo} alt={option.name} boxSize="40px" />
                                    ))}
                            </HStack>
                        )}
                    </VStack>
                </ModalBody>


                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handlePayment}>
                        Confirm Payment
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PaymentModal;
