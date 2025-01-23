import { HStack, Link } from '@chakra-ui/react';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <HStack
      asChild
      py="1.5"
      ps="4"
      pe="3"
      rounded="sm"
      color="fg.muted"
      border="1px solid"
      borderColor="border"
      colorPalette="gray"
      _hover={{
        layerStyle: 'fill.subtle',
        textDecoration: 'none',
      }}
    >
      <Link href={href}>{children}</Link>
    </HStack>
  );
}
