import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

export interface UserMenuProps {
  email: string;
  full_name?: string;
  avatar_url?: string;
}

const UserMenu = ({ email, full_name, avatar_url }: UserMenuProps) => (
  <Menu>
    <MenuButton>
      <Avatar size="sm" src={avatar_url} name={full_name} />
    </MenuButton>
    <MenuList>
      <MenuGroup title={full_name || email}>
        <MenuItem as="a" href="/account">
          Account
        </MenuItem>
        <MenuItem as="a" href="/settings">
          Settings
        </MenuItem>
      </MenuGroup>
      <MenuDivider />
      <form action="/auth/signout" method="post">
        <MenuItem type="submit">Sign out</MenuItem>
      </form>
    </MenuList>
  </Menu>
);

export default UserMenu;
