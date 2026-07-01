import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Box,
  Container,
  Badge,
  Avatar,
  Tooltip,
  Fade,
  Grow
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Workouts', path: '/workouts', icon: <FitnessCenterOutlinedIcon /> },
    { text: 'Calories', path: '/calories', icon: <CalculateIcon /> },
    { text: 'Weight', path: '/weight', icon: <MonitorWeightIcon /> },
    { text: 'Diet Plan', path: '/diet', icon: <RestaurantIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box className={styles.drawerContainer}>
      <Box className={styles.drawerHeader}>
        <Box className={styles.drawerLogoContainer}>
          <FitnessCenterIcon className={styles.drawerLogoIcon} />
          <Typography variant="h6" className={styles.drawerLogoText}>
            GymVerse
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} className={styles.drawerCloseBtn}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box className={styles.drawerDivider} />
      
      <List className={styles.drawerList}>
        {menuItems.map((item, index) => (
          <Grow
            in={mobileOpen}
            style={{ transformOrigin: '0 0 0' }}
            timeout={(index + 1) * 100}
          >
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path}
              onClick={handleNavClick}
              className={`${styles.drawerItem} ${location.pathname === item.path ? styles.activeDrawerItem : ''}`}
              onMouseEnter={() => setHoveredItem(item.text)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ListItemIcon className={styles.drawerItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                className={styles.drawerItemText}
                primaryTypographyProps={{
                  style: { fontWeight: location.pathname === item.path ? 600 : 400 }
                }}
              />
              {location.pathname === item.path && (
                <Box className={styles.drawerActiveIndicator} />
              )}
            </ListItem>
          </Grow>
        ))}
      </List>

      <Box className={styles.drawerFooter}>
        <Box className={styles.drawerThemeToggle} onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          <Typography variant="body2">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
        elevation={scrolled ? 4 : 0}
      >
        <Container maxWidth="xl">
          <Toolbar className={styles.toolbar} disableGutters>
            <Box 
              component={Link} 
              to="/" 
              className={styles.logoContainer}
              onClick={handleNavClick}
            >
              <Badge
                badgeContent="β"
                color="secondary"
                className={styles.logoBadge}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <FitnessCenterIcon className={styles.logoIcon} />
              </Badge>
              <Typography variant="h6" className={styles.logoText}>
                Gym<span className={styles.logoHighlight}>Verse</span>
              </Typography>
            </Box>

            {!isMobile ? (
              <Box className={styles.navLinks}>
                {menuItems.map((item) => (
                  <Tooltip 
                    key={item.text} 
                    title={item.text} 
                    placement="bottom"
                    arrow
                  >
                    <Button
                      component={Link}
                      to={item.path}
                      onClick={handleNavClick}
                      className={`${styles.navButton} ${location.pathname === item.path ? styles.activeNavButton : ''}`}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  </Tooltip>
                ))}
                <Box className={styles.themeToggle} onClick={toggleTheme}>
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </Box>
              </Box>
            ) : (
              <Box className={styles.mobileActions}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={styles.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor={isMobile ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: styles.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <Box 
          className={styles.overlay} 
          onClick={handleDrawerToggle}
        />
      )}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <Box className={styles.navbarSpacer} />
    </>
  );
};

export default Navbar;