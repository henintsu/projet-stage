import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Dialog } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddModalCommune({ handleClose }) {
  const [values, setValues] = useState({
    codecommune: '',
    nomcommune: ''
  });

  const Clearform = () => {
    setValues({
      codecommune: '',
      nomcommune: ''
  });

  }

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/commune', values)
      .then(res => {
        Clearform()
      })
      .catch(err => console.log(err));
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  return (
    
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: '1000000000' }}>
      <div className="modal-dialog" role="document" style={{ maxWidth: '60%' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Ajout Commune</h3>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Code Commune"
                    variant="outlined"
                    placeholder="A saisir"
                    name='codecommune'
                    value={values.codecommune}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    label="Commune"
                    variant="outlined"
                    placeholder="A saisir"
                    name='nomcommune'
                    value={values.nomcommune}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button variant="contained" color="error" onClick={handleClose} className='btn_annuler' >Annuler</Button>
                    <Button variant="contained" color="primary" type='submit'>Ajouter</Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModalCommune;
