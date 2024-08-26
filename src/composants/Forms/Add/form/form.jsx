import React from 'react'
import '../form/form.css'
import { Box, Card, CardContent, Button , Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Form() {
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
    adresseexercice: '',
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
    numpatente: '',
    formJ: '',
    codeformj: '',
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

// Gestion des changements de sélection de commune et nationalité
const handleCommuneChange1 = (event) => {
  const selectedCommune = event.target.value;
  const commune = communes.find(c => c.nomcommune === selectedCommune);
  setSelectedCommune1(selectedCommune);
  setSelectedCommuneCode1(commune ? commune.codecommune : '');
  setValues(prevValues => ({
    ...prevValues,
    communeexercice: selectedCommune,
    codecommuneexercice: commune ? commune.codecommune : ''
  }));
};

const handleCommuneChange2 = (event) => {
  const selectedCommune = event.target.value;
  const commune = communes.find(c => c.nomcommune === selectedCommune);
  setSelectedCommune2(selectedCommune);
  setSelectedCommuneCode2(commune ? commune.codecommune : '');
  setValues(prevValues => ({
    ...prevValues,
    communecli: selectedCommune,
    codecommunecli: commune ? commune.codecommune : ''
  }));
};

const handleNationaliteChange = (event) => {
  const selectedNationalite = event.target.value;
  const nationalite = nationalites.find(n => n.nomnationalite === selectedNationalite);
  setSelectedNationalite(selectedNationalite);
  setSelectedNationaliteCode(nationalite ? nationalite.codenationalite : '');
  setValues(prevValues => ({
    ...prevValues,
    nationalitecli: selectedNationalite,
    codenationalitecli: nationalite ? nationalite.codenationalite : ''
  }));
};


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/repertoire', values)
      .then(res => {
        })
      .catch(err => console.log(err));
  };

  return (
    <div className='form'>  
          <div className="card mt-2">
            <div className="container mt-1 ">
              <div className="row ">
                <div className="col-md-6 col-sm-12">
                  <div className="title">
                    <h4>Form</h4>
                  </div>
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/Dashboard">Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Form d inscription 
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
					</div>

          {/* <!-- Default Basic Forms Start --> */}
					<div className="card container mb-10 col-12">
						<h2 className='card-header color-text'>Formulaire</h2>
            <br />

                  <form onSubmit={handleSubmit}>
                    <Container maxWidth="lg">
                        <Grid container spacing={3} c>
                            <Grid item xs={12} md={6} className='px-2'>
                                <Card className='Card'>
                                  <CardContent >
                                    <h5 className="card-title">Exercice</h5>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="N° statistique"  
                                              name='numstat'
                                              value={values.numstat}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="ident" 
                                              name='ident' 
                                              value={values.ident}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="n° entreprise" 
                                              name='numentreprise'
                                              value={values.numentreprise}
                                              onChange={handleChange}
                                              required
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control"
                                              placeholder="lien" 
                                              name='lien'
                                              value={values.lien}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <label htmlFor="datecreat">Date creation</label>
                                            <input 
                                              type="date" 
                                              id='datecreat'
                                              className="form-control" 
                                              placeholder="date creation" 
                                              name='datecreation'
                                              value={values.datecreation}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <label htmlFor="datedit">Date creation</label>
                                            <input 
                                              type="date" 
                                              id='datedit' 
                                              className="form-control" 
                                              placeholder="date modification" 
                                              name='datemodification'
                                              value={values.datemodification}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          {/* <p className='mt-4 px-4'> <b>C</b>reation   ;    <b>M</b>odification   ;   <b>A</b>bandon   ;   <b>R</b>eprise   ;   m<b>U</b>tation   ;   Ré<b>E</b>nregistrement</p> */}
                                          <div className="card-body">
                                            <select className="form-select mb-3" name="typemaj" onChange={handleChange} value={values.typemaj}>
                                              <option selected>Type MAJ</option>
                                              <option value="Creation">Creation</option>
                                              <option value="Modification">Modification</option>
                                              <option value="Abandon">Abandon</option>
                                              <option value="Réprise">Réprise</option>
                                              <option value="Mutation">Mutation</option>
                                              <option value="Réenregistrement">Réenregistrement</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="nom proprietaire" 
                                              name='nomproprietaire'
                                              value={values.nomproprietaire}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Sigle" 
                                              name='sigle'
                                              value={values.sigle}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Adresse exercice" 
                                              name='adresseeexercice'
                                              value={values.adresseeexercice}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <div className="card-body">
                                              <select className="form-select mb-3" value={selectedCommune1} onChange={handleCommuneChange1} >
                                                <option selected>Commune exercice</option>
                                                {
                                                  communes.map((commune, i) => (
                                                  <option key={i} value={commune.nomcommune}>{commune.nomcommune}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                          <Grid item xs={12} sm={6} >
                                            <div className="card-body">                                  
                                              <select className="form-select mb-3" value={selectedCommune1} onChange={handleCommuneChange1} >
                                                <option selected>Code commune exercice</option>
                                                {
                                                  communes.map((commune, i) => (
                                                  <option key={i} value={commune.codecommune}>{commune.codecommune}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="telephone exercice" 
                                              name='telephoneexercice'
                                              value={values.telephoneexercice}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="boite postal exercice" 
                                              name='bpexercice'
                                              value={values.bpexercice}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>
                                        
                                    </Grid>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* ----------------------------------------------------------------------------------------------- */}

                            <Grid item xs={12} md={6} className='px-2'>
                                <Card className='Card'>
                                <CardContent>
                                    <h5 className="card-title">Domicile</h5>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Domicile personne" 
                                              name='domicilecli'
                                              value={values.domicilecli}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <div className="card-body">
                                              <select className="form-select mb-3" value={selectedCommune2} onChange={handleCommuneChange2} >
                                                <option selected>Commune personne</option>
                                                {
                                                  communes.map((commune, i) => (
                                                  <option key={i} value={commune.nomcommune}>{commune.nomcommune}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                          <Grid item xs={12} sm={6} >
                                            <div className="card-body">                                  
                                              <select className="form-select mb-3" value={selectedCommune2} onChange={handleCommuneChange2} >
                                                <option selected>Code commune personne</option>
                                                {
                                                  communes.map((commune, i) => (
                                                  <option key={i} value={commune.codecommune}>{commune.codecommune}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="telephone personne" 
                                              name='telephonecli'
                                              value={values.telephonecli}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="boite postal personne" 
                                              name='bpcli'
                                              value={values.bpcli}
                                              onChange={handleChange}
                                            />
                                          </div>                                       
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="cin personne" 
                                              name='cincli'
                                              value={values.cincli}
                                              onChange={handleChange}
                                            />
                                          </div>                                         
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="n° cnaps" 
                                              name='cnaps'
                                              value={values.cnaps}
                                              onChange={handleChange}
                                            />
                                          </div>   
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="n° patente"
                                              name='numpatente'
                                              value={values.numpatente}
                                              onChange={handleChange}
                                            />
                                          </div>   
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" name='formj' value={values.formJ} onChange={handleChange}>
                                              <option selected>Form j</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" name='codeformj' value={values.codeformj} onChange={handleChange}>
                                              <option selected>code form j</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" name='comptabilite' value={values.comptabilite} onChange={handleChange}> 
                                              <option selected>compabilite</option>
                                              <option value="oui">oui</option>
                                              <option value="non">non</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                              <select className="form-select mb-3" name="lchef" value={values.Lchef} onChange={handleChange}>
                                                <option value="Gl">Lchef</option>
                                                <option value="Gl">Gl</option>
                                                <option value="GS">GS</option>
                                                <option value="DS">DS</option>
                                                <option value="AS">AS</option>
                                                <option value="CC">CC</option>
                                                <option value="AU">AU</option>
                                                <option value="A">A</option>
                                                <option value="ND">ND</option>
                                              </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="qualite" 
                                              name='qualite'
                                              value={values.qualite}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <div className="card-body">
                                              <select className="form-select mb-3" value={selectedCommune2} onChange={handleCommuneChange2} >
                                                <option selected>Nationalite personne</option>
                                                {
                                                  nationalites.map((nationalite, i) => (
                                                  <option key={i} value={nationalite.nomnationalite}>{nationalite.nomnationalite}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                          <Grid item xs={12} sm={6} >
                                            <div className="card-body">                                  
                                              <select className="form-select mb-3" value={selectedNationalite} onChange={handleNationaliteChange} >
                                                <option selected>Code nationalite personne</option>
                                                {
                                                  nationalites.map((nationalite, i) => (
                                                  <option key={i} value={nationalite.codenationalite}>{nationalite.codenationalite}</option>
                                                  ))
                                                }
                                              </select>
                                            </div>
                                          </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                              <select label="Duplicata" className="form-select mb-3" name="duplicata" value={values.duplicata} onChange={handleChange}>
                                                <option value="0">Duplicata</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                              </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Fonds" 
                                              name='fonds'
                                              value={values.fonds}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="code region" 
                                              name='coderegion'
                                              value={values.coderegion}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="code district " 
                                              name='codedistrict'
                                              value={values.codedistrict}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="code cn " 
                                              name='codecn'
                                              value={values.codecn}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                </Card>
                            </Grid>
                            {/* ----------------------------------------------------------------------------------------------- */}

                            <Grid item xs={12} md={6} className='px-2'>
                                <Card className='Card'>
                                <CardContent>
                                    <h5 className="card-title">Activité</h5>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Activite principal" 
                                              name='principale'
                                              value={values.principale}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Activite secondaire1" 
                                              name='secondaire1'
                                              value={values.secondaire1}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="Activite secondaire2" 
                                              name='secondaire2'
                                              value={values.secondaire2}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <h5 className='h6 d-flex justify-content-center mt-3'> " NB : le champs <b className='text-danger px-1'> Activite principal </b> est obligatoire ! "</h5>
                                        </Grid>
                                        
                                    </Grid>
                                </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6} className='px-2'>
                                <Card className='Card'>
                                <CardContent>
                                    <h5 className="card-title">Salaries Malagasy</h5>
                                    <br />
                                    <Grid container spacing={2}>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total salarie malagasy" 
                                              name='total_salarie_mlg'
                                              value={values.total_salarie_mlg}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total feminin" 
                                              name='total_feminin'
                                              value={values.total_feminin}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total masculin" 
                                              name='total_masculin'
                                              value={values.total_masculin}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                </Card>
                                <br />

                            {/* ----------------------------------------------------------------------------------------------- */}
                                <Card className='Card'>
                                 <CardContent>
                                    <h5 className="card-title">Salaries étranger</h5>
                                    <br />
                                    <Grid container spacing={2}>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total salarie etranger" 
                                              name='total_salarie_etg'
                                              value={values.total_salarie_etg}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total feminin" 
                                              name='total_fem'
                                              value={values.total_fem}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input 
                                              type="text" 
                                              className="form-control" 
                                              placeholder="total masculin" 
                                              name='total_masc'
                                              value={values.total_masc}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </Grid>

                                    </Grid>
                                  </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12}  className='px-2 py-2'>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                  <Button variant="contained" color="primary" type='submit' >Soumettre</Button><br />
                                </Box>
                            </Grid>
                        </Grid>
                      </Container>
                  </form>
						</div>
    </div>
  )
}

export default Form