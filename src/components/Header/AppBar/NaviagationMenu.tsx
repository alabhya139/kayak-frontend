import { Home } from '@mui/icons-material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import QuizIcon from '@mui/icons-material/Quiz';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../../constants/app-info';
import logo from '../../../logo.png';
import { grey, primary } from '../../../styles/themeColors';
import { StyledDrawer } from '../styles';

type Props = {
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

const menuList = [
  {
    menuLink: 'home',
    menuText: 'Home',
    icon: Home
  },
  {
    menuLink: '/events/ongoing',
    menuText: 'Discover',
    icon: EmojiObjectsIcon
  },
  {
    menuLink: 'create-event',
    menuText: 'Start an Event',
    icon: CreateNewFolderIcon
  },
  {
    menuLink: 'faqs',
    menuText: "FAQ's",
    icon: QuizIcon
  }
];

interface INavigationMenuProps {
  isDrawerOpen: boolean;
  toggleDrawer: (value: boolean) => void;
}

const NavigationMenu = ({ isDrawerOpen, toggleDrawer }: INavigationMenuProps) => {
  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none', position: 'fixed', bottom: 0 } }}>
      <StyledDrawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}>
        <Box mb={4} display={'flex'} alignItems={'center'}>
          <Grid
            sx={{ mr: 1, width: '48px' }}
            width="fit-content"
            component={'img'}
            src={logo}
            alt={APP_NAME}
          />

          <Typography variant="h6" color={primary[900]} noWrap component="div" sx={{ mr: 2 }}>
            {APP_NAME}
          </Typography>
        </Box>
        {menuList.map((menu) => (
          <Link key={menu.menuLink} to={menu.menuLink}>
            <Box
              onClick={() => {
                toggleDrawer(false);
              }}
              display={'flex'}
              alignItems={'center'}
              sx={{ padding: '16px', ':hover': { background: grey[200] } }}>
              <menu.icon color="primary" sx={{ mr: 1, fontSize: '26px' }} />
              <Typography color="primary" textAlign="left">
                {menu.menuText}
              </Typography>
            </Box>
          </Link>
        ))}
      </StyledDrawer>
    </Box>
  );
};

export default NavigationMenu;
