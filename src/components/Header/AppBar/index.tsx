import { PersonOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../../api/userService';
import { APP_NAME } from '../../../constants/app-info';
import UserContext from '../../../context/UserContext';
import logo from '../../../logo.png';
import { primary } from '../../../styles/themeColors';
import SearchBox from '../../SearchBox/SearchBox';
import { useSnackbarContext } from '../../Snackbar/context';
import AccountMenu from '../AccountMenu';
import { StyledAppbar, Title } from '../styles';
import MenuItems from './MenuItems';
import NavigationMenu from './NaviagationMenu';

const AppBar = () => {
  const { isUserLoggedIn, setUser, setToken, setIsUserLoggedIn } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    UserService.logout();

    showToast(true, 'success', 'User logged out successfully!', 'center');
    navigate('/home');
  };

  useEffect(() => {
    const UserData = UserService.getCurrentUser();
    if (UserData != null) {
      setUser(UserData.data);
      setToken(UserData.token);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <StyledAppbar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            sx={{ mr: 1, display: { xs: 'none', md: 'flex', width: '48px' } }}
            width="fit-content"
            component={'img'}
            src={logo}
            alt={APP_NAME}
          />

          <Typography
            variant="h6"
            color={primary[900]}
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            {APP_NAME}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              sx={{ pl: 0 }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                toggleDrawer(true);
              }}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <NavigationMenu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItems handleCloseNavMenu={handleCloseNavMenu} />
          </Box>

          <Grid md={4} lg={5} xs={11}>
            <SearchBox />
          </Grid>

          <Box sx={{ flexGrow: 0 }}>
            <Box alignItems="center" sx={{ display: { xs: 'flex', md: 'flex' } }}>
              {!isUserLoggedIn && (
                <Link to="signin">
                  <Box
                    sx={{ borderRadius: '4px', zIndex: 2000 }}
                    component={IconButton}
                    ml={2}
                    p={1.25}
                    bgcolor="grey.100">
                    <PersonOutline />
                    <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
                      <Title>Login</Title>
                    </Box>
                  </Box>
                </Link>
              )}
              {isUserLoggedIn && <AccountMenu handleLogout={handleLogOut} />}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppbar>
  );
};

export default AppBar;
