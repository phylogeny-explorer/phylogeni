import { useMediaQuery } from '@chakra-ui/react';

import PEPLogo from './PEPLogo';
import PEPLogoFull from './PEPLogoFull';

export interface LogoProps {
  size?: number;
  full?: boolean;
  onClick?: () => void;
}

const Logo = ({ size = 10, full = false, onClick }: LogoProps) => {
  const [isLargeScreen] = useMediaQuery('(min-width: 600px)', {
    ssr: true,
    fallback: false,
  });
  const showFullLogo = full && isLargeScreen;

  return showFullLogo ? (
    <PEPLogoFull onClick={onClick} h={size} />
  ) : (
    <PEPLogo onClick={onClick} boxSize={size} />
  );
};

export default Logo;
