import React from 'react'
import '../Dashboard/css/Style.css'
import '../Dashboard/JS/script.js'
import profile from '../Dashboard/Images/profile.png'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nationalite from './Nationalite.jsx'
import "../Dashboard/JS/script.js"

function DashboardNationalite() {
  return (
    <div className='dashboard-page'>
        <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar">
				<a className="sidebar-brand" href="index.html">
          <span className="align-middle">AdminKit</span>
        </a>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Pages
					</li>

					<li className="sidebar-item ">
						<Link className="sidebar-link" to="/Dashboard">
                            <i className="bi bi-house align-middle" data-feather="sliders"></i> 
                            <span className="align-middle">Dashboard</span>
                        </Link>
					</li>

					<li className="sidebar-item">
                        <Link className="sidebar-link" to="/DashProfile">
                            <i className="bi bi-person align-middle" data-feather="user"></i> 
                            <span className="align-middle">Administration</span>
                        </Link>
					</li>

					<li className="sidebar-item">
						<Link className="sidebar-link" to="/inscription">
                            <i className="bi bi-person-add align-middle" data-feather="log-in"></i> 
                            <span className="align-middle">Inscription</span>
                        </Link>
					</li>

					<li className="sidebar-header">
						Autres et composants
					</li>

					<li className="sidebar-item">
						<Link className="sidebar-link" to="/DashTab">
                            <i className="bi bi-card-list align-middle" data-feather="square"></i> 
                            <span className="align-middle">Données</span>
                        </Link>
					</li>

					<li className="sidebar-item">
						<Link className="sidebar-link" to="/DashForm">
                            <i className="bi bi-ui-checks align-middle" data-feather="check-square"></i> 
                            <span className="align-middle">Formulaire</span>
                        </Link>
					</li>

					<li className="sidebar-item">
						<Link className="sidebar-link" to="/DashCommune">
                            <i className="bi bi-geo-alt  align-middle" data-feather="grid"></i> 
                            <span className="align-middle">Commune</span>
                        </Link>
					</li>

					<li className="sidebar-item active">
						<Link className="sidebar-link" to="/DashNationalite">
                            <i className="bi bi-pci-card align-middle" data-feather="align-left"></i> 
                            <span className="align-middle">Nationalite</span>
                        </Link>
					</li>

					<li className="sidebar-header">
						Plugins & Addons
					</li>

				</ul>

			</div>
		</nav>
            <div className="main">
                <nav className="navbar navbar-expand px-3 border-bottom">
                    <button className="btn" id="sidebar-toggle" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                    <img src={profile} className="avatar img-fluid rounded" alt="image" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="/DashboardProfile" className="dropdown-item">
                                        <i className="bi bi-person pe-2"></i>Profile
                                    </Link>
                                    <Link to="" className="dropdown-item">
                                        <i className="bi bi-gear pe-2"></i>Setting
                                    </Link>
                                    <Link to="/Login" className="dropdown-item">
                                        <i className="bi bi-box-arrow-right pe-2"></i>Sortir
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                <main className="container content px-3 py-0">
                    {/* on met ici le contenu */}
                    <Nationalite/>
                </main>
                <a href="#" className="theme-toggle">
                    <i className="bi bi-moon"></i>
                    <i className="bi bi-sun"></i>
                </a>
            </div>
        </div>
    </div>
  )
}

export default DashboardNationalite
