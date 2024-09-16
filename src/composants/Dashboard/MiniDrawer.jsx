import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeveloperBoard from '@mui/icons-material/DeveloperBoard';
import { Assignment, AssignmentInd, AutoStories, FormatListBulleted, GroupAdd, HowToReg } from '@mui/icons-material';
import AccountBox from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import HeaderUi from './Header';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow : 1 }} >
            <Typography variant="h6" noWrap component="div">
                Section Administrateur 
            </Typography>
          </Box>
            <HeaderUi />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <List> 
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/dashboard-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <DeveloperBoard />
                    </ListItemIcon>
                    <ListItemText primary="Dasboard" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* -------------------- ADMINISTRATION --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/administration-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <HowToReg />
                    </ListItemIcon>
                    <ListItemText primary="Adminnistration" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* --------------------  REPERTOIRE TEMPORAIRE --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/repertoire-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText primary="Repertoires" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* --------------------  FORMULAIRE DE SAISIE --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/formulaireajout-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <GroupAdd />
                    </ListItemIcon>
                    <ListItemText primary="Formulaire de saisie" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* --------------------  COMMUNES --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/commune-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Listes des communes" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* --------------------  NATIONALITES --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/nationalite-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <AssignmentInd />
                    </ListItemIcon>
                    <ListItemText primary="Listes des nationalites" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            {/* --------------------  FORME JURIDIQUE --------------------   */}

            <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/formj-page")} }  >
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    > 
                    <AutoStories />
                    </ListItemIcon>
                    <ListItemText primary="Forme juridiques" sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            </List>

            <Divider />   
        </List>
      </Drawer>
      <Box component="main" 
        sx={{ 
            flexGrow: 1 ,
          }}
      >

      </Box>
    </Box>
  );
}
