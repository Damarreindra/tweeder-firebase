
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { login } from "../actions/loginAction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(login(email, password));

      if (res) {
        navigate("/home");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("Email / Password False");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container mt={5} maxW="md">
        <Flex flex="1" justifyContent="center" alignItems="center" bg="white">
          <Container textAlign="center">
            <Stack spacing={6}>
              <Box>
                <Image
                  src="https://user-images.githubusercontent.com/80618060/209421785-aa078881-83eb-41e3-ae28-9b05ee0d5dc0.png"
                  style={{ width: "40px" }}
                  mx={"auto"}
                  srcset=""
                />
              </Box>
              <Heading as="h1" size="xl" fontWeight="bold">
                Login
              </Heading>

              <Button
                href="#"
                colorScheme="gray"
                variant="outline"
                leftIcon={
                  <Image
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    boxSize="20px"
                  />
                }
              >
                Sign up with Google
              </Button>
              <Heading as="h1" size="md" fontWeight="bold">
                Or
              </Heading>
              {loginError && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  {loginError}
                </Alert>
              )}
              <form onSubmit={handleSubmit} id="form">
                <VStack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="whatsapp" width="full">
                    Login
                  </Button>
                </VStack>
              </form>
            </Stack>
          </Container>
        </Flex>
      </Container>
    </motion.div>
  );
}

export default Login;
