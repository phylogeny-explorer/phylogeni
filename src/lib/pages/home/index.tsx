'use client';

import { Flex } from '@chakra-ui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import type { Database } from '~/types/supabase';

const Home = () => {
  const supabase = createClientComponentClient<Database>();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        showLinks={false}
        providers={['google']}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </Flex>
  );
};

export default Home;
