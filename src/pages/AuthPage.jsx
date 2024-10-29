// src/pages/AuthPage.js
import { useState } from 'react';
import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    useToast,
} from "@chakra-ui/react";

const AuthPage = ({ isLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {

        const url = isLogin ? "/api/auth/login" : "/api/auth/register";
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (result.token) {

            localStorage.setItem("token", result.token);
            toast({
                title: isLogin ? "Logged in successfully!" : "Account created!",
                status: "success",
                duration: 3000,
            });
        } else {
            toast({
                title: result.message || "An error occurred",
                status: "error",
                duration: 3000,
            });
        }
    };

    return (
        <Box
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url('/path/to/rain-umbrella-bg.jpg')",
            }}
        >
            <Box
                className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <VStack spacing={4} align="stretch">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                        {isLogin ? "Login to Raksh in Varsh" : "Sign Up for Raksh in Varsh"}
                    </Text>
                    
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            focusBorderColor="teal.500"
                        />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            focusBorderColor="teal.500"
                        />
                    </FormControl>

                    <Button
                        colorScheme="teal"
                        onClick={handleSubmit}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default AuthPage;
