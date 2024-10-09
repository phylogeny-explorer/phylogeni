import { Avatar } from '~/components/ui/avatar';
import {
  MenuContent,
  MenuItemGroup,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from '~/components/ui/menu';

export interface UserMenuProps {
  email: string;
  full_name?: string;
  avatar_url?: string;
}

const UserMenu = ({ email, full_name, avatar_url }: UserMenuProps) => (
  <MenuRoot>
    <MenuTrigger>
      <Avatar size="sm" src={avatar_url} name={full_name} />
    </MenuTrigger>
    <MenuContent>
      <MenuItemGroup title={full_name || email}>
        <MenuItem as="a" href="/account">
          Account
        </MenuItem>
        <MenuItem as="a" href="/settings">
          Settings
        </MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <form action="/auth/signout" method="post">
        <MenuItem type="submit">Sign out</MenuItem>
      </form>
    </MenuContent>
  </MenuRoot>
);

export default UserMenu;
