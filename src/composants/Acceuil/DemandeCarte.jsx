import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Styles/StyleAcceuil.css"
import { Modal } from 'react-bootstrap';
import {Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material'


function DemandeCarte() {

    
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
        numpatente: '',
        formj: '',
        codeformj: '',
        comptabilite: '',
        Lchef: '',
        qualite: '',
        duplicata: '',
        fonds: '',
        coderegion: '',
        codedistrict: '',
        district: '' ,
        commentaire : '' ,
        daterendezvous :'',
        heurerendezvous :'',
        paymentmethod : '' ,
        justification : ''
      });

      const Clearform = () => {
        setValues({
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
            numPatente: '',
            formj: '',
            codeformJ: '',
            comptabilite: '',
            lchef: '',
            qualite: '',
            duplicata: '',
            fonds: '',
            coderegion: '',
            codedistrict: '',
            district: '' ,
            commentaire : '' ,
            daterendezvous :'',
            heurerendezvous :'',
            paymentmethod : '' ,
            justification : ''
      })
    };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Champ ${name} : ${value}`);
        setValues({ ...values, [name]: value });
      };

      const [form, setForm] = useState([]);
    
      const [communes, setCommunes] = useState([]);
      const [nationalites, setNationalites] = useState([]);
      const [districts, setDistricts] = useState([]);
    
      const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    
      const [selectedCommune1, setSelectedCommune1] = useState('');
      const [selectedCommuneCode1, setSelectedCommuneCode1] = useState('');
    
      const [selectedCommune2, setSelectedCommune2] = useState('');
      const [selectedCommuneCode2, setSelectedCommuneCode2] = useState('');
    
      const [selectedNationalite, setSelectedNationalite] = useState('');
      const [selectedNationaliteCode, setSelectedNationaliteCode] = useState('');

      const [selectedOption, setSelectedOption] = useState(''); // Stocke le choix de l'utilisateur

    
      useEffect(() => {
        getCommune();
        getNationalite();
        getFormj();
        getDistrict();
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

      const getDistrict = () => {
        axios.get('http://localhost:4000/api/get/district')
        .then(res => setForm(res.data))
        .catch(err => console.log(err));
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
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:4000/api/temporaire', values)
        .then(res => {
          setShowModal(true);
          Clearform();
  
          setTimeout(() => {
            setShowModal(false);
          }, 2000)
        })
        .catch(err => console.log(err));
    };

      // Fonction pour gérer le changement de sélection de l'utilisateur
      const handleOptionChange = (event) => {
        const { name, value } = event.target;
        console.log(`Champ ${name} : ${value}`);
        setValues({ ...values, [name]: value });
      
        setSelectedOption(value);
      };
      

  return (
    <div>
         <header className="header" id="header">
            <nav className="nav container">
                <a href="#" className="nav__logo text-decoration-none">AdminKit</a>

                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link ">Acceuil</a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link ">A propos</a>
                        </li>
                        <li className="nav__item">
                            <a href="#discover" className="nav__link ">Decouvrir</a>
                        </li>
                        <li className="nav__item">
                            <a href="#place" className="nav__link ">Places</a>
                        </li>

                    </ul>

                    <div className="nav__dark">
                        {/* <!-- Theme change button --> */}
                        <span className="change-theme-name">Dark mode</span>
                        <i className="ri-moon-line change-theme" id="theme-button"></i>
                    </div>

                    <i className="ri-close-line nav__close" id="nav-close"></i>
                </div>

                <div className="nav__toggle" id="nav-toggle">
                    <i className="ri-function-line"></i>
                </div>
                
            </nav>
        </header>

        {/* <!--==================== DEMANDE DE CARTE STATISTIQUE ====================--> */}
        <section className="about section contact" id="about">
                <div className="about__container container grid">
                    <div className="about__data">
                        <h2 className="section__title about__title">COMPLETER CES iNFORMATIONS POUR AVOIR VOTRE CARTE STATISTIQUE </h2>
                        <p className="about__description">
                            
                        </p>
                        <Link to="/" className="button text-decoration-none">acceuil</Link>
                    </div>

                    <div className="about__img">
                        <div className="about__img-overlay">
                            <img  alt="" className="about__img-one" />
                        </div>

                        <div className="about__img-overlay">
                            <img  alt="" className="about__img-two" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact section">

            <div className="container" data-aos="fade">

                <div className="row gy-5 gx-lg-5">

                <div className="col-lg-4 text-muted">

                    <div className="info">
                        <h3>Aide</h3>
                        <p>Ceci est ici dans le but de vous aider avec les information dans le formulaire.</p>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Numero statistique :</h5>
                            <p className="mb-5">Votre numero statistique / Laharana statistika anao</p>
                        </div>
                    </div>                

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Identification :</h5>
                            <p className="mb-5">Votre numero d'identification / laharana manokana anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Lien :</h5>
                            <p className="mb-5"> 0 : si vous demandez une carte statistique ; 1 : si vous demandez une autre carte statistique / 0 : raha hanamboatra "carte statistique" iray ihany ; 1 : kosa indray raha hanamboatra "carte satistique" fanampiny </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Date creation :</h5>
                            <p className="mb-5">Date creation / Date namoronana an'le carte</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Date de modification :</h5>
                            <p className="mb-5">Date de odification / Date nanovana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Type maj :</h5>
                            <p className="mb-5">Type mise a jour :</p>
                        </div>
                    </div>
                    
                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Nom pproprietaire :</h5>
                            <p className="mb-5">Nom du proprietaaire de la exercice / Anaran'le mpamorona an le izy</p>
                        </div>
                    </div> 

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Sigle :</h5>
                            <p className="mb-5">Sigle de l'entreprisee  / Fanafoezana</p>
                        </div>
                    </div>   

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Commune exercice :</h5>
                            <p className="mb-5">Commune exacte de l exercice  / Kaominina mazava misy ilay toeram-piasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Code commune :</h5>
                            <p className="mb-5">Code d'identification d'une commune  / Laharana famantarana  Kaominina anakiray</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Adresse de l'exercice :</h5>
                            <p className="mb-5">Adresse exacte de l exercice  / Adiresy mazava an lay toeram-piasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Telephone de l'exercice :</h5>
                            <p className="mb-5">Telephone fixe de l'entreprise  / Lahanara tarobia azahoana ny entrepsise</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Boite postal :</h5>
                            <p className="mb-5">Boite postal de l'exercice  / laharana ny positaly misy an'lay entreprise</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Commune Domicile :</h5>
                            <p className="mb-5">Commune du proprietaire  / Kaominina misy anao tompon'ilay fiasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Telephone :</h5>
                            <p className="mb-5">Telephone du proprietaire  / laharan'ny finday azahoana anao tompon'ilay fiasana</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>N° CIN :</h5>
                            <p className="mb-5">Votre numero CIN / laharan'ny karapanondrom-pirenena anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>N° Cnaps :</h5>
                            <p className="mb-5">Votre numero C.N.A.P.S/ laharan'ny c.n.a.p.s anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>N° patente :</h5>
                            <p className="mb-5">Votre numero patente/ laharan'ny "patente" anao</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Forme juridique :</h5>
                            <p className="mb-5">Bref description de votre entreprise/ Ato no anazavanao bebe kokoa amin'ny alalan'ny teny vitsy momba an'lay "societe" anao  </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Comptabilite :</h5>
                            <p className="mb-5">service de comptable / Misy "comptable" ve ilay "Societe" anao ? </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Qualite :</h5>
                            <p className="mb-5">Qualite de votre "Societe"  / Kalitao an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>lchef :</h5>
                            <p className="mb-5">Direction de votre "Societe"  / Rafim-pitatanana an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Nationalité :</h5>
                            <p className="mb-5">Nationalite du dirigeant de votre "Societe"  / Fiavian'ny mpitantana an'ilay "Societe" anao !</p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Duplicata :</h5>
                            <p className="mb-5">Duplicata de votre carte statistique sinon  =  0   / "Duplicata" an'lay carte statistique  ! </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Fonds :</h5>
                            <p className="mb-5">Votre Fonds de depart  / mari_bola nanangananao an'ilay "Societe" </p>
                        </div>
                    </div>

                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Activité Principale :</h5>
                            <p className="mb-5">Votre Activite principal ?  / Momba ana inona ilay asa ataon'ny "societe" (Ohatra: Epicérie) </p>
                        </div>
                    </div>
                    <div className="info-item d-flex">
                        <div>
                            <h5><b className='text-danger'>* </b>Activité Secondaire 1 :</h5>
                            <p className="mb-5">S'il xiste une autre activite que vous pratiquez ? si oui decrit le  / Mbola misy asa faharoa fanampiny ve ataonao ? raha eny de inona ilay izy  </p>
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
                            <InputLabel>Numero statistique</InputLabel>
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

                    </div>

                    <div className="row">                        

                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <FormControl fullWidth variant="outlined" className='mt-4'>
                                <InputLabel>Lien</InputLabel>
                                <Select label="Comptabilite" defaultValue="" name="lien" onChange={handleChange} value={values.lien}>
                                    <MenuItem value="0">0</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-6 form-group">
                        <FormControl fullWidth variant="outlined" className='mt-4' >
                          <InputLabel>Type de mise a jour</InputLabel>
                          <Select label="Type de mise a jour" defaultValue="Creation" name="typemaj" onChange={handleChange} value={values.typemaj}>
                            <MenuItem value="Creation">Creation</MenuItem>
                            <MenuItem value="Modification">Modification</MenuItem>
                            <MenuItem value="Abandon">Abandon</MenuItem>
                            <MenuItem value="Réprise">Réprise</MenuItem>
                            <MenuItem value="Mutation">Mutation</MenuItem>
                            <MenuItem value="Réenregistrement">Réenregistrement</MenuItem>
                          </Select>
                        </FormControl>
                            
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group px-2">
                        <InputLabel>Date creation</InputLabel>
                        <input 
                            type='date' 
                            className='form-control'
                            placeholder="jj-mm-aaaa" 
                            name="datecreation" 
                            onChange={handleChange}  
                            value={values.datecreation}
                        />
                        </div>

                        <div className="col-md-6 form-group">
                        <InputLabel>Date de mise a jour</InputLabel>
                        <input 
                            type='date' 
                            className='form-control'
                            placeholder="jj-mm-aaaa" 
                            name="datemodification" 
                            onChange={handleChange} 
                            value={values.datemodification}
                        />
                        </div>

                    </div>

                    <div className="row">
                        
                        <div className="col-md-12 form-group mt-3 mt-md-0">
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
                                name="adresseexercice" 
                                onChange={handleChange} 
                                value={values.adresseexercice}
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
                                <InputLabel>Code </InputLabel>
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
                                <InputLabel>Code </InputLabel>
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
                        <div className="col-md-6 form-group mt-4">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Forme juridique</InputLabel>
                                    <Select label="Forme juridique" name='formj'onChange={handleChange} value={values.formj} >
                                    {
                                        form.map((formj, i) => (
                                            <MenuItem key={i} value={formj.formjuridique}>{formj.formjuridique}</MenuItem>
                                        ))
                                    }
                                    </Select>
                            </FormControl>
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
                                <InputLabel>Code </InputLabel>
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

                        <div className="col-md-6 form-group mt-3">
                            <FormControl fullWidth variant="outlined">
                            <InputLabel>Qualite</InputLabel>
                            <Select label="qualite" defaultValue="" name="qualite" onChange={handleChange} value={values.qualite}>
                              <MenuItem value="0">0</MenuItem>
                              <MenuItem value="1">1</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                    </div>

                     {/* district et region */}
                     <hr />
                    <span className="h6">Coordonné utile<b className='text-danger'>◘</b> </span>
                        <div className="row mt-3">
                            <div className="col-md-12 form-group">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>District</InputLabel>
                                        <Select label="Forme juridique" name='district' onChange={handleChange} value={values.district} >
                                            {
                                                form.map((district, i) => (
                                                    <MenuItem key={i} value={district.nom}>{district.nom}</MenuItem>
                                                ))
                                            }
                                         </Select>
                                </FormControl>
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

                    {/* Salarie etranger */}
                    <hr />
                    <span className="h6">Autres informations<b className='text-danger'>◘</b> </span>
                    
                    <div className="row mt-3">
                        <div className="col-md-6 form-group">
                            <InputLabel>Date rendez-vous</InputLabel>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="daterendezvous" 
                                onChange={handleChange} 
                                value={values.daterendezvous}
                                required
                             />
                        </div>

                        <div className="col-md-6 form-group">
                            <InputLabel>Heure rendez-vous</InputLabel>
                            <input 
                                type="time" 
                                className="form-control" 
                                name="heurerendezvous" 
                                onChange={handleChange} 
                                value={values.heurerendezvous}
                                required
                             />
                        </div>

                    </div>

                    <div className="container mt-3">
                        {/* Boutons radio stylisés pour sélectionner le type de paiement */}
                        <div className="form-group">
                        <select
                            className="form-control"
                            value={values.paymentmethod}
                            onChange={handleOptionChange}
                            name='paymentMethod'
                        >
                            <option value="" disabled>Sélectionnez un mode de paiement</option>
                            <option value="mvola">Par Mvola</option>
                            <option value="recuBancaire">Reçu bancaire</option>
                        </select>
                    </div>


                        {/* Affichage de la div pour Mvola si l'utilisateur choisit l'option Mvola */}
                        {selectedOption === 'mvola' && (
                            <div className="row mt-3">
                                <div className="col-md-6 form-group">
                                    <label>Numéro d'identification Mvola</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="justification"
                                    onChange={handleChange} 
                                    value={values.justification}
                                    placeholder="Entrez le numéro d'identification Mvola"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Affichage de la div pour Reçu bancaire si l'utilisateur choisit cette option */}
                        {selectedOption === 'recuBancaire' && (
                            <div className="row mt-3">
                                <div className="col-md-6 form-group">
                                    <label>Numéro de reçu bancaire</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="justification"
                                    onChange={handleChange} 
                                    value={values.justification}
                                    placeholder="Entrez le numéro de reçu bancaire"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group mt-3">
                        <InputLabel>Votre commentaire</InputLabel>
                        <textarea 
                        className="form-control" 
                        name="commentaire" 
                        placeholder="Message ou commentaire s'il y en a  facultatif" 
                        onChange={handleChange}
                        value={values.commentaire}
                        required
                        />
                            
                    </div>

                    <div className="my-3 fade">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className='button text-decoration-none'>Soumettre votre Réponse</button>
                    </div>
                    </form>
                </div>
            </div>
            </div>

            </section>

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
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default DemandeCarte