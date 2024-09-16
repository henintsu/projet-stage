import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
  Avatar,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Link,
  Card ,
  Drawer
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility,
  VisibilityOff,
  Sort as SortIcon,
} from '@mui/icons-material';
import MiniDrawer from '../../Dashboard/MiniDrawer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import FacebookIcon from '@mui/icons-material/Facebook';

function Administration() {
  const [values, setValues] = useState({
    id:'',
    name: '',
    email: '',
    pseudo: '',
    poste: '',
    telephone: '',
    whatsapp: '',
    facebook: '',
    description: '',
    avataruser: '',
  });

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [state, setState] = React.useState({});
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const navigate = useNavigate() ;
  const [isEditing, setIsEditing] = useState(false);
  const [selectUser, setSelectUser] = useState(null);


  useEffect(() => {
    getUserData()
  }, []);

  const getUserData = () => {
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


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Formulaire */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 , marginTop : '60px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            {selectedId ? "Modifier l'utilisateur" : 'Nouvel utilisateur'}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Nom */}
              <Grid item xs={12}>
                <TextField
                  label="Nom"
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.name}
                  onChange={handleInput}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              {/* Pseudo */}
              <Grid item xs={12}>
                <TextField
                  label="Pseudo"
                  name="pseudo"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.pseudo}
                  onChange={handleInput}
                  error={Boolean(errors.pseudo)}
                  helperText={errors.pseudo}
                />
              </Grid>
              {/* Poste oxxue */}
              <Grid item xs={12}>
                <TextField
                  label="Poste occupé"
                  name="poste"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.poste}
                  onChange={handleInput}
                  error={Boolean(errors.poste)}
                  helperText={errors.poste}
                />
              </Grid>
              {/* Telephone */}
              <Grid item xs={12}>
                <TextField
                  label="Telephone"
                  name="telephone"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.telephone}
                  onChange={handleInput}
                  error={Boolean(errors.telephone)}
                  helperText={errors.telephone}
                />
              </Grid>
              {/* Whatsapp */}
              <Grid item xs={12}>
                <TextField
                  label="Whatsapp"
                  name="whatsapp"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.whatsapp}
                  onChange={handleInput}
                  error={Boolean(errors.whatsapp)}
                  helperText={errors.whatsapp}
                />
              </Grid>
              {/* Facebook */}
              <Grid item xs={12}>
                <TextField
                  label="Facebook"
                  name="facebook"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.facebook}
                  onChange={handleInput}
                  error={Boolean(errors.facebook)}
                  helperText={errors.facebook}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.description}
                  onChange={handleInput}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  value={values.email}
                  onChange={handleInput}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              {/* Mot de passe */}
              <Grid item xs={12}>
                <TextField
                  label="Mot de passe"
                  name="password"
                  variant="outlined"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleInput}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* Avatar */}
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="avataruser"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="avataruser">
                  <Button variant="contained" color="primary" component="span" ullWidth  >
                    Choisir Avatar
                  </Button>
                </label>
                {imagePreviewUrl && <Avatar src={imagePreviewUrl} alt="Avatar Preview" sx={{ mt: 2, width: 100, height: 100, margin: 'auto' }} />}
              </Grid>
                {/* Boutons */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                  <Button variant="contained" color="primary" type="submit">
                    {selectedId ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                    Annuler
                  </Button>
                </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.last_login) - new Date(b.last_login);
      }
      return new Date(b.last_login) - new Date(a.last_login);
    });
    setSortedData(sorted);
  }, [data, sortOrder]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Le nom est requis';
    }
    if (!values.email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "L'email est invalide";
    }
    if (!values.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (values.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!values.avataruser && !selectedId) {
      errors.avataruser = "L'avatar est requis";
    }
    return errors;
  };

// Fonction pour l'ajout d'un nouvel utilisateur
const handleSubmit = (event) => {
  event.preventDefault();
  const validationErrors = validate(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();
    if (values.avataruser instanceof File) {
      formData.append('image', values.avataruser);
    }

    // Ajout des autres données du formulaire dans formData
    Object.keys(values).forEach((key) => {
      if (key !== 'avataruser') {
        formData.append(key, values[key]);
      }
    });

    // Envoi de la requête POST pour ajouter un nouvel utilisateur
    axios
      .post('http://localhost:4000/api/users', formData)
      .then(() => {
        clearForm();  // Réinitialisation du formulaire
        getData();    // Rafraîchir les données
      })
      .catch((err) => console.log(err));
  }
};

// Fonction pour la modification d'un utilisateur existant
const handleUpdate = (event) => {
  event.preventDefault();
  const validationErrors = validate(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const formData = new FormData();
    if (values.avataruser instanceof File) {
      formData.append('image', values.avataruser);
    }

    // Ajout des autres données du formulaire dans formData
    Object.keys(values).forEach((key) => {
      if (key !== 'avataruser') {
        formData.append(key, values[key]);
      }
    });

    // Vérification si un utilisateur est sélectionné pour la modification
    if (selectedId) {
      axios
        .put(`http://localhost:4000/api/users/${selectedId}`, formData)
        .then(() => {
          clearForm(); 
          getData(); 
        })
        .catch((err) => console.log(err));
      
      setSelectedId(null); 
    }
  }
};


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
      setValues({ ...values, avataruser: file });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/usersdelete/${id}`)
      .then(() => {
        getData();
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    clearForm();
    navigate("/administration-page")
  };

  const clearForm = () => {
    setValues({
      id:'',
      name: '',
      email: '',
      password: '',
      avataruser: '',
      pseudo: '',
      poste: '',
      telephone: '',
      whatsapp: '',
      facebook: '',
      description: '',
    });
    setSelectedId(null);
    setImagePreviewUrl('');
    setErrors({});
  };

  const getData = () => {
    axios
      .get('http://localhost:4000/api/users')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };


  const handleEdit = (user) => {
    if (!user || !user.id) {
      alert("L'objet 'user' est indéfini ou n'a pas de propriété 'id'");
      return;
    }
  
    setSelectedId(user.id);
    setValues({
      id: user.id, 
      name: user.name,
      email: user.email,
      password: user.password,
      avataruser: user.avataruser,
      pseudo: user.pseudo,
      poste: user.poste,
      telephone: user.telephone,
      whatsapp: user.whatsapp,
      facebook: user.facebook,
      description: user.description,
    });
    setImagePreviewUrl(user.avataruser);
    // toggleDrawer('right', true)();

    
  };
  

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', minHeight: '100vh' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '50px' ,overflowY : 'hidden' }}>
        {/* Titre et Breadcrumb */}
        <Paper elevation={3} sx={{ p: 2, mb: 2 , width : '100%' }}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" color="textPrimary">
                Administration
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" component={Link} to="/Dashboard" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Dashboard
                </Typography>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  /
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Admin
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>     
            {/* Avatar et informations à gauche */}
            <Grid item xs={12} md={3}> 
                <Card elevation={3} sx={{ p: 3 , height : '70vh' ,width : '100%' }}>
                {currentAdmin && (
                  <Box>
                    <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }} src={currentAdmin.avatar} alt={currentAdmin.name} />
                  </Box>
                )}
                    <Typography variant="h6" sx={{ fontSize  : "17px" }}>
                        {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.name}`}
                          </span>
                        )}

                      <IconButton color="primary"  onClick={() => handleEdit(selectedId)}>
                          <EditIcon />
                        </IconButton>

                        <IconButton color="error" onClick={() => handleOpenDialog()}>
                          <DeleteIcon />
                        </IconButton>

                    </Typography>

                    <Typography variant="body1" color="textSecondary">{values.poste}</Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" sx={{ textAlign : "center" }}>
                      {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.description}`}
                          </span>
                      )}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ my: 2  , fontSize  : "15px" }} >
                        <LocalPhoneIcon color = "primary"/> 
                        {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.telephone}`}
                          </span>
                        )}
                    </Typography>

                    <Typography sx={{ my: 2 , fontSize  : "15px"  }} >
                        <WhatsAppIcon color = "success" /> 
                        {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.whatsapp}`}
                          </span>
                        )}
                    </Typography>

                    <Typography sx={{ my: 2 , fontSize  : "15px"  }}>  
                        <LocalPostOfficeIcon color = "warning" /> 
                        {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.email}`}
                          </span>
                        )}
                    </Typography>

                    <Typography sx={{ my: 2 , fontSize  : "15px"  }} >
                        <FacebookIcon color = "primary" />
                        {currentAdmin && (
                          <span className="px-2">
                              {` ${currentAdmin.facebook}`}
                          </span>
                        )}
                    </Typography>
                </Card>
            </Grid>
            
            {/* Tableau des utilisateurs */}
            <Grid item xs={12} lg={9}>
              <Paper elevation={3} sx={{p: 3  ,width : '100%' }}>
                  <div>
                    {['right'].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                        <Drawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                <TableContainer sx={{maxHeight: '57vh', overflowY: 'auto', }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell>Avatar</TableCell> {/* Nouvelle colonne pour l'avatar */}
                        <TableCell>Nom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Pseudo</TableCell>
                        <TableCell align="right">
                          <Tooltip title={sortOrder === 'asc' ? 'Trier par ordre décroissant' : 'Trier par ordre croissant'}>
                            <IconButton onClick={() => handleSort(sortOrder === 'asc' ? 'desc' : 'asc')}>
                              <SortIcon />
                            </IconButton>
                          </Tooltip>
                          Dernière connexion
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {user.avataruser ? (
                              <Avatar src={user.avataruser} alt={user.name} sx={{ width: 50, height: 50 }} />
                            ) : (
                              <Avatar sx={{ width: 50, height: 50 }}>N/A</Avatar>
                            )}
                          </TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.pseudo}</TableCell>
                          <TableCell align="right">{new Date(user.last_login).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>       
        </Grid>

        {/* Dialog de confirmation de suppression */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <Typography>Es-tu sûr de vouloir supprimer cet utilisateur ?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={() => handleDelete(deleteId)} color="danger">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Administration;
