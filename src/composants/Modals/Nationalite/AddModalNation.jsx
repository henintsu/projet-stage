import React from 'react'
import { useState } from 'react';
import { Box , Grid, TextField, Button} from '@mui/material';
import './Style.css'
import axios from 'axios';

function AddModalNation({ handleClose }) {
    const [values, setValues] = useState({
        codenationalite: '',
        nomnationalite: ''
      });
    

      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4000/api/nationalite', values)
          .then(res => {
            handleClose()
            })
          .catch(err => console.log(err));
      };


  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)' ,zIndex:'1000000000' }}>
            <div className="modal-dialog" role="document" style={{ maxWidth: '60%' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Ajout Nationalite</h3>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} >
                            {/* <h5 className="card-title">Ajout Nationalite</h5><br /> */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Code Nationalite"
                                        variant="outlined"
                                        placeholder="A saisir"
                                        name='codenationalite'
                                        value={values.codenationalite}
                                        onChange={(e) => setValues({ ...values, codenationalite: e.target.value })}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                    <TextField
                                        fullWidth
                                        label="nationalite"
                                        variant="outlined"
                                        placeholder="A saisir"
                                        name='nomnationalite'
                                        value={values.nomnationalite}
                                        onChange={(e) => setValues({ ...values, nomnationalite: e.target.value })}
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
  )
}

export default AddModalNation