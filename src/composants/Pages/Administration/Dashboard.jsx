import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MiniDrawer from '../../Dashboard/MiniDrawer';
import { Box } from '@mui/material';
import "../../Styles/StyleDashboard.css";
import {Grid , Card , CardContent, Typography } from '@mui/material';

function Dashboard() {
    const [temporaireCount, setTemporaireCount] = useState(0);
    const [formjCount, setFormjCount] = useState(0);
    const [communeCount, setCommuneCount] = useState(0);
    const [nationaliteCount, setNationaliteCount] = useState(0);

    useEffect(() => {
        getCounts();
    }, []);

    const getCounts = async () => {
        try {
            const temporaireRes = await axios.get('http://localhost:4000/api/count/temporaire');
            const formjRes = await axios.get('http://localhost:4000/api/count/formj');
            const communeRes = await axios.get('http://localhost:4000/api/count/commune');
            const nationaliteRes = await axios.get('http://localhost:4000/api/count/nationalite');

            setTemporaireCount(temporaireRes.data.count);
            setFormjCount(formjRes.data.count);
            setCommuneCount(communeRes.data.count);
            setNationaliteCount(nationaliteRes.data.count);
        } catch (error) {
            console.error("Erreur lors de la récupération des données", error);
        }
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', width: '100%', height: '100vh' }}>
            <MiniDrawer />
            <Box component="main" sx={{ flexGrow: 1 , p: 1 }}>
                <div className='contenu'>
                    <div className='card-body mt-2'>
                        <div className="row">
                            {/* Carte pour la table temporaire */}
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
                                <div className="card bg-primary text-white shadow-sm h-60 d-flex flex-column">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <span>Demande de confirmation</span>
                                        <i className="fas fa-check-circle fa-2x"></i>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to="/DashTab">Voir les détails</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                    <div className="card-number">{temporaireCount}</div> {/* Nombre à afficher */}
                                </div>
                            </div>

                            {/* Carte pour la table formj */}
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
                                <div className="card bg-warning text-white shadow-sm h-60 d-flex flex-column">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <span>Formes Juridiques</span>
                                        <i className="fas fa-cogs fa-2x"></i>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to="/DashFormj">Voir les détails</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                    <div className="card-number">{formjCount}</div> {/* Nombre à afficher */}
                                </div>
                            </div>

                            {/* Carte pour la table commune */}
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
                                <div className="card bg-success text-white shadow-sm h-60 d-flex flex-column">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <span>Communes</span>
                                        <i className="fas fa-database fa-2x"></i>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to="/DashCommune">Voir les détails</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                    <div className="card-number">{communeCount}</div> {/* Nombre à afficher */}
                                </div>
                            </div>

                            {/* Carte pour la table nationalité */}
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
                                <div className="card bg-danger text-white shadow-sm h-60 d-flex flex-column">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <span>Nationalités</span>
                                        <i className="fas fa-plus-circle fa-2x"></i>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <Link className="small text-white stretched-link" to="/DashNationalite">Voir les détails</Link>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                    <div className="card-number">{nationaliteCount}</div> {/* Nombre à afficher */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diagramme represntant la variation des personnes inscrit par mois  */}
                <Grid container spacing={2} sx={{ mt : 1 }}>
                    <Grid item xs={12} md={8} sx={{ maxHeight : '100px' }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Diagramme represantant les nombre d'nscription par mois 
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Diagrammes des utilisateurs le plus connecte en un mois   */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Variation des utilisateurs
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;
