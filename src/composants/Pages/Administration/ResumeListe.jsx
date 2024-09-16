import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Paper,
  MenuItem,
  Select,
  Checkbox
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Backup,
} from '@mui/icons-material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import MiniDrawer from '../../Dashboard/MiniDrawer';

function ResumeListe() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState('enCours');
  const [lastId, setLastId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // Récupérer les lignes sélectionnées depuis localStorage au démarrage
    const savedSelectedRows = JSON.parse(localStorage.getItem('selectedRows')) || [];
    setSelectedRows(savedSelectedRows);
    getData();
  }, []);

  useEffect(() => {
    // Sauvegarder les lignes sélectionnées dans localStorage à chaque modification
    localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
  }, [selectedRows]);

  const getData = () => {
    axios.get('http://localhost:4000/api/temporaire')
      .then(res => {
        const sorted = sortData(res.data);
        setData(res.data);
        setSortedData(sorted);
      })
      .catch(err => console.log(err));
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => new Date(b.datecreation) - new Date(a.datecreation));
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:4000/api/temporairedelete/' + id)
      .then(res => {
        getData();
      })
      .catch(err => console.log(err));
    setOpenDialog(false);
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelectRow = (id) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (event) => {
    const confirm = window.confirm("Êtes-vous sûr de vouloir barrer cette ligne ?");
    if (confirm) {
        if (event.target.checked) {
          const allRowIds = sortedData.map(row => row.id);
          setSelectedRows(allRowIds);
        } else {
          setSelectedRows([]);
        }
    }


  };

  const isSelected = (id) => selectedRows.includes(id);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', height: '100vh' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '60px', overflowY: 'hidden' }}>
        <Card sx={{ width: '100%', maxWidth: { xs: '100%', lg: '1250px' } }}>
        <CardHeader
            title={<Typography variant="h5" color="text.primary">Liste de rendez-vous</Typography>}
            subheader={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                <Typography variant="body1">{lastId}</Typography>
                <Link to="/repertoire-page">
                  <Button variant="contained" color="primary">Voir en detail</Button>
                </Link>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                label="Recherche"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                value={filter}
                onChange={handleFilterChange}
                displayEmpty
                variant="outlined"
                sx={{ ml: 2, width: '250px' }}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="expirer">Expiré</MenuItem>
                <MenuItem value="encours">En Cours</MenuItem>
              </Select>
            </Box>

            <TableContainer component={Paper} sx={{ height: '60vh', maxHeight: '60vh', overflowY: 'auto' }}>
              <Table sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedRows.length > 0 && selectedRows.length < sortedData.length}
                        checked={selectedRows.length === sortedData.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Nom propriétaire</TableCell>
                    <TableCell>Date d'expiration carte</TableCell>
                    <TableCell>Mode de paiement</TableCell>
                    <TableCell>Pièce justificative</TableCell>
                    <TableCell>Date rendez-vous</TableCell>
                    <TableCell>Heure rendez-vous</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((temporaire) => (
                    <TableRow
                      key={temporaire.id}
                      selected={isSelected(temporaire.id)}
                      sx={{
                        backgroundColor: isSelected(temporaire.id) ? '#f0f0f0' : 'inherit',
                        textDecoration: isSelected(temporaire.id) ? 'line-through' : 'none',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(temporaire.id)}
                          onChange={() => handleSelectRow(temporaire.id)}
                        />
                      </TableCell>
                      <TableCell>{/* Other cells */}</TableCell>
                      <TableCell>{temporaire.nomproprietaire}</TableCell>
                      <TableCell>{temporaire.dateexpirationcarte}</TableCell>
                      <TableCell>{temporaire.paymentmethod}</TableCell>
                      <TableCell>{temporaire.justification}</TableCell>
                      <TableCell>{temporaire.daterendezvous}</TableCell>
                      <TableCell>{temporaire.heurerendezvous}</TableCell>
                      <TableCell>
                        <Tooltip title="Voir / Modifier">
                          <IconButton
                            color="primary"
                            component={Link}
                            to={`/formulaire-modification/${temporaire.id}`}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton
                            color="error"
                            onClick={() => handleOpenDialog(temporaire.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation de suppression</DialogTitle>
          <DialogContent>Êtes-vous sûr de vouloir supprimer cet élément ?</DialogContent>
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

export default ResumeListe;


