import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Badge, Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Build, Person, Close } from '@mui/icons-material';
import { useAuth } from '../Pages/Connection/provider';

function HeaderUi() {
    const [notifications, setNotifications] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // États pour chaque menu
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [anchorElMessages, setAnchorElMessages] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        fetchNotifications();
        getData();
        const interval = setInterval(fetchNotifications, 5000); // Vérifie les nouvelles notifications toutes les 5 secondes
        return () => clearInterval(interval); // Nettoyage lors du démontage du composant
    }, []);

    const fetchNotifications = () => {
        axios.get('http://localhost:4000/api/notifications')
            .then(response => {
                setNotifications(response.data.notificationsCount);
                setNotificationList(response.data.notifications || []);
            })
            .catch(error => console.error(error));
    };

    const getData = () => {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                setData(res.data);
                const currentAdminData = res.data.reduce((prev, curr) => {
                    return new Date(curr.last_login) > new Date(prev.last_login) ? curr : prev;
                });
                setCurrentAdmin(currentAdminData);
            })
            .catch(err => console.log(err));
    };

    const handleNotificationClick = (notificationId) => {
        // Logique pour gérer le clic sur une notification (par exemple, afficher les détails)
        console.log(`Notification ID: ${notificationId}`);
        fetchNotifications(); // Met à jour les notifications après un clic
        handleCloseNotifications(); // Ferme le menu des notifications
    };

    const handleRemoveNotification = (notificationId) => {
        // Supprimer la notification par son ID
        axios.delete(`http://localhost:4000/api/notifications/${notificationId}`)
            .then(() => {
                // Met à jour la liste des notifications après la suppression
                setNotificationList(notificationList.filter(notification => notification.id !== notificationId));
                setNotifications(notifications - 1);
            })
            .catch(error => console.error(error));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/connexion-page'); // Redirection manuelle vers la page de connexion
    };

    // Gestion de l'ouverture des menus
    const handleClickNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleClickMessages = (event) => {
        setAnchorElMessages(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // Gestion de la fermeture des menus
    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleCloseMessages = () => {
        setAnchorElMessages(null);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    return (
        <div className='d-flex justify-content-end'>
            {/* Notifications */}
            <IconButton onClick={handleClickNotifications} color="inherit" sx={{ marginRight: '10px' }}>
                <Badge badgeContent={notifications} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotifications}
                PaperProps={{
                    style: {
                        width: '400px', // Adjusted width for better display
                        marginTop: '10px'
                    },
                }}
            >
                {notificationList.length > 0 ? (
                    <List>
                        {notificationList.map(notification => (
                            <ListItem key={notification.id} button onClick={() => handleNotificationClick(notification.id)}>
                                <ListItemText primary={`Nouvelle inscription de ${notification.nomproprietaire}`} />
                                <ListItemIcon>
                                    <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveNotification(notification.id); }}>
                                        <Close />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <MenuItem>Aucune notification</MenuItem>
                )}
            </Menu>

            {/* Messages */}
            <IconButton onClick={handleClickMessages} color="inherit" sx={{ marginRight: '10px' }}>
                <ChatIcon />
            </IconButton>
            <Menu
                anchorEl={anchorElMessages}
                open={Boolean(anchorElMessages)}
                onClose={handleCloseMessages}
                PaperProps={{
                    style: {
                        width: '200px',
                        marginTop: '10px'
                    },
                }}
            >
                <MenuItem>Aucun nouveau message</MenuItem>
            </Menu>

            {/* Utilisateur */}
            <IconButton onClick={handleClickUser} color="inherit">
                {currentAdmin && (
                    <Avatar
                        src={currentAdmin.avataruser || ''}
                        alt={currentAdmin.name}
                        sx={{ width: 40, height: 40 }}
                    >
                        {currentAdmin.avataruser ? '' : 'N/A'}
                    </Avatar>
                )}
                {currentAdmin && (
                    <span className="text-white px-2">
                        {` ${currentAdmin.name}`}
                    </span>
                )}
            </IconButton>
            <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUser}
                PaperProps={{
                    style: {
                        width: '150px',
                        marginTop: '10px',
                    },
                }}
            >
                <MenuItem onClick={() => navigate("/profile")}>
                    <Person style={{ marginLeft: '5px', paddingRight: '5px' }} />
                    Profil
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => navigate("/settings")}>
                    <Build style={{ marginLeft: '5px', paddingRight: '5px' }} />
                    Paramètres
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => setOpenDialog(true)}>
                    <ExitToAppIcon style={{ marginLeft: '5px', paddingRight: '5px' }} />
                    Déconnexion
                </MenuItem>
            </Menu>

            {/* Dialog pour la déconnexion */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                    <Button onClick={handleLogout} autoFocus>Se déconnecter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HeaderUi;
