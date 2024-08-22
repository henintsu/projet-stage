import React from 'react'
import '../form/form.css'
import { Box, Card, CardContent, Button , Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Form() {
  const [values, setValues] = useState({});

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
      .then(res => setCommunes(res.data))
      .catch(err => console.log(err));
  }

  const getNationalite = () => {
    axios.get('http://localhost:4000/api/nationalite')
      .then(res => setNationalites(res.data))
      .catch(err => console.log(err));
  }


  const handleCommuneChange1 = (event) => {
    const selectedCommune = event.target.value;
    setSelectedCommune1(selectedCommune);
    const commune = communes.find(c => c.nomcommune === selectedCommune);
    if (commune) {
      setSelectedCommuneCode1(commune.codecommune);
    } else {
      setSelectedCommuneCode1('');
    }
    handleChange({ target: { name: 'CommuneExercice', value: selectedCommune } });
    handleChange({ target: { name: 'CodeCommuneExercice', value: commune ? commune.codecommune : '' } });
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
    handleChange({ target: { name: 'communecli', value: selectedCommune } });
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
    handleChange({ target: { name: 'nationalitecli', value: selectedNationalite } });
    handleChange({ target: { name: 'codenationalitecli', value: nationalite ? nationalite.codenationalite : '' } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

                  <form action="">
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
                                            <input type="text" className="form-control" placeholder="N° stat"  name='numstat'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="ident" name='ident' />
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="n° entreprise" name='numentreprise'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={3}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="lien" name='lien'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <label htmlFor="datecreat">Date creation</label>
                                            <input type="date" id='datecreat' className="form-control" placeholder="date creation" name='datecreation'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <label htmlFor="datedit">Date creation</label>
                                            <input type="date" id='datedit' className="form-control" placeholder="date modification" name='datemodification'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <p className='mt-4 px-4'> <b>C</b>reation   ;    <b>M</b>odification   ;   <b>A</b>bandon   ;   <b>R</b>eprise   ;   m<b>U</b>tation   ;   Ré<b>E</b>nregistrement</p>
                                          <div className="card-body">
                                            <select className="form-select mb-3">
                                              <option selected>Type MAJ</option>
                                              <option value="C">C</option>
                                              <option value="M">M</option>
                                              <option value="A">A</option>
                                              <option value="R">R</option>
                                              <option value="U">U</option>
                                              <option value="E">E</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="nom proprietaire" name='nomproprietaire'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="Sigle" name='sigle'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="Adresse exercice" name='adresseexercice'/>
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
                                            <input type="text" className="form-control" placeholder="telephone exercice" name='telexercice'/>
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="boite postal exercice" name='bpexercice'/>
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
                                            <input type="text" className="form-control" placeholder="Domicile personne" name='domicileexercice'/>
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
                                            <input type="text" className="form-control" placeholder="telephone personne" name='telpersonne'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="boite postal personne" name='bppersonne'/>
                                          </div>                                       
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="cin personne" name='cinpersonne'/>
                                          </div>                                         
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="n° cnaps" name='cnaps'/>
                                          </div>   
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="n° patente" name='patente'/>
                                          </div>   
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" >
                                              <option selected>Form j</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" >
                                              <option selected>code form j</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">                                  
                                            <select className="form-select mb-3" >
                                              <option selected>compabilite</option>
                                              <option value="oui">oui</option>
                                              <option value="non">non</option>
                                            </select>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                              <select className="form-select mb-3" name="Lchef" >
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
                                            <input type="text" className="form-control" placeholder="qualite " name='qualite'/>
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
                                              <select label="Duplicata" className="form-select mb-3" name="duplicata" >
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
                                            <input type="text" className="form-control" placeholder="Fonds " name='fonds'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="code region " name='coderegion'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="code district " name='codedistrict'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="code cn " name='code cn'/>
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
                                            <input type="text" className="form-control" placeholder="Activite principal" name='principal'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="Activite secondaire1" name='secondaire1'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="Activite secondaire2" name='secondaire2'/>
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
                                            <input type="text" className="form-control" placeholder="total salarie malagasy" name='totalmalagasy'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="total feminin" name='totalfeminin'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="total masculin" name='totalmasculin'/>
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
                                            <input type="text" className="form-control" placeholder="total salarie etranger" name='totaletranger'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="total feminin" name='totalfem'/>
                                          </div>
                                        </Grid>

                                        <Grid item xs={10} sm={4}>
                                          <div className="card-body">
                                            <input type="text" className="form-control" placeholder="total masculin" name='totalmasc'/>
                                          </div>
                                        </Grid>

                                    </Grid>
                                  </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12}  className='px-2 py-2'>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="contained" color="primary" type='submit' >Ajouter</Button><br />
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