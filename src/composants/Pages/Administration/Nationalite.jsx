import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton ,CardContent ,Link , Card , Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import MiniDrawer from '../../Dashboard/MiniDrawer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Snackbar } from '@mui/material';
import { Backup } from '@mui/icons-material';

function Nationalite() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    id: '', // Ajouter l'id ici
    codenationalite: '',
    nomnationalite: ''
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' ou 'error'

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);

    // Fermer l'alerte après 2000 ms
    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:4000/api/nationalite')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/nationalitedelete/${id}`)
      .then(() => {
        getData();
        handleCloseDialog();
        showAlert('Suppression réussie', 'success');
      })
      .catch(err => {
        console.log(err);
        showAlert('Erreur lors de la suppression', 'error');
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getData();
    } else {
      axios.get(`http://localhost:4000/api/recherche/nationalite/${searchTerm}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/nationalite', values)
      .then(() => {
        setValues({ codenationalite: '', nomnationalite: '' });
        getData();
        showAlert('Ajout réussi !', 'success');
      })
      .catch(() => {
        showAlert('Erreur lors de l\'ajout', 'error');
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (values.id) { // S'assurer que l'ID est défini
      axios.put(`http://localhost:4000/api/edit/nationalite/${values.id}`, values)
        .then(() => {
          setIsEditing(false);
          setValues({ id: '', codenationalite: '', nomnationalite: '' });
          getData();
          showAlert('Modification réussie !', 'success');
        })
        .catch(() => {
          showAlert('Erreur lors de la modification', 'error');
        });
    } else {
      showAlert('Erreur : ID manquant pour la modification', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', height: '100vh' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '60px' }}>
        <Grid container spacing={2}>

          {/* Formulaire Section */}
          <Grid item xs={12} md={4}>
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

            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {isEditing ? 'Modifier Nationalité' : 'Ajouter Nationalité'}
                    </Typography>
                    <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Code nationalité"
                        variant="outlined"
                        name='codenationalite'
                        value={values.codenationalite}
                        onChange={handleChange}
                        required
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Nationalité"
                        variant="outlined"
                        name='nomnationalite'
                        value={values.nomnationalite}
                        onChange={handleChange}
                        required
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setIsEditing(false);
                            setValues({ id: '', codenationalite: '', nomnationalite: '' });
                          }}
                        >
                          Annuler
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                          {isEditing ? 'Modifier' : 'Ajouter'}
                        </Button>
                      </Box>

                    </form>
                </CardContent>
            </Card>

            {/* Alert Snackbar */}
            {alertOpen && (
              <Alert
                variant="filled"
                severity={alertType}
                onClose={handleAlertClose}
                sx={{ width: '100%', mt : 2 }}
              >
                {alertMessage}
              </Alert>
            )}

          </Grid>

          {/* Tableau Section */}
          <Grid item xs={12} md={8} sx={{maxHeight : '560px' , overflowY : 'hidden'}}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Liste des Formes Nationalites
                </Typography>
                <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Recherche"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    sx={{ flex: 1 }}
                  />
                  <Button variant="contained" color="secondary" type="submit" sx={{ ml: 1 }}>
                    <i className='bi bi-search'></i>
                  </Button>
                </form>
                <TableContainer component={Paper} sx={{maxHeight : '440px' , overflowY : 'auto' , mt : 2}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Identifiant</TableCell>
                        <TableCell>Code nationalité</TableCell>
                        <TableCell>Nationalité</TableCell>
                        <TableCell className='text-center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {data.map((nationalite) => (
                        <TableRow key={nationalite.id}>
                          <TableCell>{nationalite.id}</TableCell>
                          <TableCell>{nationalite.codenationalite}</TableCell>
                          <TableCell>{nationalite.nomnationalite}</TableCell>
                          <TableCell className='text-center'>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setValues(nationalite); // Assigner l'ID ici
                                setIsEditing(true);
                              }}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleOpenDialog(nationalite.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog de confirmation de suppression */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>Êtes-vous sûr de vouloir supprimer cette nationalité ?</DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseDialog} startIcon={<Backup />}>
                Annuler
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(deleteId)} startIcon={<DeleteIcon />}>
                Supprimer
            </Button>
          </DialogActions>
        </Dialog>


      </Box>
    </Box>
  );
}

export default Nationalite;
