import React, { useState, useEffect } from 'react'
import validationLog from './main';
import axios from "axios";
import '../Dashboard/css/Style.css'
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert



function Login() {
	const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false); // State for the dialog
    const [dialogMessage, setDialogMessage] = useState(""); // State for the dialog message
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for the Snackbar

    const navigate = useNavigate();

    useEffect(() => {
        setErrorMessage(validationLog(values));
    }, [values]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
	const handleSubmit = (event) => {
		event.preventDefault();
	
		const validationErrors = validationLog(values);
		setErrorMessage(validationErrors);
	
		if (validationErrors.email === "" && validationErrors.password === "") {
			axios.post('http://localhost:4000/api/login', values)
			.then(res => {
				if (res.data === "Success") {
					setOpenSnackbar(true); // Open the Snackbar
					setTimeout(() => {
						setOpenSnackbar(false);
						navigate('/Dashboard');
					}, 2000); // Close the Snackbar after 1 second and navigate to Dashboard
				} else {
					setDialogMessage("Cet utilisateur n'existe pas, vérifiez votre email ou mot de passe !");
					setOpenDialog(true);
				}
			})
			.catch(err => {
				if (err.response && err.response.status === 404) {
					setDialogMessage("Utilisateur non trouvé, vérifiez vos informations !");
					setOpenDialog(true);
				} else {
					console.log("Error in axios request", err);
				}
			});
		}
	};
	

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

	const handleCancel = () => {
		navigate("/")
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
  return (
    <div>
<main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Bienvenue sur ce page!</h1>
							<p className="lead">
								Connecte en tant que administrateur
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-3">
									<form onSubmit={handleSubmit}>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input 
												className="form-control" 
												type="email"
												name="email" 
												id="email" 
												placeholder="name@example.com" 
												value={values.email} 
												onChange={handleInputChange} 
												required 
											 />
											<br />
											<div className="col-12">
												{errorMessage.email && <div className="alert alert-danger">{errorMessage.email}</div>}
											</div>
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input 
												className="form-control" 
												type="password"
												name="password" 
												placeholder="Entrer votre password" 
												id="password" 
												value={values.password} 
												onChange={handleInputChange} 
												required 
											/>
											<br />
											<div className="col-12">
												{errorMessage.password && <div className="alert alert-danger">{errorMessage.password}</div>}
											</div>
										</div>
										<div>
											<div className="form-check align-items-center">
												<input id="customControlInline" type="checkbox" className="form-check-input" value="remember-me" name="remember-me" checked />
												<label className="form-check-label text-small" for="customControlInline">se souvenir de moi me</label>
											</div>
										</div>
										<div className="d-grid gap-2 mt-3">
											<button type='submit' className="btn btn-primary">Connexion</button>
											<button type="button" className="btn btn-secondary mt-2" onClick={handleCancel} > Annuler </button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="text-center mb-3">
							Don't have an account? <a href="pages-sign-up.html">S 'inscrire</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
			{/* Dialog Component */}
			<Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Erreur de Connexion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Snackbar Component */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position it in the center at the top
                sx={{ 
                    '& .MuiSnackbarContent-root': { // Target the Snackbar content
                        backgroundColor: '#4caf50', // Optional: Adjust background color
                        fontSize: '1.5rem', // Increase font size
                        textAlign: 'center', // Center the text
                        width: 'fit-content', // Adjust width to fit content
                        padding: '16px 24px' // Add some padding
                    }
                }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Bienvenue !
                </Alert>
            </Snackbar>
    </div>
  )
}

export default Login