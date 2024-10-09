'use client';

import type { ButtonProps } from '@chakra-ui/react';
import { Input, StackSeparator, VStack } from '@chakra-ui/react';
import { useFormStatus, useFormState } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';

import { signInWithOAuth, signInWithOtp } from './actions';

const FormButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending} {...props} />;
};

const SignInForm = () => {
  const [oauthState, oauthAction] = useFormState(signInWithOAuth, {
    message: '',
  });
  const [otpState, otpAction] = useFormState(signInWithOtp, { message: '' });

  return (
    <VStack gap={4} align="flex-start" separator={<StackSeparator />}>
      <form action={oauthAction}>
        <VStack gap={4} align="flex-start">
          <input type="hidden" name="provider" value="google" />
          <FormButton colorPalette="gray">
            <FcGoogle size={24} /> Sign in with Google
          </FormButton>
          {oauthState.message && <p>{oauthState.message}</p>}
        </VStack>
      </form>
      <form action={otpAction}>
        <VStack gap={4} align="flex-start">
          <Field label="Email address">
            <Input id="email" name="email" type="email" required />
          </Field>

          <FormButton>Sign in with Magic Link</FormButton>
          {otpState.message && <p>{otpState.message}</p>}
        </VStack>
      </form>
    </VStack>
  );
};

export default SignInForm;
