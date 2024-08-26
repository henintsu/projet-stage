import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import '../Commune/Commune.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UpdateModalCommune from '../Modals/Commune/UpdateModalCommune';
import AddModalCommune from '../Modals/Commune/AddModalCommune.jsx';


function Commune() {

  const [values, setValues] = useState({
    CodeCommune: '',
    NomCommune: ''
  });

  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null); // State to store the selected personnel for updating
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control update modal visibility
  const { id } = useParams(); // Get id from URL parameters
  const [paramId, setParamId] = useState(null); // Renamed id to paramId to avoid confusion
  const [searchTerm, setSearchTerm] = useState('');




  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (id) {
      setParamId(id); 
    }
  }, [id]);

  const handleDelete = (id) => {
    axios.delete('http://localhost:4000/api/communedelete/' + id)
      .then(res => {
        getData(); // Actualiser les données après la suppression
      })
      .catch(err => console.log(err));
    setOpenDialog(false);
  }

  const getData = () => {
    axios.get('http://localhost:4000/api/commune')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  }

  const handleShowUpdateModal = (commune) => {
    setSelectedCommune(commune);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCommune(null);
    getData(); 
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    getData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getData();
    } else {
      axios.get(`http://localhost:4000/recherche/commune/${searchTerm}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }
  }

  return (
    <div>
      <div className="row">
          <div className="card mt-2 px-2">
            <div className="container mt-2 px-2 ">
              <div className="row ">
                <div className="col-md-6 col-sm-12">
                  <div className="title">
                      <h4>Lites des communes</h4>
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

                        <button className="btn btn-warning btn-xl" type='submit'>
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
                            <th>Code Commune</th>
                            <th>Commune</th>
                            <th>******Action******</th>
                          </tr>
                      </thead>
                      <tbody>
                        {data.map((commune) => (
                          <tr key={commune.id}>
                            <td className="d-none d-xl-table-cell">{commune.id}</td>
                            <td className="d-none d-xl-table-cell">{commune.codecommune}</td>
                            <td className="d-none d-xl-table-cell">{commune.nomcommune}</td>
                            <td>
                              <button onClick={() => handleShowUpdateModal(commune)} className='bi-pencil-square btn btn-sm btn-secondary me-2'></button>
                              <button onClick={() => handleOpenDialog(commune.id)} className='bi-trash btn btn-sm btn-danger me-2'></button>
                            </td>
                          </tr>
                        ))}                                 
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>

      {showAddModal && <AddModalCommune handleClose={handleCloseAddModal} />}
      {showUpdateModal && <UpdateModalCommune commune={selectedCommune} handleClose={handleCloseUpdateModal}  postId={paramId} />}

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

export default Commune
      