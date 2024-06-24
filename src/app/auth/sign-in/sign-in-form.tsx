'use client';

import type { ButtonProps } from '@chakra-ui/react';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useFormStatus, useFormState } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';

import { signInWithOAuth, signInWithOtp } from './actions';

const FormButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button type="submit" isLoading={pending} {...props} />;
};

const SignInForm = () => {
  const [oauthState, oauthAction] = useFormState(signInWithOAuth, {
    message: '',
  });
  const [otpState, otpAction] = useFormState(signInWithOtp, { message: '' });

  return (
    <VStack spacing={4} align="flex-start">
      <form action={oauthAction}>
        <VStack spacing={4} align="flex-start">
          <input type="hidden" name="provider" value="google" />
          <FormButton colorScheme="gray" leftIcon={<FcGoogle size={24} />}>
            Sign in with Google
          </FormButton>
          {oauthState.message && <p>{oauthState.message}</p>}
        </VStack>
      </form>
      <Divider />
      <form action={otpAction}>
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input id="email" name="email" type="email" required />
          </FormControl>

          <FormButton>Sign in with Magic Link</FormButton>
          {otpState.message && <p>{otpState.message}</p>}
        </VStack>
      </form>
    </VStack>
  );
};

export default SignInForm;
