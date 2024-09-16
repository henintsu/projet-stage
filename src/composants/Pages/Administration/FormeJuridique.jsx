import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert,IconButton , Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid,Link , TextField, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MiniDrawer from '../../Dashboard/MiniDrawer';
import { Backup } from '@mui/icons-material';

export default function FormJuridique() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [values, setValues] = useState({
    id:"",
    code: "",
    formjuridique: "",
    sigle: ""
  });
  const [search, setSearch] = useState("");
  const [alert , setAlert] =  useState({ open: false, message: '', severity: 'info' }) ;
  const [isEditing , setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
 
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let timer;
    if (alert.open) {
      timer = setTimeout(() => {
        setAlert(prev => ({ ...prev, open: false }));
      }, 2000); // 2000 ms = 2 seconds
    }
    return () => clearTimeout(timer);
  }, [alert.open]);

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = () => {
    axios.post('http://localhost:4000/api/formj', values)
      .then(() => {
        clearForm();
        setAlert({ open: true, message: 'forme juridique ajoutée avec succès!', severity: 'success' });
        setIsEditing(false);
        setSelectedRow(null);
        getData(); 
      })
      .catch(err => {
        setAlert({ open: true, message: 'Erreur lors de l\'ajout de la forme juridique.', severity: 'error' });
        console.log(err) ;
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  const handleUpdate = () => {
    if (values.id) { 
    axios.put(`http://localhost:4000/api/edit/formj/${values.id}`, values)
      .then(() => {
        setAlert({ open: true, message: 'form juridique modifiée avec succès!', severity: 'success' });
        clearForm();        
        setIsEditing(false);
        setSelectedRow(null);
        getData();
      })
      .catch(err => {
        setAlert({ open: true, message: 'Erreur lors de la modification de la forme juridique selectione.', severity: 'error' });
        console.log(err);
      });
    } else
      setAlert('Erreur : ID manquant pour la modification', 'error');
    {

    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      getData();
    } else {
      axios.get(`http://localhost:4000/api/recherche/formj/${search}`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };


  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/delete/formj/${id}`)
      .then(() => {
        setAlert({ open: true, message: 'formjuridique supprimée avec succès!', severity: 'success' });
        getData();
        handleCloseDialog();
      })
      .catch(err =>{
        setAlert({ open: true, message: 'Erreur lors de la suppression de la form juridique.', severity: 'error' });
        console.log(err) ;
      });
  };

  const getData = () => {
    axios.get('http://localhost:4000/api/get/formj')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const clearForm = () => {
    setValues({
      code: "",
      formjuridique: "",
      sigle: ""
    });
    setSelectedRow(null); // Optional: Clear the selected row state if needed
  };

  const handleCancel = () => {
    clearForm();
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', height: '100vh' }}>
      <MiniDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 , marginTop : "55px"}}>
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
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {isEditing ? "Modifier Forme Juridique" : "Ajouter une Forme Juridique"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Code Forme Juridique"
                    name="code"
                    value={values.code}
                    onChange={handleChangeInput}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Forme Juridique"
                    name="formjuridique"
                    value={values.formjuridique}
                    onChange={handleChangeInput}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Sigle"
                    name="sigle"
                    value={values.sigle}
                    onChange={handleChangeInput}
                    margin="normal"
                  />
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mr: 1 }}>
                      {selectedRow ? "Mettre à jour" : "Valider"}
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={handleCancel} fullWidth>
                      Annuler
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Alert Component */}
             {alert.open && (
                <Alert
                  variant="filled"
                  severity={alert.severity}
                  onClose={handleCloseAlert}
                  sx={{width: '100%' , mt : 2 }}
                >
                  {alert.message}
                </Alert>
              )}

          </Grid>

          {/* Tableau Section */}
          <Grid item xs={12} md={8} sx={{maxHeight : '560px' , overflowY : 'hidden'}}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Liste des Formes Juridiques
                </Typography>
                <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Recherche par Forme Juridique"
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <Button variant="contained" color="secondary" type="submit" sx={{ ml: 1 }}>
                      <i className='bi bi-search'></i>
                    </Button>
                </form>
                <TableContainer component={Paper} sx={{maxHeight : '440px' , overflowY : 'auto' , mt : 2}}>
                  <Table>
                    <TableHead>
                      <TableRow sx ={{ backgroundColor : '#f5f5f5' }}>
                        <TableCell>Code Forme</TableCell>
                        <TableCell>Forme Juridique</TableCell>
                        <TableCell>Sigle</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((formj) => (
                        <TableRow key={formj.id}>
                          <TableCell>{formj.code}</TableCell>
                          <TableCell>{formj.formjuridique}</TableCell>
                          <TableCell>{formj.sigle}</TableCell>
                          <TableCell>
                            <IconButton
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setValues({
                                  id: formj.id,
                                  code: formj.code,
                                  formjuridique: formj.formjuridique,
                                  sigle: formj.sigle
                                });
                                setIsEditing(true);
                                setSelectedRow(formj);
                              }}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              variant="contained"
                              color="error"
                              sx={{ ml: 1 }}
                              onClick={() => handleOpenDialog(formj.id)}
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
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer cet enregistrement ?
          </DialogContent>
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
