import { Icon, IconButton } from '@chakra-ui/react';
import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
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
  size = 6,
  onClick,
  ...props
}: SocialIconProps) => {
  const icons = {
    [Social.FACEBOOK]: RiFacebookCircleFill,
    [Social.GITHUB]: RiGithubFill,
    [Social.INSTAGRAM]: RiInstagramLine,
    [Social.LINKEDIN]: RiLinkedinBoxFill,
    [Social.TWITTER]: RiTwitterFill,
    [Social.YOUTUBE]: RiYoutubeFill,
  };

  if (onClick)
    return (
      <IconButton
        aria-label={`${platform}-link`}
        variant="ghost"
        colorScheme="gray"
        icon={
          <Icon width={size} height={size} {...props} as={icons[platform]} />
        }
      />
    );

  return <Icon width={size} height={size} {...props} as={icons[platform]} />;
};

export default SocialIcon;
