import { EmailIcon } from "@chakra-ui/icons";
import {
  Center,
  HStack,
  Button,
  Image,
  Container,
  Divider,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  FormErrorMessage,
  FormControl,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useSignIn } from "react-supabase";
import { useRecoilValue } from "recoil";

import { userState } from "lib/state";

interface ILoginModal {
  isOpen: boolean;
  onClose(): void;
}

export default function LoginModal({ isOpen, onClose }: ILoginModal) {
  const userInfo = useRecoilValue(userState);
  const [attemptingLoginEmail, setAttemptingLoginEmail] = useState();
  const [errorMessage, setErrorMessage] = useState<string>();

  // Close this window immediately when the user has authenticated!
  useEffect(() => {
    if (userInfo.authenticated) {
      setErrorMessage(undefined);
      setAttemptingLoginEmail(undefined);
      onClose();
    }
  }, [userInfo, onClose]);

  const router = useRouter();
  const signIn = useSignIn()[1];

  const handleDiscordLogin = async () => {
    const { error } = await signIn(
      { provider: "discord" },
      { redirectTo: `https://daoquest-labdao.vercel.app${router.asPath}` }
    );

    // TODO(jqphu): error handling.
    if (error) throw error;
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ reValidateMode: "onSubmit" });

  const onSubmitEmail: SubmitHandler<FieldValues> = async (values) => {
    const { error } = await signIn(
      {
        email: values.email,
      },
      {
        redirectTo: `https://daoquest-labdao.vercel.app/success`,
      }
    );

    if (!error) {
      setAttemptingLoginEmail(values.email);
    } else {
      setErrorMessage(error.message);
    }

    // TODO(jqphu): error handling.
    if (error) throw error;
  };

  const onCloseCallback = () => {
    // Reset the modal state.
    setAttemptingLoginEmail(undefined);
    setErrorMessage(undefined);

    onClose();
  };

  if (attemptingLoginEmail) {
    return (
      <Modal onClose={onCloseCallback} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent pt="3">
          <ModalHeader textAlign="center" m={4}>
            <Center mb={4}>
              <Image src="/email.png" width={128} />
            </Center>
            <Text fontSize="4xl">Confirm your email</Text>
          </ModalHeader>

          <ModalBody textAlign="center">
            We emailed you a magic link to
            <Text m={4} fontWeight="bold">
              {attemptingLoginEmail}
            </Text>
            Click the link to sign in then come back to this tab!
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    );
  }

  // TODO: make this module do things! Also specialze per quest
  return (
    <Modal onClose={onCloseCallback} isOpen={isOpen} isCentered size="3xl">
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent pt="3">
        <ModalHeader textAlign="center" m={4}>
          <Center mb={4}>
            <Image src="/location.png" boxSize={78} />
          </Center>
          <Text fontSize="4xl">Start your journey</Text>
        </ModalHeader>
        <ModalBody textAlign="center" m={4}>
          <Container maxW="xl">
            <Stack spacing="8">
              <Stack spacing="6" align="center">
                <Text fontSize="xl">
                  Sign in to start adventuring or continue your Quest!
                </Text>
              </Stack>
              <Stack spacing="6" align="center">
                <Button
                  minW="sm"
                  bg="#B7FFDC"
                  color="green.700"
                  isDisabled={isSubmitting}
                  onClick={handleDiscordLogin}
                  rightIcon={<Image src="/discord_green.png" height="20px" />}
                  iconSpacing={3}
                >
                  Continue with Discord
                </Button>
                <HStack w="100%">
                  <Divider />
                  <Text fontSize="sm" color="gray.400">
                    OR
                  </Text>
                  <Divider />
                </HStack>
                <Stack spacing="4">
                  <form onSubmit={handleSubmit(onSubmitEmail)}>
                    <FormControl isInvalid={errors.email}>
                      <Input
                        id="email"
                        placeholder="example@email.com"
                        {...register("email", {
                          required: "Please enter your email address",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.email && errors.email.message}
                      </FormErrorMessage>
                    </FormControl>
                    <br />
                    <Button
                      minW="sm"
                      bg="#B7FFDC"
                      color="green.700"
                      type="submit"
                      isLoading={isSubmitting}
                      rightIcon={<EmailIcon boxSize="20px" />}
                      iconSpacing={3}
                    >
                      Continue with email
                    </Button>
                  </form>
                </Stack>
              </Stack>
            </Stack>
          </Container>
          {errorMessage && (
            <>
              <br />
              <Text as="i" size="xs" fontWeight="light" color="red">
                Unexpected error: {errorMessage}
              </Text>
            </>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
