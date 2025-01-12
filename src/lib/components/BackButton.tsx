'use client';

import { useRouter } from 'next/navigation';

import type { ButtonProps } from '~/components/ui/button';
import { Button } from '~/components/ui/button';

const BackButton = ({ children, ...props }: Omit<ButtonProps, 'onClick'>) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} {...props}>
      {children}
    </Button>
  );
};

export default BackButton;
