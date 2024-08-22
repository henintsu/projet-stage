import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, TextField, Button } from '@mui/material';
import './Style.css';

function UpdateModalNation({ nationalite, handleClose }) {
  const [values, setValues] = useState({
    codenationalite: '',
    nomnationalite: ''
  });

  useEffect(() => {
    if (nationalite) {
      setValues(nationalite);
    }
  }, [nationalite]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/api/NationaliteEdit/${nationalite.id}`, values);
      console.log(res.data);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: '1000000000' }}>
        <div className="modal-dialog" role="document" style={{ maxWidth: '60%' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Modification Nationalité</h3>
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Code Nationalité"
                      variant="outlined"
                      placeholder="A saisir"
                      name="codenationalite"
                      value={values.codenationalite}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      label="Nationalité"
                      variant="outlined"
                      placeholder="A saisir"
                      name="nomnationalite"
                      value={values.nomnationalite}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                      <Button variant="contained" color="error" onClick={handleClose} className='btn_annuler' >Annuler</Button>
                      <Button variant="contained" color="primary" type="submit">Modifier</Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModalNation;
