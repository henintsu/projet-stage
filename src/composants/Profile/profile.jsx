import React, { useState, useEffect } from 'react';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function Profiles() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const [currentAdmin, setCurrentAdmin] = useState(null); // To store the currently logged-in admin

    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // Sort data whenever 'data' or 'sortOrder' changes
        const sorted = [...data].sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.last_login) - new Date(b.last_login);
            }
            return new Date(b.last_login) - new Date(a.last_login);
        });
        setSortedData(sorted);
    }, [data, sortOrder]);

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
        if (Object.keys(validationErrors).length === 0) {
            if (selectedId) {
                // Update existing user
                axios.put(`http://localhost:4000/api/users/${selectedId}`, values)
                    .then(res => {
                        clearForm();
                        getData();
                    })
                    .catch(err => console.log(err));
            } else {
                // Create new user
                axios.post('http://localhost:4000/api/users', values)
                    .then(res => {
                        clearForm();
                        getData();
                    })
                    .catch(err => console.log(err));
            }
            setSelectedId(null);
        }
    };

    const handleEdit = (user) => {
        setSelectedId(user.id); // Set the ID of the selected user
        setValues({
            name: user.name,
            email: user.email,
            password: user.password
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/users/${id}`)
            .then(res => {
                console.log(res.data.message);
                getData();
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        clearForm(); // Clear the form fields
    };

    const clearForm = () => {
        setValues({
            name: '',
            email: '',
            password: ''
        });
        setSelectedId(null);
    };

    const getData = () => {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                setData(res.data);
                // Assuming the currently logged-in admin is the one with the most recent last_login
                const currentAdminData = res.data.reduce((prev, curr) => {
                    return new Date(curr.last_login) > new Date(prev.last_login) ? curr : prev;
                });
                setCurrentAdmin(currentAdminData);
            })
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

    const handleSort = (order) => {
        setSortOrder(order);
    }

    return (
        <div className='profile'>
            <div className="row">
                <div className="card mt-2">
                    <div className="container mt-1 ">
                        <div className="row ">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Admin page</h4>
                                </div>
                                <nav aria-label="breadcrumb" role="navigation">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/Dashboard">Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item " aria-current="page">
                                            Admin
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4 mt-1">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <h4 className="card-title mb-0">Inscription</h4>
                        </div>
                        <div className="card-body">
                            <h3 className="text-center">{selectedId ? "Modifier l'utilisateur" : "Inscrivez-vous !"}</h3>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label">Nom <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            placeholder="Entrer votre nom"
                                            value={values.name}
                                            onChange={handleInput}
                                            required
                                        />
                                        {errors.name && <span className="text-danger">{errors.name}</span>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            placeholder="name@example.com"
                                            value={values.email}
                                            onChange={handleInput}
                                            required
                                        />
                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Mot de passe <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="Entrer votre mot de passe"
                                                value={values.password}
                                                onChange={handleInput}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-lg"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? "Cacher" : "Afficher"}
                                            </button>
                                        </div>
                                        {errors.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                    <div className="col-12 mt-4">
                                        <div className="d-grid">
                                            <button className="btn btn-primary" type="submit">
                                                {selectedId ? "Mettre à jour" : "S'inscrire"}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary mt-2"
                                                onClick={handleCancel}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-8 col-xxl-9 d-flex mt-1">
                    <div className="card flex-fill">
                        <div className="card-header d-flex justify-content-between">
                            <h5 className="card-title mb-0">Latest Projects</h5>
                            <h5 className="card-title mb-0">
                                <i
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSort(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="mb-0 tri"
                                >
                                    <i className="bi bi-sort-alpha-down"></i>
                                    <span className="h6">Trier</span>
                                </i>
                            </h5>
                        </div>
                        <table className="table table-hover my-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Mot de passe</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleOpenDialog(user.id)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 mt-1">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Admin actuellement en ligne</h5>
                            {currentAdmin && (
                                <div className="online-admin-info">
                                    <p>{`Nom: ${currentAdmin.name} | Email: ${currentAdmin.email} | Mot de passe: ${currentAdmin.password}`}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <p>Êtes-vous sûr de vouloir supprimer cet utilisateur?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Annuler</Button>
                    <Button
                        onClick={() => {
                            handleDelete(deleteId);
                            handleCloseDialog();
                        }}
                        color="secondary"
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Profiles;
