import React from 'react'
import { Box, Card, CardContent, Button , Container, Grid  } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../Styles/StyleFormulaireAjout.css"
import MiniDrawer from '../../Dashboard/MiniDrawer';


function FormulaireModification() {
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
    domicilecli: '',
    communecli: '',
    codecommunecli: '',
    telephonecli: '',
    bpcli: '',
    nationalitecli: '',
    codenationalitecli: '',
    principale: '',
    secondaire1: '',
    secondaire2: '',
    total_salarie_mlg: '',
    total_masculin: '',
    total_feminin: '',
    total_salarie_etg: '',
    total_masc: '',
    total_fem: '',
    cincli: '',
    cnaps: '',
    numpatente: '',
    formj: '',
    codeformj: '',
    comptabilite: '',
    lchef: '',
    qualite: '',
    duplicata: '',
    fonds: '',
    coderegion: '',
    codedistrict: '',
    district: '',
    dateexpirationcarte :'',
    commentaire :'',
    etatcarte :''
  });


//   const [data, setData] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState([]);
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
    getFormj();
    getData();
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

  const getFormj = () => {
    axios.get('http://localhost:4000/api/get/formj')
    .then(res => setForm(res.data))
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

const getData = () => {
    axios.get('http://localhost:4000/api/temporaire/' + id)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:4000/api/update/temporaire/' + id, values)
        .then(res => {
        console.log(res);
        navigate("/repertoire-page")
        })
        .catch(err => console.log(err));
    };

    const handleEtatCarte = (e) => {
      const selectedDate = new Date(e.target.value);
      const today = new Date();
    
      // Comparaison des dates
      if (selectedDate.getTime() < today.getTime()) {
        // La date est dans le passé => Carte expirée
        setValues((prevValues) => ({
          ...prevValues,
          etatcarte: 'Expirée',
        }));
      } else {
        // La date est dans le futur ou aujourd'hui => Carte en cours
        setValues((prevValues) => ({
          ...prevValues,
          etatcarte: 'En cours',
        }));
      }
    };
    


  return (
    <Box sx={{ display: 'flex' ,backgroundColor : '#f5f5f5',width : '100%' , height : '100vh' }}>
      <MiniDrawer />

      <Box component="main" sx={{ flexGrow: 1 }} className='px-3' >
        <div className='card form'>  

              {/* <!-- Default Basic Forms Start --> */}
              <div className="card-body mb-10 col-12">
                <h4 className='card-header color-text'>Mise a jour enregistrement</h4>
                <br />

                      <form onSubmit={handleUpdate}>
                        <Container maxWidth="lg">
                            <Grid container spacing={3} c>
                                <Grid item xs={12} md={6} className='px-2'>
                                    <Card className='Card'>
                                      <CardContent >
                                        <h5 className="card-title">Exercice</h5>
                                        <br />
                                        <Grid container spacing={2} className='px-2'>
                                            <Grid item xs={10} sm={3}>
                                              <div className="form-floating">
                                                <input 
                                                  id='numstat'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='numstat'
                                                  value={values.numstat}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="numstat">N° statistique</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={3}>
                                              <div className="form-floating">
                                                <input 
                                                  id='ident'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='ident' 
                                                  value={values.ident}
                                                  onChange={handleChange}
                                                  required
                                                />
                                                <label htmlFor="ident">Identification</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={3}>
                                              <div className="form-floating">
                                                <input 
                                                  id='numentreprise'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='numentreprise'
                                                  value={values.numentreprise}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="numentreprise">N° entreprise</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={3}>
                                              <div className="form-floating">
                                                <input 
                                                  id='lien'
                                                  type="text" 
                                                  className="form-control"
                                                  name='lien'
                                                  value={values.lien}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="lien">lien</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  type="date" 
                                                  id='datecreat'
                                                  className="form-control" 
                                                  placeholder="date creation" 
                                                  name='datecreation'
                                                  value={values.datecreation}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="datecreat">Date creation</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  type="date" 
                                                  id='datedit' 
                                                  className="form-control" 
                                                  placeholder="date modification" 
                                                  name='datemodification'
                                                  value={values.datemodification}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="datedit">Date creation</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              {/* <p className='mt-4 px-4'> <b>C</b>reation   ;    <b>M</b>odification   ;   <b>A</b>bandon   ;   <b>R</b>eprise   ;   m<b>U</b>tation   ;   Ré<b>E</b>nregistrement</p> */}
                                              <div className="form-floating mt-2">
                                                <select id='typemaj' className="form-select" name="typemaj" onChange={handleChange} value={values.typemaj}>
                                                  <option value=""></option>
                                                  <option value="Creation">Creation</option>
                                                  <option value="Modification">Modification</option>
                                                  <option value="Abandon">Abandon</option>
                                                  <option value="Réprise">Réprise</option>
                                                  <option value="Mutation">Mutation</option>
                                                  <option value="Réenregistrement">Réenregistrement</option>
                                                </select>
                                                <label htmlFor="typemaj">Type mise a jour</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='nomproprietaire'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='nomproprietaire'
                                                  value={values.nomproprietaire}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="nomproprietaire">Nom proprietaire</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='sigle'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='sigle'
                                                  value={values.sigle}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="sigle">Sigle ou Dénomination Commercial</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='adresseexercice'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='adresseexercice'
                                                  value={values.adresseexercice}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="adresseexercice">Adresse exercice</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className="form-floating mt-2">
                                                  <select id='commune' className="form-select" value={selectedCommune1} onChange={handleCommuneChange1} name='communeexercice'>
                                                    <option selected></option>
                                                    {
                                                      communes.map((commune, i) => (
                                                      <option key={i} value={commune.nomcommune}>{commune.nomcommune}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="commune">Commune exercice</label>
                                                </div>
                                              </Grid>

                                              <Grid item xs={12} sm={6} >
                                                <div className="form-floating mt-2">                                  
                                                  <select id='codeC' className="form-select" value={selectedCommuneCode1} onChange={handleCommuneChange1} name='codecommuneexercice'  >
                                                    <option selected></option>
                                                    {
                                                      communes.map((commune, i) => (
                                                      <option key={i} value={commune.codecommune}>{commune.codecommune}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="codeC">Code Commune</label>
                                                </div>
                                              </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id="telephoneexercice"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='telephoneexercice'
                                                  value={values.telephoneexercice}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="telephoneexercice">Telephone exercice</label>
                                              </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id="bpexercice"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='bpexercice'
                                                  value={values.bpexercice}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="bpexercice">boite postal exercice</label>
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
                                        <Grid container spacing={2} className='px-2'>
                                            <Grid item xs={12}>
                                              <div className="form-floating">
                                                <input 
                                                  id='domicilecli'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='domicilecli'
                                                  value={values.domicilecli}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="domicilecli">Domicile personne</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className="form-floating mt-2">
                                                  <select id='commune' className="form-select" defaultValue="" name="communecli" value={selectedCommune2} onChange={handleCommuneChange2} >
                                                    <option selected></option>
                                                    {
                                                      communes.map((commune, i) => (
                                                      <option key={i} value={commune.nomcommune}>{commune.nomcommune}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="commune">Commune personne</label>
                                                </div>
                                              </Grid>

                                              <Grid item xs={12} sm={6} >
                                                <div className="form-floating mt-2">                                  
                                                  <select className="form-select" defaultValue="" name="codecommunecli" value={selectedCommuneCode2} onChange={handleChange}>
                                                    <option selected></option>
                                                    {
                                                      communes.map((commune, i) => (
                                                      <option key={i} value={commune.codecommune}>{commune.codecommune}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="commune">Code commune</label>
                                                </div>
                                              </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='telephonecli'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='telephonecli'
                                                  value={values.telephonecli}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="telephonecli">telephone personne</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='bpcli'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='bpcli'
                                                  value={values.bpcli}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="bpcli">Boite postal du personne</label>
                                              </div>                                       
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='cincli'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='cincli'
                                                  value={values.cincli}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="cincli">Numero C.I.N</label>
                                              </div>                                         
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='cnaps'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='cnaps'
                                                  value={values.cnaps}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="cnaps">Numero C.N.A.P.S</label>
                                              </div>   
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='numpatente'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='numpatente'
                                                  value={values.numpatente}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="numpatente">Numero PATENTE</label>
                                              </div>   
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">                                  
                                                <select id='formj' className="form-select " name='formj' value={values.formj} onChange={handleChange}>
                                                  <option value=""></option>
                                                  {
                                                      form.map((formj, i) => (
                                                          <option key={i} value={formj.formjuridique}>{formj.formjuridique}</option>
                                                      ))
                                                  }
                                                </select>
                                                <label htmlFor="formj">Forme juridique</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">                                  
                                                <select id='codef' className="form-select" name='codeformj' value={values.codeformj} onChange={handleChange}>
                                                  <option selected></option>
                                                  {
                                                      form.map((formj, i) => (
                                                          <option key={i} value={formj.code}>{formj.code}</option>
                                                      ))
                                                  }
                                                </select>
                                                <label htmlFor="codef">Code Forme juridique</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">                                  
                                                <select id='comptabilite' className="form-select" name='comptabilite' value={values.comptabilite} onChange={handleChange}> 
                                                  <option selected></option>
                                                  <option value="oui">oui</option>
                                                  <option value="non">non</option>
                                                </select>
                                                <label htmlFor="comptabilite">Compabilite</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                    <select ic='lchef' label="Lchef" defaultValue="" className='form-control' name="lchef" onChange={handleChange} value={values.lchef}>
                                                      <option value=""></option>
                                                      <option value="P : Proprietaire">P : Proprietaire</option>
                                                      <option value="GL : Gerant Libre">GL : Gerant Libre</option>
                                                      <option value="GS : Gerant Salarié">GS : Gerant Salarié</option>
                                                      <option value="DS : Gerant Salarié : Directeur de Societe<">DS : Gerant Salarié : Directeur de Societe</option>
                                                      <option value="AS : Gerant Salarié : Agent de Societe">AS : Gerant Salarié : Agent de Societe</option>
                                                      <option value="CC : Gerant Salarié : Chef de Chantier">CC : Gerant Salarié : Chef de Chantier</option>
                                                      <option value="CC : Gerant Salarié : Autres">CC : Gerant Salarié : Autres</option>
                                                      <option value="A : Autre">A : Autre</option>
                                                      <option value="ND  : Non Declare">ND  : Non Declare</option>
                                                    </select>
                                                    <label htmlFor="lchef">L chef</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='qualite'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='qualite'
                                                  value={values.qualite}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="qualite">Qualite</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className="form-floating mt-2">
                                                  <select id='nationalite' className="form-select" value={selectedNationalite} onChange={handleNationaliteChange} name="nationalitecli" >
                                                    <option selected></option>
                                                    {
                                                      nationalites.map((nationalite, i) => (
                                                      <option key={i} value={nationalite.nomnationalite}>{nationalite.nomnationalite}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="qualite">Nationalite</label>
                                                </div>
                                              </Grid>

                                              <Grid item xs={12} sm={6} >
                                                <div className="form-floating mt-2">                                  
                                                  <select id='code' className="form-select"  value={selectedNationaliteCode} name='codenationalitecli' onChange={handleChange} 
                                                  >
                                                    <option selected></option>
                                                    {
                                                      nationalites.map((nationalite, i) => (
                                                      <option key={i} value={nationalite.codenationalite}>{nationalite.codenationalite}</option>
                                                      ))
                                                    }
                                                  </select>
                                                  <label htmlFor="code">Code</label>
                                                </div>
                                              </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                  <select id='duplicata' label="Duplicata" className="form-select" name="duplicata" value={values.duplicata} onChange={handleChange}>
                                                    <option value=""></option>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                  </select>
                                                  <label htmlFor="duplicata">Duplicata</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='fonds'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='fonds'
                                                  value={values.fonds}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="fonds">Fonds de depart</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='coderegion'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='coderegion'
                                                  value={values.coderegion}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="coderegion">Code region</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='codedistrict'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='codedistrict'
                                                  value={values.codedistrict}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="codedistrict">Code district </label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating mt-2">
                                                <input 
                                                  id='district'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='district'
                                                  value={values.district}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="codedistrict">Code C.N</label>
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
                                        <Grid container spacing={2} className='px-2'>
                                            <Grid item xs={12}>
                                              <div className="form-floating">
                                                <input 
                                                  id ="principale"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='principale'
                                                  value={values.principale}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="principale">Activite principal"</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating ">
                                                <input 
                                                  id="secondaire1"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='secondaire1'
                                                  value={values.secondaire1}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="secondaire1">Activite secondaire1</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <div className="form-floating ">
                                                <input 
                                                  id="secondaire2"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='secondaire2'
                                                  value={values.secondaire2}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="secondaire2">Activite secondaire2</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                              <h5 className='text-jystify text-muted d-flex justify-content-center mt-3'> " NB : le champs <b className='text-danger px-1'> Activite principal </b> est obligatoire ! "</h5>
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
                                        <Grid container spacing={2} className='px-2'>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id="total_salarie_mlg"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_salarie_mlg'
                                                  value={values.total_salarie_mlg}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="total_salarie_mlg">total salarie malagasy</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id="total_feminin"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_feminin'
                                                  value={values.total_feminin}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="total_feminin">total feminin</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id="total_masculin"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_masculin'
                                                  value={values.total_masculin}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="total_masculin">total masculin</label>
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
                                        <Grid container spacing={2} className='px-2'>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id="total_salarie_etg"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_salarie_etg'
                                                  value={values.total_salarie_etg}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="total_salarie_etg">total salarie etranger</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id="total_fem"
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_fem'
                                                  value={values.total_fem}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="total_fem">Total feminin</label>
                                              </div>
                                            </Grid>

                                            <Grid item xs={10} sm={4}>
                                              <div className="form-floating">
                                                <input 
                                                  id='totalmasculin'
                                                  type="text" 
                                                  className="form-control" 
                                                  name='total_masc'
                                                  value={values.total_masc}
                                                  onChange={handleChange}
                                                />
                                                <label htmlFor="totalmasculin">Total masculin</label>
                                              </div>
                                            </Grid>

                                        </Grid>
                                      </CardContent>
                                    </Card>

                                    {/* ----------------------------------------------------------------------------------------------- */}
                                  
                                </Grid>

                                <Grid item xs={12} md={6} className='px-2'>
                                      <Card className='Card'>
                                      <CardContent>
                                          <h5 className="card-title">Autres Informations necessaire</h5>
                                          <br />
                                          <Grid container spacing={2} className='px-2'>

                                             {/* Date d'expiration de la carte */}
                                            <Grid item xs={12} sm={6}>
                                              <div className="form-floating mb-3">
                                                <input
                                                  className="form-control"
                                                  id="expiration"
                                                  type="date"
                                                  name="dateexpirationcarte"
                                                  value={values.dateexpirationcarte}
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    handleEtatCarte(e);
                                                  }}
                                                  required
                                                />
                                                <label htmlFor="expiration">Date d'expiration de la carte</label>
                                              </div>
                                            </Grid>

                                              {/* État de la carte (automatiquement mis à jour) */}
                                              <Grid item xs={12} sm={6}>
                                                <div className="form-floating mb-3">
                                                  <select
                                                    className="form-select"
                                                    id="etatcarte"
                                                    name="etatcarte"
                                                    value={values.etatcarte}
                                                    onChange={handleChange}
                                                    disabled
                                                  >
                                                    <option value="encours">encours</option>
                                                    <option value="expire">expire</option>
                                                  </select>
                                                  <label htmlFor="etatcarte">État de la carte</label>
                                                </div>
                                              </Grid>

                                              <Grid item xs={12}>
                                                  <div className="form-floating mb-3">
                                                    <input 
                                                      className="form-control" 
                                                      id="message" 
                                                      type="text" 
                                                      name='commentaire' 
                                                      value={values.commentaire} 
                                                      onChange={handleChange} 
                                                      required 
                                                    />
                                                    <label htmlFor="message">Message ou commentaire</label>
                                                  </div>
                                              </Grid>

                                          </Grid>
                                        </CardContent>
                                      </Card>
                                  </Grid>

                                <Grid item xs={12}  className='px-2 py-2'>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                      <Link to='/repertoire-page' className='btn btn-lg btn-danger me-3' variant="contained" color="danger"  >Annuler</Link>
                                      <Button variant="contained" color="primary" type='submit' >Mettre a jour</Button><br />
                                    </Box>
                                </Grid>
                            </Grid>
                          </Container>
                      </form>
                </div>
        </div>

      </Box>
      </Box>
  )
}

export default FormulaireModification