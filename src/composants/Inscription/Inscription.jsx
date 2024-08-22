import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Dashboard/css/Style.css'


function Inscription() {
	const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Le nom est requis';
        }
        if (!values.email) {
            errors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'L\'email est invalide';
        }
        if (!values.password) {
            errors.password = 'Le mot de passe est requis';
        } else if (values.password.length < 6) {
            errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
		// Create new user
		axios.post('http://localhost:4000/api/users', values)
			.then(res => {
				clearForm();
				navigate("/Dashboard")
			})
			.catch(err => console.log(err));
	}

	const handleCancel = () => {
        clearForm(); // Clear the form fields
		navigate("/Dashboard")
    };

    const clearForm = () => {
        setValues({
            name: '',
            email: '',
            password: ''
        });
    };


  return (
    <div>
	<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Get started</h1>
							<p class="lead">
								Start creating the best possible user experience for you customers.
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form onSubmit={handleSubmit}>
										<div class="mb-3">
											<label class="form-label">nom complet</label>
											<input 
												class="form-control"
												type="text" 
												name="name" 
												id="name"
												placeholder="Entrer votre nom"
												value={values.name}
												onChange={handleInput}
												required
											/>

											{errors.name && <span className="text-danger">{errors.name}</span>}

										</div>

										<div class="mb-3">
											<label class="form-label">Email</label>
											<input 
												class="form-control" 
												type="email" 
												name="email" 
												id="email"
												placeholder="name@example.com"
												value={values.email}
												onChange={handleInput}
												required
											/>

											{errors.email && <span className="text-danger">{errors.email}</span>}

										</div>

										<div class="mb-3">
											<label class="form-label">Password</label>
											<input 
												class="form-control" 
												type="password" 
												name="password" 
												id="password"
												placeholder="Entrer votre mot de passe"
												value={values.password}
												onChange={handleInput}
												required
											/>
										</div>
										<div class="d-grid gap-2 mt-3">
											<button type='submit' class="btn btn-primary">Inscription</button>
											<button type="button" className="btn btn-secondary mt-2" onClick={handleCancel} > Annuler </button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="text-center mb-3">
							Already have account? <a href="pages-sign-in.html">Log In</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
    </div>
  )
}

export default Inscription