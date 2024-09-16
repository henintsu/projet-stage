import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  Dialog,
  FormControl,
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
  Paper ,
  MenuItem ,
  Select
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

function Repertoire() {
  
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { id } = useParams();
  const [paramId, setParamId] = useState(null);
  const [lastId, setLastId] = useState(null);

  const [filter, setFilter] = useState('enCours'); // État pour le filtre sélectionné

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  
    let url = 'http://localhost:4000/api/temporaire'; // Par défaut, toutes les données
    if (event.target.value === 'expire') {
      url = 'http://localhost:4000/api/get/temporaire/expire';
    } else if (event.target.value === 'encours') {
      url = 'http://localhost:4000/api/get/temporaire/encours';
    }
  
    axios.get(url)
      .then(res => {
        setData(res.data);
        setSortedData(sortData(res.data));
      })
      .catch(err => console.log(err));
  };

  // Fonction pour récupérer les données
  const getData = () => {
    axios.get('http://localhost:4000/api/temporaire')
      .then(res => {
        const sorted = sortData(res.data);
        setData(res.data);
        setSortedData(sorted);
        const lastRecord = res.data.reduce((max, record) => (record.datecreation > max.datecreation ? record : max), res.data[0]);
        setLastId(lastRecord.ident);
      })
      .catch(err => console.log(err));
  };

  // Fonction pour trier les données par date de création (du plus récent au plus ancien)
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.datecreation);
      const dateB = new Date(b.datecreation);
      return dateB - dateA;  // Tri décroissant
    });
  };

  useEffect(() => {
    if (id) {
      setParamId(id);
    }
  }, [id]);

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

  const checkExpiration = (expirationDate) => {
    const today = new Date();
    const expiryDate = new Date(expirationDate);
    return expiryDate <= today;
  };

  const showAlert = (nom, prenom) => {
    alert(`La carte de ${nom} ${prenom} est expirée.`);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', height: '100vh' }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '60px',overflowY: 'hidden' }}>
        <Card sx={{width: '100%', maxWidth: { xs: '100%', lg: '1250px' } }}>
          <CardHeader
            title={<Typography variant="h5" color="text.primary">Répertoire Temporaire détaillé</Typography>}
            subheader={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right' }}>
                <Typography variant="body1">Dernier enregistrement ID: {lastId}</Typography>
                <Link to="/resume-page">
                  <Button variant="outlined" color="primary">Voir le resume</Button>
                </Link>
                <Link to="/formulaireajout-page">
                  <Button variant="contained" color="success">Ajouter</Button>
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
                  label = "trie"
                  onChange={handleFilterChange}
                  displayEmpty
                  variant="outlined"
                  sx={{ ml: 2, width: '250px' }}
                >
                  <MenuItem value="all">Tous</MenuItem>
                  <MenuItem value="expire">Expiré</MenuItem>
                  <MenuItem value="encours">En Cours</MenuItem>
                </Select>
            </Box>

            <TableContainer component={Paper} sx={{height: '60vh' , maxHeight: '60vh', overflowY: 'auto',}}>
              <Table sx={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  <TableRow size="small" sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Statut</TableCell>
                    <TableCell>Identification</TableCell>
                    <TableCell>Numero stat</TableCell>
                    <TableCell>Numero entreprise</TableCell>
                    <TableCell>Date creation</TableCell>
                    <TableCell>Date modification</TableCell>
                    <TableCell>Type maj</TableCell>
                    <TableCell>Nom proprietaire</TableCell>
                    <TableCell>Sigle</TableCell>
                    <TableCell>Adresse exercice</TableCell>
                    <TableCell>Commune exercice</TableCell>
                    <TableCell>Code Commune exercice</TableCell>
                    <TableCell>Telephone exercice</TableCell>
                    <TableCell>Bp exercice</TableCell>
                    <TableCell>Adresse </TableCell>
                    <TableCell>Commune </TableCell>
                    <TableCell>Code Commune </TableCell>
                    <TableCell>Telephone</TableCell>
                    <TableCell>Boite postal</TableCell>
                    <TableCell>Nationalite</TableCell>
                    <TableCell>Code Nationalite</TableCell>
                    <TableCell>Activite Principale</TableCell>
                    <TableCell>Activite Secondaire1</TableCell>
                    <TableCell>Activite Secondaire2</TableCell>
                    <TableCell>Total salarie mlagasy</TableCell>
                    <TableCell>Total masculin</TableCell>
                    <TableCell>Total feminin</TableCell>
                    <TableCell>Total salarie etranger</TableCell>
                    <TableCell>Total masculin</TableCell>
                    <TableCell>Total feminin</TableCell>
                    <TableCell>Numero CIN</TableCell>
                    <TableCell>Cnaps</TableCell>
                    <TableCell>Numero patente</TableCell>
                    <TableCell>Form juridique</TableCell>
                    <TableCell>Code Form j</TableCell>
                    <TableCell>Comptabilite</TableCell>
                    <TableCell>Lchef</TableCell>
                    <TableCell>Date d'expiration carte</TableCell>
                    <TableCell>Mode de paiement</TableCell>
                    <TableCell>piece justificative</TableCell>
                    <TableCell>Commentaire</TableCell>
                    <TableCell>Date rendez-vous</TableCell>
                    <TableCell>Heure rendez-vous</TableCell>
                    <TableCell>Etat de la carte</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((temporaire) => (
                    <TableRow key={temporaire.id}>
                      <TableCell>
                        {checkExpiration(temporaire.dateexpirationcarte) ? (
                          <Typography color="error" onClick={() => showAlert(temporaire.nomproprietaire, temporaire.prenom)}>Expiré</Typography>
                        ) : (
                          <span className="spinner-border text-primary me-2"></span>
                        )}
                      </TableCell>
                      <TableCell>{temporaire.ident}</TableCell>
                      <TableCell>{temporaire.numstat}</TableCell>
                      <TableCell>{temporaire.numentreprise}</TableCell>
                      <TableCell>{temporaire.datecreation}</TableCell>
                      <TableCell>{temporaire.datemodification}</TableCell>
                      <TableCell>{temporaire.typemaj}</TableCell>
                      <TableCell>{temporaire.nomproprietaire}</TableCell>
                      <TableCell>{temporaire.sigle}</TableCell>
                      <TableCell>{temporaire.adresseexercice}</TableCell>
                      <TableCell>{temporaire.communeexercice}</TableCell>
                      <TableCell>{temporaire.codecommuneexercice}</TableCell>
                      <TableCell>{temporaire.telephoneexercice}</TableCell>
                      <TableCell>{temporaire.bpexercice}</TableCell>
                      <TableCell>{temporaire.domicilecli}</TableCell>
                      <TableCell>{temporaire.communecli}</TableCell>
                      <TableCell>{temporaire.codecommunecli}</TableCell>
                      <TableCell>{temporaire.telephonecli}</TableCell>
                      <TableCell>{temporaire.bpcli}</TableCell>
                      <TableCell>{temporaire.nationalitecli}</TableCell>
                      <TableCell>{temporaire.codenationalitecli}</TableCell>
                      <TableCell>{temporaire.principale}</TableCell>
                      <TableCell>{temporaire.secondaire1}</TableCell>
                      <TableCell>{temporaire.secondaire2}</TableCell>
                      <TableCell>{temporaire.total_salarie_mlg}</TableCell>
                      <TableCell>{temporaire.total_masculin}</TableCell>
                      <TableCell>{temporaire.total_feminin}</TableCell>
                      <TableCell>{temporaire.total_salarie_etg}</TableCell>
                      <TableCell>{temporaire.total_masc}</TableCell>
                      <TableCell>{temporaire.total_fem}</TableCell>
                      <TableCell>{temporaire.cincli}</TableCell>
                      <TableCell>{temporaire.cnaps}</TableCell>
                      <TableCell>{temporaire.numpatente}</TableCell>
                      <TableCell>{temporaire.formj}</TableCell>
                      <TableCell>{temporaire.codeformj}</TableCell>
                      <TableCell>{temporaire.comptabilite}</TableCell>
                      <TableCell>{temporaire.lchef}</TableCell>
                      <TableCell>{temporaire.dateexpirationcarte}</TableCell>
                      <TableCell>{temporaire.paymentmethod}</TableCell>
                      <TableCell>{temporaire.justification}</TableCell>
                      <TableCell>{temporaire.commentaire}</TableCell>
                      <TableCell>{temporaire.daterendezvous}</TableCell>
                      <TableCell>{temporaire.heurerendezvous}</TableCell>
                      <TableCell>{temporaire.etatcarte}</TableCell>
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

        {/* Dialog pour confirmation de suppression */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation de suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer cet élément ?
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

export default Repertoire;
