import PEPLogo from './PEPLogo';
import PEPLogoFull from './PEPLogoFull';

export interface LogoProps {
  size?: number;
  full?: boolean;
  onClick?: () => void;
}

const Logo = ({ size = 10, full = false, onClick }: LogoProps) => {
  if (!full) {
    return <PEPLogo onClick={onClick} boxSize={size} />;
  }

  return (
    <>
      <PEPLogoFull onClick={onClick} h={size + 2} hideBelow="md" />
      <PEPLogo onClick={onClick} boxSize={size} hideFrom="md" />
    </>
  );
};

export default Logo;
