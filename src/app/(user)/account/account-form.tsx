'use client';

import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import type { User } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

import type { Database } from '~/types/supabase';

interface Props extends User {
  full_name?: string;
  avatar_url?: string;
}

export default function AccountForm({
  id,
  email,
  full_name,
  avatar_url,
}: Props) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState(full_name);

  const updateProfile = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: id as string,
        full_name: fullname,
        updated_at: new Date().toISOString(),
      });
      if (error) throw new Error(error.message);
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      {avatar_url && <Avatar size="xl" src={avatar_url} name={full_name} />}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input id="email" type="text" value={email} disabled />
      </FormControl>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </FormControl>

      <div>
        <Button onClick={updateProfile} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    </Stack>
  );
}
