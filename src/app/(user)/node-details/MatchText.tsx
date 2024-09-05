import { Text } from '@chakra-ui/react';

const MatchText = ({
  match,
  children,
}: {
  match?: string;
  children: string;
}) => {
  const getColor = () => {
    if (match === children) return 'green.500';
    if (match?.toLowerCase() === children.toLowerCase()) return 'yellow.500';
    return 'inherit';
  };
  return (
    <Text as="span" color={getColor()}>
      {children}
    </Text>
  );
};

export default MatchText;
