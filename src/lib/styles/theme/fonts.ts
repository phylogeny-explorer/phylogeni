import { defineTokens } from '@chakra-ui/react';
import { Noto_Sans as FontBody } from 'next/font/google';

export const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
});

export const fonts = defineTokens.fonts({
  heading: {
    value: fontBody.style.fontFamily,
  },
  body: {
    value: fontBody.style.fontFamily,
  },
});
