import React from 'react'
import fianara from '../Ressources/Acceuil/images/fianara.jpg'
import { Link } from 'react-router-dom'
import "../Styles/StyleAcceuil.css"


function Index() {
  return (
    <div>
        <header className="header" id="header">
            <nav className="nav container">
                <a href="#" className="nav__logo text-decoration-none">AdminKit</a>

                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link ">Acceuil</a>
                        </li>
                        <li className="nav__item">
                            <a href="#mission" className="nav__link ">Missions</a>
                        </li>
                        <li className="nav__item">
                            <a href="#organisme" className="nav__link ">Organisme</a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link ">Contact</a>
                        </li>
                    </ul>

                    <div className="nav__dark">
                        {/* <!-- Theme change button --> */}
                        <span className="change-theme-name">Dark mode</span>
                        <i className="ri-moon-line change-theme" id="theme-button"></i>
                    </div>

                    <i className="ri-close-line nav__close" id="nav-close"></i>
                </div>

                <div className="nav__toggle" id="nav-toggle">
                    <i className="ri-function-line"></i>
                </div>
                
            </nav>
        </header>

        <main className="main">

            {/* <!--==================== HOME ====================--> */}
            <section className="home" id="home">
                <img src={fianara} alt="" className="home__img" />

                <div className="home__container container grid">
                    <div className="home__data">
                        <span className="home__data-subtitle">Demander votre carte statistique</span>
                        <h1 className="home__data-title">l'INSTAT <br /> n'attend <b>plus que <br /> vous</b></h1>
                        <Link to="/demadecarte-page" className="button text-decoration-none">Demander un rendez-vous</Link>

                    </div>

                    <div className="home__social">
                        <a href="https://www.facebook.com/" target="_blank" className="home__social-link" rel="noreferrer">
                            <i className="ri-facebook-box-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className="home__social-link" rel="noreferrer">
                            <i className="ri-instagram-fill"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank" className="home__social-link" rel="noreferrer">
                            <i className="ri-twitter-fill"></i>
                        </a>
                    </div>

                    <div className="home__info">
                        <div>
                            <span className="home__info-title">Direction Interrégionale de l’INSTAT Fianarantsoa </span>
                            <a href="" className="button button--flex button--link home__info-button">
                                Plus <i className="ri-arrow-right-line"></i>
                            </a>
                        </div>

                        <div className="home__info-overlay">
                            <img  alt="" className="home__info-img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* <!--==================== ABOUT ====================--> */}
            <section className="about section" id="direction">
                <div className="about__container container grid">
                    <div className="about__data">
                        <h2 className="section__title about__title">plus d'information <br /> A propos de l'INSTAT</h2>
                        <p className="about__description">
                            Dirigé par le Mr <b>RASAMIMANANA Minosoa Oliva </b>  ,Directeur Interrégional de l’INSTAT Fianarantsoa 
                        </p>
                        <Link to="/loading-page" className="button text-decoration-none">Se connecter</Link>
                    </div>

                    <div className="about__img">
                        <div className="about__img-overlay">
                            <img  alt="" className="about__img-one" />
                        </div>

                        <div className="about__img-overlay">
                            <img  alt="" className="about__img-two" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* <!--==================== DISCOVER ====================--> */}
            <section className="discover section container" id="mission">
                <h2 className="section__title">Missions de l'INSTAT Fianarantsoa</h2>
                <div className="col-12">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12">
                             <div className="row d-flex justify-content-center">

                                <div className="col-lg-10 col-md-6">
                                    <div className="card">
                                        <div className="card-body collapse show">
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i> Collecte des données nécessaires à l’INSTAT et ou aux Régions</p>
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i> Elaboration et diffusion des statistiques régionale</p>
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i> Traiter et présenter l’indice de prix à la consommation</p>
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i> Délivrance de la carte statistique pour les établissements exerçant une activité économique dans leurs régions et exploitation de la base de données</p>
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i> Collecte des données sur l’état civil et sur le décès</p>
                                            <p className="text-justify text-muted"><i className="bi bi-check text-info"></i>Traitement de la carte grise au Centre Provincial d’Immatriculation des véhicules </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                  
            </section>


            {/* <!--==================== ABOUT ====================--> */}
            <section className="section " id="organisme">
                <div className="container container-fluid">
                    <h2 className="section__title">Organisme au sein de l'INSTAT </h2>

                    <div className="col-12">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-12 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">DIRECTEUR</h4>
                                        <p className="text-justify text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab culpa atque velit odit earum necessitatibus itaque architecto porro, voluptates nesciunt?</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row d-flex justify-content-center">

                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">Secretariat</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title"> Service fichier des etablissements</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">Service statistique sociale</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">Service du prix a la consomation</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">Service de documentation</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body collapse show">
                                        <h4 className="card-title">Service parauto</h4>
                                        <p className="text-justify text-muted">With supporting text below as a natural lead-in to additional
                                            content.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* <!--==================== VIDEO ====================--> */}
            <section className="video section">
                <h2 className="section__title">Nous sommes l'instat fianarantsoa</h2>

                <div className="video__container container">
                    <p className="video__description">
                        Nous sommes pret a vous recevoir , n'hesitez pas a nous contacter , Votre satisfaction est notre priorité !
                    </p>

                    <div className="video__content">
                        <video id="video-file">
                            {/* <source src="assets/video/video.mp4" type="video/mp4"> */}
                        </video>

                        <button className="button button--flex video__button" id="video-button">
                            <i className="ri-play-line video__button-icon" id="video-icon"></i>
                        </button>
                    </div>
                </div>
            </section>


            {/* <!--==================== SUBSCRIBE ====================--> */}
            <section className="subscribe section">
                <div className="subscribe__bg">
                    <div className="subscribe__container container">
                        <h2 className="section__title subscribe__title">Envoyer votre <br /> Email</h2>
                        <p className="subscribe__description">Envoyer une Email a l'Administrateur
                        </p>
    
                        <form action="" className="subscribe__form">
                            <input type="text" placeholder="Enter email" className="subscribe__input" />
    
                            <button className="button">
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            
            {/* <!--==================== SPONSORS ====================--> */}
            <section className="sponsor section">
                <div className="sponsor__container container grid">
                    <div className="sponsor__content">
                        <img  alt="" className="sponsor__img" />
                    </div>
                    <div className="sponsor__content">
                        <img  alt="" className="sponsor__img" />
                    </div>
                    <div className="sponsor__content">
                        <img  alt="" className="sponsor__img" />
                    </div>
                    <div className="sponsor__content">
                        <img  alt="" className="sponsor__img" />
                    </div>
                    <div className="sponsor__content">
                        <img  alt="" className="sponsor__img" />
                    </div>
                </div>
            </section>
        </main>

        {/* <!--==================== FOOTER ====================--> */}
        <footer className="footer section" id="contact">
            <div className="footer__container container grid">
                <div className="footer__content grid">
                    <div className="footer__data">
                        <h3 className="footer__title">Contact</h3>
                        <p className="footer__description">Vous pouvez joindre<br /> l'Administrateur, 
                           avec ces info <br />.
                        </p>
                        <div>
                            <a href="https://www.facebook.com/" target="_blank" className="footer__social" rel="noreferrer">
                                <i className="ri-facebook-box-fill"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" className="footer__social" rel="noreferrer">
                                <i className="ri-twitter-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" className="footer__social" rel="noreferrer">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" className="footer__social" rel="noreferrer">
                                <i className="ri-youtube-fill"></i>
                            </a>
                        </div>
                    </div>
    
                    <div className="footer__data">
                        <h3 className="footer__subtitle">A propos</h3>
                        <ul>
                            <li className="footer__item">
                                <i className="bi-telephone me-2"></i>
                                <a href="" className="footer__link">+261 34 49 384 03</a>
                            </li>
                            <li className="footer__item">
                                <i className="bi-envelope me-2"></i>
                                <a href="" className="footer__link">hasimanitriniaina.jonica@gmail.com</a>
                            </li>
                            <li className="footer__item">
                                <i className="bi-whatsapp me-2"></i>
                                <a href="" className="footer__link">+261 33 34 755 65</a>
                            </li>
                        </ul>
                    </div>
    
                    <div className="footer__data">
                        <h3 className="footer__subtitle">Reseaux</h3>
                        <ul>
                            <li className="footer__item">
                                <i className="bi-link me-2"></i>
                                <a href="https://www.instat.mg" className="footer__link">Site officiel</a>
                            </li>
                            <li className="footer__item">
                                <i className="bi-facebook me-2"></i>
                                <a href="https://www.facebook.com/" className="footer__link">Facebbok</a>
                            </li>
                            <li className="footer__item">
                                <a href="" className="footer__link"></a>
                            </li>
                        </ul>
                    </div>
    
                    <div className="footer__data">
                        <h3 className="footer__subtitle">Pages</h3>
                        <ul>
                            <li className="footer__item">
                                <i className="bi-1-circle me-2"></i>
                                <a href="#home" className="footer__link">acceuil</a>
                            </li>
                            <li className="footer__item">
                            <i className="bi-2-circle me-2"></i>
                                <a href="#direction" className="footer__link">direction</a>
                            </li>
                            <li className="footer__item">
                            <i className="bi-3-circle me-2"></i>
                                <a href="#organisme" className="footer__link">organisme</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__rights">
                    <p className="footer__copy">&#169; 2021 Bedimcode. All rigths reserved.</p>
                    <div className="footer__terms">
                        <a href="#" className="footer__terms-link">Terms & Agreements</a>
                        <a href="#" className="footer__terms-link">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Index