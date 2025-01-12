'use client';

import { useActionState } from 'react';
// import type { ButtonProps } from '@chakra-ui/react';
import { Input, StackSeparator, VStack } from '@chakra-ui/react';
// import { useFormStatus } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '~/components/ui/button';
import { Field } from '~/components/ui/field';

import { signInWithOAuth, signInWithOtp } from './actions';

// const FormButton = (props: ButtonProps) => {
//   const { pending } = useFormStatus();
//   return <Button type="submit" loading={pending} {...props} />;
// };

const SignInForm = () => {
  const [oauthState, oauthAction, isOauthPending] = useActionState(
    signInWithOAuth,
    { message: '' }
  );
  const [otpState, otpAction, isOtpPending] = useActionState(signInWithOtp, {
    message: '',
  });

  return (
    <VStack gap={4} separator={<StackSeparator />}>
      <form action={oauthAction}>
        <VStack gap={4} w="xs">
          <input type="hidden" name="provider" value="google" />
          <Button
            w="full"
            colorPalette="gray"
            variant="surface"
            type="submit"
            loading={isOauthPending}
          >
            <FcGoogle size={24} /> Sign in with Google
          </Button>
          {oauthState.message && <p>{oauthState.message}</p>}
        </VStack>
      </form>
      <form action={otpAction}>
        <VStack gap={4} w="xs">
          <Field label="Email address">
            <Input id="email" name="email" type="email" required />
          </Field>

          <Button w="full" type="submit" loading={isOtpPending}>
            Sign in with Magic Link
          </Button>
          {otpState.message && <p>{otpState.message}</p>}
        </VStack>
      </form>
    </VStack>
  );
};

export default SignInForm;
