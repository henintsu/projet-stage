import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './styleBody.css'
import { Modal } from 'react-bootstrap';
import { Box, Card, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

// import './main'


function FormAdd() {

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
        principale: '', 
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
    
    
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:4000/api/temporaire', values)
        .then(res => {
          // Show the modal on successful submission
          setShowModal(true);
  
          // Set a timer to close the modal after 2 seconds
          setTimeout(() => {
            setShowModal(false);
          }, 2000); // 2000ms = 2 seconds
        })
        .catch(err => console.log(err));
    };

  return (
    <div className='contact-page'>
            <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" className="logo d-flex align-items-center">
                <h1 className="sitename">Direction Iterregional de Fianarantsoa</h1>
            </a>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <Link to='/login'  className="btn-get-started">Se connecter</Link>                    
                    <li><Link to="/contact" >Contact</Link></li>
                    <li><Link to="/formadd" className="active">S'inscrire</Link></li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            </div>
        </header>

        <main className="main">

            {/* <!-- Page Title --> */}
            <div className="page-title light-background">
            <div className="container">
                <h1>Formulaire</h1>
                <nav className="breadcrumbs">
                <ol>
                    <li><Link to="/">Home</Link></li>
                    <li className="current">Formulaire d'inscription</li>
                </ol>
                </nav>
            </div>
            </div>{/* <!-- End Page Title --> */}

            {/* <!-- Contact Section --> */}
            <section id="contact" className="contact section">

            <div className="container" data-aos="fade">

                <div className="row gy-5 gx-lg-5">

                <div className="col-lg-4">

                    <div className="info">
                    <h3>Aide</h3>
                    <p>Ceci est ici dans le but de vous aider avec les information dans le formulaire.</p>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Numero statistique :</h5>
                            <p>Votre numero statistique / Laharana statistika anao</p>
                        </div>
                    </div>                

                    <div className="info-item d-flex">
                        <div>
                            <h5>Identification :</h5>
                            <p>Votre numero d'identification / laharana manokana anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Lien :</h5>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Date creation :</h5>
                            <p>Date creation / Date namoronana an'le carte</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Date de modification :</h5>
                            <p>Date de odification / Date nanovana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Type maj :</h5>
                            <p>Type mise a jour :</p>
                        </div>
                    </div>
                    
                    <div className="info-item d-flex">
                        <div>
                            <h5>Nom pproprietaire :</h5>
                            <p>Nom du proprietaaire de la exercice / Anaran'le mpamorona an le izy</p>
                        </div>
                    </div> 

                    <div className="info-item d-flex">
                        <div>
                            <h5>Sigle :</h5>
                            <p>Sigle de l entreprisee  / Fanafoezana</p>
                        </div>
                    </div>   

                    <div className="info-item d-flex">
                        <div>
                            <h5>Commune exercice :</h5>
                            <p>Commune exacte de l exercice  / Kaominina mazava misy ilay toeram-piasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Code commune :</h5>
                            <p>Code d'identification d'une commune  / Laharana famantarana  Kaominina anakiray</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Adresse de l'exercice :</h5>
                            <p>Adresse exacte de l exercice  / Adiresy mazava an lay toeram-piasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Telephone de l'exercice :</h5>
                            <p>Telephone fixe de l'entreprise  / Lahanara tarobia azahoana ny entrepsise</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Boite postal :</h5>
                            <p>Boite postal de l'exercice  / laharana ny positaly misy an'lay entreprise</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Commune Domicile :</h5>
                            <p>Commune du proprietaire  / Kaominina misy anao tompon'ilay fiasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Telephone :</h5>
                            <p>Telephone du proprietaire  / laharan'ny finday azahoana anao tompon'ilay fiasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>N° CIN :</h5>
                            <p>Votre numero CIN / laharan'ny karapanondrom-pirenena anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>N° Cnaps :</h5>
                            <p>Votre numero C.N.A.P.S/ laharan'ny c.n.a.p.s anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>N° patente :</h5>
                            <p>Votre numero patente/ laharan'ny "patente" anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Forme j :</h5>
                            <p>Bref description de votre entreprise/ Ato no anazavanao bebe kokoa amin'ny alalan'ny teny vitsy momba an'lay "societe" anao  </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Comptabilite :</h5>
                            <p>service de comptable / Misy "comptable" ve ilay "Societe" anao ? </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Qualite :</h5>
                            <p>Qualite de votre "Societe"  / Kalitao an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>lchef :</h5>
                            <p>Direction de votre "Societe"  / Rafim-pitatanana an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Nationalité :</h5>
                            <p>Nationalite du dirigeant de votre "Societe"  / Fiavian'ny mpitantana an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Duplicata :</h5>
                            <p>Duplicata de votre carte statistique sinon  =  0   / "Duplicata" an'lay carte statistique  ! </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Fonds :</h5>
                            <p>Votre Fonds de depart  / mari_bola nanangananao an'ilay "Societe" </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5>Activité Principale :</h5>
                            <p>Votre Activite principal ?  / Momba ana inona ilay asa ataon'ny "societe" (Ohatra: Epicérie) </p>
                        </div>
                    </div>
                    <div className="info-item d-flex">
                        <div>
                            <h5>Activité Secondaire 1 :</h5>
                            <p>S'il xiste une autre activite que vous pratiquez ? si oui decrit le  / Mbola misy asa faharoa fanampiny ve ataonao ? raha eny de inona ilay izy  </p>
                        </div>
                    </div>

                    </div>

                </div>

                <div className="col-lg-8">
                    {/* Exercice */}
                    <span className="h6 mb-3">Exercice / le exercice ataonao<b className='text-danger'>◘</b> </span>
                    
                    <form onSubmit={handleSubmit} className="php-email-form">
                    <div className="row mt-3">
                        <div className="col-md-6 form-group">
                            <InputLabel>Numero Statistique</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder="Numero Statistique" 
                                name ="numstat" 
                                onChange={handleChange} 
                                value={values.numstat}
                                
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Votre identifiant</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                placeholder="Votre identifiant" 
                                name="ident" 
                                onChange={handleChange} 
                                value={values.ident}
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Libellé entreprise</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="N° Entreprise" 
                                name ="numentreprise" 
                                onChange={handleChange} 
                                value={values.numentreprise}
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Lien</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Lien" 
                                name="lien" 
                                onChange={handleChange} 
                                value={values.lien}
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                        <InputLabel>Date creation</InputLabel>
                        <TextField fullWidth 
                            type='date' 
                            className='form-control'
                            variant="outlined" 
                            placeholder="jj-mm-aaaa" 
                            name="datecreation" 
                            onChange={handleChange}  
                            value={values.datecreation}
                        />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                        <InputLabel>Date modification</InputLabel>
                        <TextField fullWidth 
                            type='date' 
                            className='form-control'
                            label="" 
                            variant="outlined" 
                            placeholder="jj-mm-aaaa" 
                            name="datemodification" 
                            onChange={handleChange} 
                            value={values.datemodification}
                        />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                        <FormControl fullWidth variant="outlined" className='mt-4'>
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
                            
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Nom du proprietaire de l'exercice</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nom proprietaire" 
                                name="nomproprietaire" 
                                onChange={handleChange} 
                                value={values.nomproprietaire}
                                required
                             />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Sigle</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Sigle" 
                                name="sigle" 
                                onChange={handleChange} 
                                value={values.sigle}
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Adresse exacte de l'Exercice</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Fokontany/Lot xxxx" 
                                name="adresseeexercice" 
                                onChange={handleChange} 
                                value={values.adresseeexercice}
                                required
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Commune exercice</InputLabel>
                                <Select label="Commune exercice" value={selectedCommune1} onChange={handleCommuneChange1} name='communeexercice'>
                                    {communes.map((commune, i) => (
                                    <MenuItem key={i} value={commune.nomcommune}>{commune.nomcommune}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Code commune</InputLabel>
                                <Select label="Code commune" value={selectedCommuneCode1} onChange={handleCommuneChange1} name='codecommuneexercice'disabled>
                                    <MenuItem value="">Sélectionner...</MenuItem>
                                    {communes.map((commune, i) => (
                                    <MenuItem key={i} value={commune.codecommune}>{commune.codecommune}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Telephone de l'exercice</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Numero telephone de l exercice" 
                                name="telephoneexercice" 
                                onChange={handleChange} 
                                value={values.telephoneexercice}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Boite postal de l'exercice</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder=" XXX " 
                                name="bpexercice" 
                                onChange={handleChange} 
                                value={values.bpexercice}
                                required 
                            />
                        </div>

                    </div>

                    {/* Domicile */}
                    <hr />
                    <span className="h6 mb-3">Domicile / Fonenana sy adiresy mazava <b className='text-danger'>◘</b> </span>
                    
                    <div className="row mt-3">
                        <div className="col-md-6 form-group">
                            <InputLabel>Adresse exacte du proprietaire</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Fokontany /Lot xxxx " 
                                name="domicilecli" 
                                onChange={handleChange} 
                                value={values.domicilecli}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Boite postal proprietaire</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="XXX" 
                                name="bpcli" 
                                onChange={handleChange} 
                                value={values.bpcli}
                                required 
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Commune</InputLabel>
                                <Select label="Commune Domicile" defaultValue="" name="communecli" value={selectedCommune2} onChange={handleCommuneChange2}>
                                {
                                    communes.map((commune, i) => (
                                    <MenuItem key={i} value={commune.nomcommune}>{commune.nomcommune}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Code commune</InputLabel>
                                <Select label="Code commune" defaultValue="" name="codecommunecli" value={selectedCommuneCode2} onChange={handleChange} disabled>
                                {
                                    communes.map((commune, i) => (
                                    <MenuItem key={i} value={commune.codecommune}>{commune.codecommune}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Votre numero telephone</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Telephone" 
                                name="telephonecli" 
                                value={values.telephonecli} 
                                onChange={handleChange}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Numero CIN </InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder=" XXX XXX XXX XXX" 
                                name="cincli" 
                                onChange={handleChange} 
                                value={values.cincli}
                                required 
                            />
                        </div>

                    </div>

                    
                    <div className="row">
                        <div className="col-md-6 form-group">
                             <InputLabel>Numero C.N.A.P.S</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="***********" 
                                name="cnaps" 
                                onChange={handleChange} 
                                value={values.cnaps}
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Numero patente</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="entrer ici" 
                                name="numpatente" 
                                onChange={handleChange} 
                                value={values.numpatente}
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Form j</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Form j" 
                                name="formj" 
                                onChange={handleChange} 
                                value={values.formj}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <FormControl fullWidth variant="outlined" className='mt-4'>
                                <InputLabel>Comptabilite</InputLabel>
                                <Select label="Comptabilite" defaultValue="" name="comptabilite" onChange={handleChange} value={values.comptabilite}>
                                    <MenuItem value="Non">Non</MenuItem>
                                    <MenuItem value="Oui">Oui</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Lchef</InputLabel>
                            <Select label="Lchef" defaultValue="" name="lchef" onChange={handleChange} value={values.lchef}>
                              <MenuItem value="P : Proprietaire">P : Proprietaire</MenuItem>
                              <MenuItem value="GL : Gerant Libre">GL : Gerant Libre</MenuItem>
                              <MenuItem value="GS : Gerant Salarié">GS : Gerant Salarié</MenuItem>
                              <MenuItem value="DS : Gerant Salarié : Directeur de Societe<">DS : Gerant Salarié : Directeur de Societe</MenuItem>
                              <MenuItem value="AS : Gerant Salarié : Agent de Societe">AS : Gerant Salarié : Agent de Societe</MenuItem>
                              <MenuItem value="CC : Gerant Salarié : Chef de Chantier">CC : Gerant Salarié : Chef de Chantier</MenuItem>
                              <MenuItem value="CC : Gerant Salarié : Autres">CC : Gerant Salarié : Autres</MenuItem>
                              <MenuItem value="A : Autre">A : Autre</MenuItem>
                              <MenuItem value="ND  : Non Declare">ND  : Non Declare</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
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
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                           <FormControl fullWidth variant="outlined">
                                <InputLabel>Nationalité</InputLabel>
                                <Select label="Nationalité" value={selectedNationalite} onChange={handleNationaliteChange} name="nationalitecli" >
                                {nationalites.map((nationalite, i) => (
                                    <MenuItem key={i} value={nationalite.nomnationalite}>{nationalite.nomnationalite}</MenuItem>
                                ))}
                                </Select>
                          </FormControl>

                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Code nationalité</InputLabel>
                                <Select label="Code nationalité" value={selectedNationaliteCode} name='codenationalitecli' onChange={handleChange} disabled>
                                {nationalites.map((nationalite, i) => (
                                    <MenuItem key={i} value={nationalite.codenationalite}>{nationalite.codenationalite}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Fonds</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Fonds en Ar" 
                                name="fonds" 
                                onChange={handleChange} 
                                value={values.fonds}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <InputLabel>Code region</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Code region" 
                                name="coderegion" 
                                onChange={handleChange} 
                                value={values.coderegion}
                                required
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <InputLabel>Code district</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Code district" 
                                name="codedistrict" 
                                onChange={handleChange} 
                                value={values.codedistrict}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group">
                            <InputLabel>Code cn</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Code cn" 
                                name="codecn" 
                                onChange={handleChange} 
                                value={values.codecn}
                                required
                             />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12 form-group">
                            <FormControl fullWidth variant="outlined">
                            <InputLabel>Qualite</InputLabel>
                            <Select label="qualite" defaultValue="" name="qualite" onChange={handleChange} value={values.qualite}>
                              <MenuItem value="0">0</MenuItem>
                              <MenuItem value="1">1</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                    </div>

                    {/* Activite */}
                    <hr />
                    <span className="h6">Activite / Momba an'lay asa ataonao<b className='text-danger'>◘</b> </span>
                    
                    <div className="row mt-3">
                        <div className="form-group">
                        <InputLabel>Activite principal</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Inona le asa ataonao ' 
                                name="principale" 
                                onChange={handleChange}  
                                value={values.principale}
                                required
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Activite secondaire 1</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Asa fanampiny faharoa raha misy' 
                                name="secondaire1" 
                                onChange={handleChange} 
                                value={values.secondaire1}
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Activite secondaire 1</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Asa fanampiny fahatelo raha misy' 
                                name="secondaire2" 
                                onChange={handleChange} 
                                value={values.secondaire2}
                             />
                        </div>
                    </div>

                    {/* Salarie */}
                    <hr />
                    <span className="h6">Salarié Malagasy / Mpiasa Malagasy<b className='text-danger'>◘</b> </span>
                    
                    <div className="row mt-3">
                        <div className="form-group">
                        <InputLabel>Total salarié Malagasy</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder=" isan ny mpiasa malagasy"
                                name="total_salarie_mlg" 
                                onChange={handleChange} 
                                value={values.total_salarie_mlg}
                                required
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Total Masculin</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Isan'ny mpiasa lehilahy" 
                                name="total_masculin" 
                                onChange={handleChange} 
                                value={values.total_masculin}
                                required
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Total feminin</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Isan'ny mpiasa vehivavy" 
                                name="total_feminin" 
                                onChange={handleChange} 
                                value={values.total_feminin}
                                required
                             />
                        </div>
                    </div>

                    {/* Salarie etranger */}
                    <hr />
                    <span className="h6">Salarié Etranger / Mpiasa Vahiny<b className='text-danger'>◘</b> </span>
                    
                    <div className="row mt-3">
                        <div className="form-group">
                        <InputLabel>Total salarié Etranger</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder=" isan ny mpiasa Vahiny"
                                name="total_salarie_etg"  
                                onChange={handleChange} 
                                value={values.total_salarie_etg}
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Total Masculin</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Isan'ny mpiasa vahiny lehilahy" 
                                name="total_masc" 
                                onChange={handleChange} 
                                value={values.total_masc}
                             />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                        <InputLabel>Total feminin</InputLabel>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Isan'ny mpiasa vahiny vehivavy" 
                                name="total_fem" 
                                onChange={handleChange} 
                                value={values.total_fem}
                             />
                        </div>
                    </div>

                    {/* <div className="form-group mt-3">
                        <InputLabel>Votre commentaire</InputLabel>
                        <textarea 
                        className="form-control" 
                        name="message" 
                        placeholder="Message ou commentaire s'il y en a  facultatif" 
                        required
                        />
                            
                    </div> */}

                    <div className="my-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center">
                        <button type="submit">Soumettre votre Réponse</button>
                    </div>
                    </form>
                </div>
                
                

                </div>

            </div>

            </section>
            

        </main>

        <footer id="footer" className="footer light-background">
            <div className="container">
            <div className="row g-4">
                <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">About Us</h3>
                    <p className="mb-4">
                    There live the blind texts. Separated they live in Bookmarksgrove
                    right at the coast of the Semantics, a large language ocean.
                    </p>
                    <p className="mb-0">
                    <a href="#" className="btn-learn-more">Learn more</a>
                    </p>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 ps-lg-5 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">Navigation</h3>
                    <ul className="list-unstyled float-start me-5">
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Find Buyers</a></li>
                    </ul>
                    <ul className="list-unstyled float-start">
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 pl-lg-5">
                <div className="widget">
                    <h3 className="widget-heading">Recent Posts</h3>
                    <ul className="list-unstyled footer-blog-entry">
                    <li>
                        <span className="d-block date">May 3, 2020</span>
                        <a href="#">There live the Blind Texts</a>
                    </li>
                    <li>
                        <span className="d-block date">May 3, 2020</span>
                        <a href="#">Separated they live in Bookmarksgrove right</a>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 pl-lg-5">
                <div className="widget">
                    <h3 className="widget-heading">Connect</h3>
                    <ul className="list-unstyled social-icons light mb-3">
                    <li>
                        <a href="#"><span className="bi bi-facebook"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-linkedin"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-google"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-google-play"></span></a>
                    </li>
                    </ul>
                </div>

                <div className="widget">
                    <div className="footer-subscribe">
                    <h3 className="widget-heading">Subscribe</h3>
                    <form action="forms/newsletter.php" method="post" className="php-email-form">
                        <div className="mb-2">
                        <input type="text" className="form-control" name="email" placeholder="Enter your email" />

                        <button type="submit" className="btn btn-link">
                            <span className="bi bi-arrow-right"></span>
                        </button>
                        </div>
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">
                        Your subscription request has been sent. Thank you!
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <div className="copyright d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <p>© <span>Copyright</span> <strong className="px-1 sitename">Active.</strong> <span>All Rights Reserved</span></p>
                <div className="credits">
                
                </div>
            </div>
            </div>
        </footer>

         {/* Large Popup Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Submission Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Votre réponse a été soumise avec succès !</h1>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>

    </div>
  )
}

export default FormAdd