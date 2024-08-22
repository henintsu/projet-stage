import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import '../Nationalite/Nationalite.css';
import axios from 'axios';
import AddModalNation from '../Modals/Nationalite/AddModalNation';
import UpdateModalNation from '../Modals/Nationalite/UpdateModalNation';
import { Link } from 'react-router-dom';

function Nationalite() {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedNationalite, setSelectedNationalite] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);



  useEffect(() => {
    getData();
  }, []);

  const handleDelete = () => {
    axios.delete('http://localhost:4000/api/nationalitedelete/' + selectedId)
      .then(res => {
        getData();
      })
      .catch(err => console.log(err));
    setOpenDialog(false);
    setSelectedId(null);
  };

  const getData = () => {
    axios.get('http://localhost:4000/api/nationalite')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    getData();
  };

  const handleShowUpdateModal = (nationalite) => {
    setSelectedNationalite(nationalite);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedNationalite(null);
    getData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getData();
    } else {
      axios.get(`http://localhost:4000/api/recherche/nationalite/${searchTerm}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }
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
    <div className=''>
       <div className="row">
          <div className="card mt-2 px-2">
            <div className="container mt-2 ">
              <div className="row ">
                <div className="col-md-6 col-sm-12">
                  <div className="title">
                      <h4>Lites des Nationalité</h4>
                  </div>
                    <nav aria-label="breadcrumb" role="navigation">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                          <li className="breadcrumb-item " aria-current="page">
                            <Link onClick={handleShowAddModal} variant="contained"  type='submit'>Ajouter</Link>
                          </li>
                        </ol>
                    </nav>
                  </div>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-lg-12 col-xxl-9 d-flex mt-1">
            <div class="card flex-fill">
                <div class="card-header d-flex justify-content-between">

                    <h5 class="card-title mb-0"></h5>

                    <div className="mb-0">
                      <form className="d-flex me-auto" onSubmit={handleSearch}>
                        <input className="form-control me-2 pr-10" 
                          type="search" 
                          placeholder="recherche" 
                          aria-label="Search" 
                          name='recherche' 
                          onChange={(e) => setSearchTerm(e.target.value)} 
                          value={searchTerm}/>

                        <button className="btn btn-outline-secondary btn-sm" type='submit'>
                          <i className='bi bi-search'></i>
                        </button>
                      </form>
                    </div>

                </div>
                <div className="table-wrapper-commune">
                  <div className="table-responsive"></div>
                    <table class="table table-hover my-0">
                      <thead>
                          <tr>
                            <th>Identifiant</th>
                            <th>Code_nationalite</th>
                            <th>Nom_Nationalite</th>
                            <th>******Action******</th>
                          </tr>
                      </thead>
                      <tbody>
                        {data.map((nationalite) => (
                          <tr key={nationalite.id}>
                            <td className="d-none d-xl-table-cell">{nationalite.id}</td>
                            <td className="d-none d-xl-table-cell">{nationalite.codenationalite}</td>
                            <td className="d-none d-xl-table-cell">{nationalite.nomnationalite}</td>
                            <td>
                              <button onClick={() => handleShowUpdateModal(nationalite)} className='bi-pencil-square btn btn-sm btn-secondary me-2'></button>
                              <button onClick={() => handleOpenDialog(nationalite.id)} className='bi-trash btn btn-sm btn-danger me-2'></button>
                            </td>
                          </tr>
                        ))}                                 
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>

          {showAddModal && <AddModalNation handleClose={handleCloseAddModal} />}
          {showUpdateModal && <UpdateModalNation nationalite={selectedNationalite} handleClose={handleCloseUpdateModal} />}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                Êtes-vous sûr de vouloir supprimer cet enregistrement ?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                <Button onClick={handleDelete} autoFocus>Oui</Button>
              </DialogActions>
          </Dialog>
    </div>
  );
}

export default Nationalite;