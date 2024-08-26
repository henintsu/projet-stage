import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios'
import '../../utilisateur/ModalFormAdd/Style.css'
import './main.js'
import { useNavigate } from 'react-router-dom'

function FormModalClient({ open, onClose }) {

  const [values, setValues] = useState({
    ident: '',
    numstat: '',
    numentreprise: '',
    lien: '',
    datecreation: '',
    datemodification: '',
    typemaj: '',
    nomproprietaire: '',
    sigle: '',
    adresseeexercice: '',
    communeexercice: '',
    codecommuneexercice: '',
    telephoneexercice: '',
    bpexercice: '',
    domicilecli: '', // correction ici
    communecli: '',
    codecommunecli: '',
    telephonecli: '',
    bpcli: '',
    nationalitecli: '',
    codenationalitecli: '',
    principale: '', // Ajouté ici
    secondaire1: '', // Ajouté ici
    secondaire2: '', // Ajouté ici
    total_salarie_mlg: '', // Ajouté ici
    total_masculin: '',
    total_feminin: '',
    total_salarie_etg: '', // Ajouté ici
    total_masc: '', // Ajouté ici
    total_fem: '', // Ajouté ici
    cincli: '',
    cnaps: '',
    numPatente: '',
    formJ: '',
    codeformJ: '',
    comptabilite: '',
    Lchef: '',
    qualite: '',
    duplicata: '',
    fonds: '',
    coderegion: '',
    codedistrict: '',
    codecn: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [communes, setCommunes] = useState([]);
  const [nationalites, setNationalites] = useState([]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [selectedCommune1, setSelectedCommune1] = useState('');
  const [selectedCommuneCode1, setSelectedCommuneCode1] = useState('');

  const [selectedCommune2, setSelectedCommune2] = useState('');
  const [selectedCommuneCode2, setSelectedCommuneCode2] = useState('');

  const [selectedNationalite, setSelectedNationalite] = useState('');
  const [selectedNationaliteCode, setSelectedNationaliteCode] = useState('');

  useEffect(() => {
    getCommune();
    getNationalite();
  }, []);

  const getCommune = () => {
    axios.get('http://localhost:4000/api/commune')
      .then(res => {
        console.log(res.data);
        setCommunes(res.data);
      })
      .catch(err => console.log(err));
  };
  
  const getNationalite = () => {
    axios.get('http://localhost:4000/api/nationalite')
      .then(res => {
        console.log(res.data);
        setNationalites(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCommuneChange1 = (event) => {
    const selectedCommune = event.target.value;
    setSelectedCommune1(selectedCommune);
    const commune = communes.find(c => c.nomcommune === selectedCommune);
    if (commune) {
      setSelectedCommuneCode1(commune.codecommune);
    } else {
      setSelectedCommuneCode1('');
    }
    handleChange({ target: { name: 'communeexercice', value: commune ? commune.nomcommune : '' } });
    handleChange({ target: { name: 'codecommuneexercice', value: commune ? commune.codecommune : '' } });
  };

  const handleCommuneChange2 = (event) => {
    const selectedCommune = event.target.value;
    setSelectedCommune2(selectedCommune);
    const commune = communes.find(c => c.nomcommune === selectedCommune);
    if (commune) {
      setSelectedCommuneCode2(commune.codecommune);
    } else {
      setSelectedCommuneCode2('');
    }
    handleChange({ target: { name: 'communecli', value: commune ? commune.nomcommune : ''  } });
    handleChange({ target: { name: 'codecommunecli', value: commune ? commune.codecommune : '' } });
  };

  const handleNationaliteChange = (event) => {
    const selectedNationalite = event.target.value;
    setSelectedNationalite(selectedNationalite);
    const nationalite = nationalites.find(n => n.nomnationalite === selectedNationalite);
    if (nationalite) {
      setSelectedNationaliteCode(nationalite.codenationalite);
    } else {
      setSelectedNationaliteCode('');
    }
    handleChange({ target: { name: 'nationalitecli', value: nationalite ? nationalite.nomnationalite : '' } });
    handleChange({ target: { name: 'codenationalitecli', value: nationalite ? nationalite.codenationalite : '' } });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/temporaire', values)
      .then(res => {
        onClose()
        })
      .catch(err => console.log(err));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ backgroundColor: '#3483bf', color: '#fff' }}>
        <h5 className='px-2 text-warning'>VEUILLEZ REMPLIR CES FORMULAIRES CORRECTEMENT ! / FENOINA AMIN'NY ANTSAKANY SY ANDAVANY AVOKOA !</h5>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: '#fff' }}>Retour</Button>
        </DialogActions>
      </DialogTitle>

      <DialogContent sx={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <br />
          <form onSubmit={handleSubmit} method='post' > 
          <Container maxWidth="lg">
            <Grid  spacing={3}>
              {/* Exercice */}
              <Grid item xs={6}>
                <Card sx={{ boxShadow: 3, borderRadius: '15px' }}>
                  <CardContent>
                    <h5 className="card-title">Exercice / Momba an'le asa atao</h5><br />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="N° statistique" variant="outlined" name="numstat" onChange={handleChange} value={values.numstat}/>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Identification" variant="outlined" name="ident" onChange={handleChange} value={values.ident} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="N° Entreprise" variant="outlined" name="numentreprise" onChange={handleChange} value={values.numentreprise} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Lien" variant="outlined" name="lien" onChange={handleChange} value={values.lien} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth type='date' label="Date création" variant="outlined" placeholder="jj-mm-aaaa" name="datecreation" onChange={handleChange}  value={values.datecreation}/>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth type='date' label="Date modification" variant="outlined" placeholder="jj-mm-aaaa" name="datemodification" onChange={handleChange} value={values.datemodification}/>
                      </Grid>

                      <Grid item xs={12}>
                        <h6><b>C</b>reation ; <b>M</b>odification ; <b>A</b>bandon ;<b>R</b>eprise ; m<b>U</b>tation ; Ré<b>E</b>nregistrement</h6>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Type maj</InputLabel>
                          <Select label="Type_maj" defaultValue="" name="typemaj" onChange={handleChange} value={values.typemaj}>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="R">R</MenuItem>
                            <MenuItem value="U">U</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField fullWidth label="Nom du proprietaire" variant="outlined" name="nomproprietaire" onChange={handleChange} value={values.nomproprietaire}/>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField fullWidth label="Sigle" variant="outlined" name="sigle" onChange={handleChange} value={values.sigle} />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField fullWidth label="Adresse de l'exercice" variant="outlined" name="adresseeexercice" onChange={handleChange} value={values.adresseeexercice} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Commune exercice</InputLabel>
                          <Select label="Commune exercice" value={selectedCommune1} onChange={handleCommuneChange1} name='communeexercice'>
                            <MenuItem value="">Sélectionner...</MenuItem>
                            {communes.map((commune, i) => (
                              <MenuItem key={i} value={commune.nomcommune}>{commune.nomcommune}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Code commune</InputLabel>
                          <Select label="Code commune" value={selectedCommuneCode1} onChange={handleCommuneChange1} name='codecommuneexercice'disabled>
                            <MenuItem value="">Sélectionner...</MenuItem>
                            {communes.map((commune, i) => (
                              <MenuItem key={i} value={commune.codecommune}>{commune.codecommune}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Telephone de l'exercice" variant="outlined" name="telephoneexercice" onChange={handleChange} value={values.telephoneexercice} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Boite postal" variant="outlined" name="bpexercice" onChange={handleChange} value={values.bpexercice}/>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>

              {/* Domicile */}
              <Grid item xs={6}>
                <Card sx={{ boxShadow: 3, borderRadius: '10px' }}>
                  <CardContent>
                    <h5 className="card-title">Domicile / Fonenanao sy adiresy mazava </h5><br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Adresse Domicile" variant="outlined" name="domicilecli" onChange={handleChange} value={values.domicilecli} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Commune exercice</InputLabel>
                            <Select label="Commune Domicile" defaultValue="" name="communecli" value={selectedCommune2} onChange={handleCommuneChange2}>
                              <MenuItem value="Chargement...">Chargement...</MenuItem>
                              {
                                communes.map((commune, i) => (
                                  <MenuItem key={i} value={commune.nomcommune}>{commune.nomcommune}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Code commune</InputLabel>
                            <Select label="Code commune" defaultValue="" name="codecommunecli" value={selectedCommuneCode2} onChange={handleChange} disabled>
                              <MenuItem value="Chargement...">Chargement...</MenuItem>
                              {
                                communes.map((commune, i) => (
                                  <MenuItem key={i} value={commune.codecommune}>{commune.codecommune}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Telephone" variant="outlined" placeholder="+261 " name="telephonecli" value={values.telephonecli} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Boite postal" variant="outlined" name="bpcli" onChange={handleChange} value={values.bpcli} />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="N° CIN" variant="outlined" placeholder='xxx-xxx-xxx-xxx' name="cincli" onChange={handleChange} value={values.cincli} />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="N° Cnaps" variant="outlined" name="cnaps" onChange={handleChange} value={values.cnaps}/>
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="N° patente" variant="outlined" placeholder="" name="numpatente" onChange={handleChange} value={values.numpatente}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Forme j </InputLabel>
                            <Select label="Forme j " defaultValue="" name="formj" onChange={handleChange} value={values.formj}>
                              <MenuItem value="Chargement...">Chargement...</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Code </InputLabel>
                            <Select label="Code" defaultValue="" name="codeformj" onChange={handleChange} value={values.codeformj}>
                              <MenuItem value="Chargement...">Chargement...</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Comptabilite</InputLabel>
                            <Select label="Comptabilite" defaultValue="" name="comptabilite" onChange={handleChange} value={values.comptabilite}>
                              <MenuItem value="Non">Non</MenuItem>
                              <MenuItem value="Oui">Oui</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>                     

                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Qualite" variant="outlined" placeholder="A saisir" name="qualite" onChange={handleChange} value={values.qualite} />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Lchef</InputLabel>
                            <Select label="Lchef" defaultValue="" name="lchef" onChange={handleChange} value={values.lchef}>
                              <MenuItem value="Gl">P : Proprietaire</MenuItem>
                              <MenuItem value="Gl">GL : Gerant Libre</MenuItem>
                              <MenuItem value="GS">GS : Gerant Salarié</MenuItem>
                              <MenuItem value="DS">DS : Gerant Salarié : Directeur de Societe</MenuItem>
                              <MenuItem value="AS">AS : Gerant Salarié : Agent de Societe</MenuItem>
                              <MenuItem value="CC">CC : Gerant Salarié : Chef de Chantier</MenuItem>
                              <MenuItem value="AU">CC : Gerant Salarié : Autres</MenuItem>
                              <MenuItem value="A">A : Autre</MenuItem>
                              <MenuItem value="ND">ND  : Non Declare</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Nationalité</InputLabel>
                            <Select label="Nationalité" value={selectedNationalite} onChange={handleNationaliteChange} name="nationalitecli" >
                              <MenuItem value="">Sélectionner...</MenuItem>
                              {nationalites.map((nationalite, i) => (
                                <MenuItem key={i} value={nationalite.nomnationalite}>{nationalite.nomnationalite}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Code nationalité</InputLabel>
                            <Select label="Code nationalité" value={selectedNationaliteCode} name='codenationalitecli' onChange={handleChange} disabled>
                              <MenuItem value="">Sélectionner...</MenuItem>
                              {nationalites.map((nationalite, i) => (
                                <MenuItem key={i} value={nationalite.codenationalite}>{nationalite.codenationalite}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Duplicata</InputLabel>
                            <Select label="Duplicata" defaultValue="" name="duplicata" onChange={handleChange} value={values.duplicata}>
                              <MenuItem value="0">0</MenuItem>
                              <MenuItem value="1">1</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Fonds" variant="outlined" placeholder="A saisir" name="fonds" onChange={handleChange} value={values.fonds} />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Code_region" variant="outlined" placeholder="21" name="coderegion" onChange={handleChange} value={values.coderegion} />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Code_district" variant="outlined" placeholder="A saisir" name="codedistrict" onChange={handleChange} value={values.codedistrict} />
                        </Grid>

                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Code_cn" variant="outlined" placeholder="A saisir" name="codecn" onChange={handleChange} value={values.codecn} />
                        </Grid>

                      </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Activité */}
              <Grid item xs={6} >
                <Card sx={{ boxShadow: 3, borderRadius: '10px' }}>
                  <CardContent>
                    <h5 className="card-title">Activité / Fototrasa </h5><br />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Activité Principale" variant="outlined" name="principale" placeholder='Inona le asa ataonao ' onChange={handleChange}  value={values.principale}/>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField fullWidth label="Activite Secondaire 1" variant="outlined" name="secondaire1" placeholder='Asa fanampiny faharoa' onChange={handleChange} value={values.secondaire1} />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField fullWidth label="Activite Secondaire 2" variant="outlined" name="secondaire2" placeholder='Asa fanampiny fahatelo' onChange={handleChange} value={values.secondaire2}/>
                      </Grid>

                      <Grid item xs={12}>
                        <h6 className='mt-1 px-2 '>Tsy maintsy fenoina ny <b className='text-danger px-1'>le asa ataonao etsy ambony !</b></h6>
                      </Grid>

                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} className='px-2'>
                <Card>
                  <CardContent>
                    <h5 className="card-title">Salaries Malagasy / Mpiasa malagasy</h5>
                    <br />
                      <Grid container spacing={2}>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total" variant="outlined" placeholder="A saisir" name="total_salarie_mlg" onChange={handleChange} value={values.total_salarie_mlg}/>
                        </Grid>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total masculin" variant="outlined" placeholder="A saisir" name="total_masculin" onChange={handleChange} value={values.total_masculin}/>
                        </Grid>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total feminin" variant="outlined" placeholder="A saisir" name="total_feminin" onChange={handleChange} value={values.total_feminin}/>
                        </Grid>
                      </Grid>
                  </CardContent>
                </Card>
                <br />

            {/* ----------------------------------------------------------------------------------------------- */}
                <Card>
                  <CardContent>
                    <h5 className="card-title">Salaries étranger / Mpiasa vahiny</h5>
                    <br />
                      <Grid container spacing={2}>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total" variant="outlined" placeholder="A saisir" name="total_salarie_etg"  onChange={handleChange} value={values.total_salarie_etg}/>
                        </Grid>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total masculin" variant="outlined" placeholder="A saisir" name="total_masc" onChange={handleChange} value={values.total_masc} />
                        </Grid>
                        <Grid item xs={10} sm={4}>
                          <TextField fullWidth label="Total feminin" variant="outlined" placeholder="A saisir" name="total_fem" onChange={handleChange} value={values.total_fem} />
                        </Grid>
                      </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Image */}
              <Grid item xs={6}>
                <Card sx={{ boxShadow: 3, borderRadius: '10px' }}>
                  <CardContent>
                    <h5 className="card-title">Image</h5><br />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <input type="file" accept="image/*" onChange={handleImageChange} name='Image' value={values.Image}/>
                      </Grid>
                      <Grid item xs={12} className='px-2'>
                        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="image-preview"  />}
                        
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" color="error" onClick={onClose} className='btn_annuler' >Annuler</Button>
                <Button variant="contained" color="primary" type='submit'>Envoyer</Button>
              </Box>
            </Grid>
          </Container>
          </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormModalClient
