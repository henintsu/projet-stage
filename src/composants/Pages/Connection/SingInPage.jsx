import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Alert, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useAuth} from '../Connection/provider'


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  // const [alertTimeout, setAlertTimeout] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.email === '' || values.password === '') {
        setAlert({ show: true, severity: 'error', message: 'Veuillez remplir tous les champs.' });
        return;
    }

    axios.post('http://localhost:4000/api/login', values)
        .then(res => {
            if (res.data === "Success") {
                setAlert({ show: true, severity: 'success', message: 'Connexion réussie !' });

                // Connexion réussie : mise à jour de l'état et redirection après 2 secondes
                setTimeout(() => {
                    login(); // Mise à jour de l'état d'authentification
                    navigate('/dashboard-page');
                }, 2000);
            } else {
                setAlert({ show: true, severity: 'warning', message: 'Mauvais email ou mot de passe.' });
            }
        })
        .catch(() => {
            setAlert({ show: true, severity: 'error', message: 'Erreur lors de la connexion.' });
        });
  };


      // Pour l'alerte d'erreur, ajouter le timer
      useEffect(() => {
        if (alert.show && alert.severity === 'error') {
          const timer = setTimeout(() => {
            setAlert({ show: false, severity: '', message: '' });
          }, 2000);
          return () => clearTimeout(timer); // Nettoie le timer si l'alerte disparaît avant
        }
      }, [alert]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleClickOpen = (e) => {
    e.preventDefault()
    navigate('/forgotpassword-page')
  };

  const handleBack = () => {
    navigate('/loading-retour')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
  <div style={{ width: '100%', maxWidth: '450px' }}>
    {/* Alarme en haut de la carte */}
    {alert.show && (
      <Stack sx={{ width: '100%',maxWidth: '450px', position: 'fixed', top: '40px', zIndex: 1000 }} spacing={2}>
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Stack>
    )}
    {/* Carte fixée */}
    <Card
      variant="outlined"
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 4,
        zIndex: 999,
        width: '100%',
        maxWidth: '450px',
      }}
    >
      <Typography component="h1" variant="h4">
        Connexion
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={values.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Mot de passe oublié ?
            </Link>
          </Box>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            value={values.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Se souvenir de moi"
        />
        <Button type="submit" fullWidth variant="contained">
          Connexion
        </Button>
      </Box>
      <Divider>ou</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button type="submit" fullWidth variant="outlined" onClick={handleBack}>
            Retour
          </Button>
      </Box>
    </Card>
  </div>
</div>

  );
}
