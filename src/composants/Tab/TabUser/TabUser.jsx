import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "../../Tab/TabUser/Style.css"


function TabUser() {
    
    useEffect(() => {
        getData() ;
      })
    
      // Simuler des interactions récentes
      const [data, setData] = useState([]); 
      const [openDialog, setOpenDialog] = useState(false);
      const [deleteId, setDeleteId] = useState(null);
      const { id } = useParams(); // Get id from URL parameters
      const [paramId, setParamId] = useState(null); // Renamed id to paramId to avoid confusion
    
      const getData = () => {
        axios.get('http://localhost:4000/api/temporaire')
          .then(res => setData(res.data))
          .catch(err => console.log(err));
      };
      
    useEffect(() => {
        if (id) {
        setParamId(id); 
        }
    }, [id]);
    
    const handleDelete = (id) => {
        axios.delete('http://localhost:4000/api/temporairedelete/' + id)
        .then(res => {
            getData(); // Actualiser les données après la suppression
        })
        .catch(err => console.log(err));
        setOpenDialog(false);
    }

    const handleOpenDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    }
    
  return (
    <div className='TabUser'>
        <div class="col-12 col-lg-12 col-xxl-9 d-flex">
            <div class="card flex-fill">
                <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title mb-0"></h5>
                    <div className='mb-0'>
                        <form className="d-flex me-auto">
                            <input 
                                className="form-control me-1 pl-5" 
                                type="search" 
                                placeholder="recherche" 
                                aria-label="Search" 
                                name='recherche' 
                                />

                            <button className="btn btn-primary btn-xs" type='submit'>
                                <i className='bi bi-search'></i>
                            </button>
                        </form>
                    </div>
                    
                </div>

                <div className="table-wrapper-temporaire">
                <div className="table-responsive">
                <table class="table table-hover table-responsive-sm table-bordered my-0 ">
                    <thead>
                        <tr className='table-active '>
                            <th>Id</th>
                            <th>Identification</th>
                            <th>Numero stat</th>
                            <th>Numero entreprise</th>
                            <th>Lien</th>
                            <th>Date creation</th>
                            <th>Date modification</th>
                            <th>Type maj</th>
                            <th>Nom proprietaire</th>
                            <th>Sigle</th>
                            <th>Adresse exercice</th>
                            <th>Commune exercice</th>
                            <th>Code Commune exercice</th>
                            <th>Telephone exercice</th>
                            <th>Bp exercice</th>
                            <th>Adresse </th>
                            <th>Commune </th>
                            <th>Code Commune </th>
                            <th>Telephone</th>
                            <th>Boite postal</th>
                            <th>Nationalite</th>
                            <th>Code Nationalite</th>
                            <th>Activite Principale</th>
                            <th>Activite Secondaire1</th>
                            <th>Activite Secondaire2</th>
                            <th>Total salarie mlagasy</th>
                            <th>Total masculin</th>
                            <th>Total feminin</th>
                            <th>Total salarie etranger</th>
                            <th>Total masculin</th>
                            <th>Total feminin</th>
                            <th>Image</th>
                            <th>Numero CIN</th>
                            <th>Cnaps</th>
                            <th>Numero patente</th>
                            <th>Form j</th>
                            <th>Code Form j</th>
                            <th>Comptabilite</th>
                            <th>Lchef</th>
                            <th>Qualite</th>
                            <th>Duplicata</th>
                            <th>Fonds</th>
                            <th>Code Region</th>
                            <th>Code District</th>
                            <th>Code cn</th>
                            <th>******Action******</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((temporaire) => (
                            <tr key={temporaire.id}>
                            <td className="d-none d-xl-table-cell">{temporaire.id}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.ident}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.numstat}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.numentreprise}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.lien}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.datecreation}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.datemodification}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.typemaj}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.nomproprietaire}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.sigle}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.adresseexercice}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.communeexercice}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codecommuneexercice}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.telephoneexercice}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.bpexercice}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.domicilecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.communecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codecommunecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.telephonecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.bpcli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.nationalitecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codenationalitecli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.principale}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.secondaire1}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.secondaire2}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_salarie_mlg}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_masculin}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_feminin}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_salarie_etg}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_masc}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.total_fem}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.image}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.cincli}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.cnaps}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.numpatente}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.formj}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codeformj}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.comptabilite}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.lchef}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.qualite}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.duplicata}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.fonds}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.coderegion}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codedistrict}</td>
                            <td className="d-none d-xl-table-cell">{temporaire.codecn}</td>
                            <td>
                                <Link to={`/DashFormEdit/${temporaire.id}`} className='bi-pencil-square btn btn-sm btn-secondary me-2'></Link>
                                <button onClick={() => handleOpenDialog(temporaire.id)}  className='bi-trash btn btn-sm btn-danger me-2'>
                                    {/* <i className="bi bi-pci-card align-middle" data-feather="align-left"></i> */}
                                </button>
                            </td>
                            </tr>
                        ))}                                
                    </tbody>
                </table>
                </div>
                </div>
            </div>
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              Êtes-vous sûr de vouloir supprimer cet enregistrement ?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Annuler</Button>
              <Button onClick={() => handleDelete(deleteId)} autoFocus>Oui</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default TabUser