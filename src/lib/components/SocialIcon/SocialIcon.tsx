import { Icon, IconButton } from '@chakra-ui/react';
import {
  RiFacebookBoxFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
  RiYoutubeFill,
} from 'react-icons/ri';

export enum Social {
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
}

export interface SocialIconProps {
  platform: Social;
  size?: number;
  onClick?: () => void;
}

const SocialIcon = ({
  platform,
  size = 8,
  onClick,
  ...props
}: SocialIconProps) => {
  const icons = {
    [Social.FACEBOOK]: RiFacebookBoxFill,
    [Social.GITHUB]: RiGithubFill,
    [Social.INSTAGRAM]: RiInstagramFill,
    [Social.LINKEDIN]: RiLinkedinFill,
    [Social.TWITTER]: RiTwitterFill,
    [Social.YOUTUBE]: RiYoutubeFill,
  };

  if (onClick)
    return (
      <IconButton
        aria-label={`${platform}-link`}
        variant="ghost"
        icon={
          <Icon width={size} height={size} {...props} as={icons[platform]} />
        }
      />
    );

  return <Icon width={size} height={size} {...props} as={icons[platform]} />;
};

export default SocialIcon;
