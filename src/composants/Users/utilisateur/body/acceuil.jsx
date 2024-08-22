import React, { useState } from 'react'
import '../body/styleBody.css'
import InstatImage from '../../../Assets/instat.jpg'
import FormModalClient from '../ModalFormAdd/FormModalClient';
import { Link } from 'react-router-dom';
// import './main'


function Acceuil() {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

  return (
    <div className='index-page'>
            <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <Link to="/" className="logo d-flex align-items-center">
                {/* <!-- Uncomment the line below if you also wish to use an image logo -->
                <!-- <img src="assets/img/logo.png" alt=""> --> */}
                <h1 className="sitename">Direction Interregional de Fianarantsoa</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
                <ul>
                <li><Link to="/" className="active">Home</Link></li>
                <Link to='/login'  className="btn-get-started">Se connecter</Link>
                <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                    <li><Link to="#">Dropdown 1</Link></li>
                    <li><Link to="#">Dropdown 2</Link></li>
                    <li><Link to="#">Dropdown 3</Link></li>
                    </ul>
                </li>
                <li><Link to="/contact">Contact</Link></li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            </div>
        </header>

        <main className="main">


            {/* <!-- About 2 Section --> */}
            <section id="about-2" className="about-2 section light-background">

            <div className="">
                <div className="">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-5 col-lg-4 col-xl-4 order-lg-2 offset-xl-1 mb-4">
                        <div className="img-wrap text-center text-md-left" data-aos="fade-up" data-aos-delay="100">
                            <div className="img">
                            <img src = {InstatImage}  alt='' className="img-fluid" />
                        </div>
                    </div>
                    </div>

                    <div className="offset-md-0 offset-lg-1 col-sm-12 col-md-5 col-lg-5 col-xl-4" data-aos="fade-up">
                    <div className="px-3">
                        <span className="content-subtitle">Nous sommes l'</span>
                        <h2 className="content-title text-start">
                        INStitut National de la Statistique
                        </h2>
                        <p className="lead">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolores ratione 
                        nostrum quae rem blanditiis repellendus atque autem aperiam beatae?
                        </p>
                        <p className="mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugit at nobis adipisci dignissimos voluptas facilis a nulla sequi 
                        culpa iusto error maxime sunt numquam, ratione blanditiis maiores asperiores quos?
                        </p>
                        <p>
                            <button onClick={handleOpenModal} className="btn-get-started">S 'inscrire </button>
                            
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section> {/* <!-- /About 2 Section --> */}
            


            {/* <!-- Services 2 Section --> */}
            <section id="services-2" className="services-2 section">

            <div className="">
                <div className="row justify-content-center" data-aos="fade-up">
                <div className="col-md-6 col-lg-4">
                    <span className="content-subtitle">Notre Service</span>
                    <h2 className="content-title">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, expedita.
                    </h2>
                    <p className="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque suscipit et eaque beatae deserunt quis aut ab facere hic sed.
                    </p>
                    <p className="mb-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore animi nulla eos! In fuga doloribus eveniet ut dicta tempora placeat quidem distinctio veritatis? Accusamus vitae ex mollitia minus. Omnis, vero!
                    </p>
                    <p>
                        <a href="#" className="btn btn-get-started">C est parti </a>
                    </p>
                </div>
                <div className="col-md-6 col-lg-6 ps-lg-5">
                    <div className="row">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="services-item" data-aos="fade-up" data-aos-delay="">
                        <div className="services-icon">
                            <i className="bi bi-search"></i>
                        </div>
                        <div>
                            <h3>lorem1</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, nobis.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="services-item" data-aos="fade-up" data-aos-delay="100">
                        <div className="services-icon">
                            <i className="bi bi-command"></i>
                        </div>
                        <div>
                            <h3>lorem2</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, eligendi.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="services-item" data-aos="fade-up" data-aos-delay="200">
                        <div className="services-icon">
                            <i className="bi bi-grid"></i>
                        </div>
                        <div>
                            <h3>lorem3</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, molestiae.</p>
                        </div>
                        </div>
                    </div>

                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="services-item" data-aos="fade-up" data-aos-delay="300">
                        <div className="services-icon">
                            <i className="bi bi-globe"></i>
                        </div>
                        <div>
                            <h3>lorem4</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section> {/* <!-- /Services 2 Section --> */}


        </main>


        {/* Modal  */}
        <FormModalClient open={openModal} onClose={handleCloseModal} />

        <footer id="footer" className="footer light-background">
            <div className="px-3">
            <div className="row g-4">
                <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">A propos</h3>
                    <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quibusdam sint quis nihil dolorem!
                    </p>
                    <p className="mb-0">
                        <a href="#" className="btn-learn-more">Acceuil</a>
                    </p>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 ps-lg-5 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">Navigation</h3>
                    <ul className="list-unstyled float-start me-5">
                    <li><a href="#">lorem</a></li>
                    <li><a href="#">lorem ipsum</a></li>
                    </ul>
                    <ul className="list-unstyled float-start">
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 pl-lg-5">
                <div className="widget">
                    <h3 className="widget-heading">Recent Posts</h3>
                    <ul className="list-unstyled footer-blog-entry">
                    <li>
                        <span className="d-block date">May 3, 2020</span>
                        <a href="#">There live the Blind Texts</a>
                    </li>
                    <li>
                        <span className="d-block date">May 3, 2020</span>
                        <a href="#">Separated they live in Bookmarksgrove right</a>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 pl-lg-5">
                <div className="widget">
                    <h3 className="widget-heading">Connect</h3>
                    <ul className="list-unstyled social-icons light mb-3">
                    <li>
                        <a href="#"><span className="bi bi-facebook"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-linkedin"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-google"></span></a>
                    </li>
                    <li>
                        <a href="#"><span className="bi bi-google-play"></span></a>
                    </li>
                    </ul>
                </div>

                <div className="widget">
                    <div className="footer-subscribe">
                    <h3 className="widget-heading">Subscribe</h3>
                    <form action="forms/newsletter.php" method="post" className="php-email-form">
                        <div className="mb-2">
                        <input type="text" className="form-control" name="email" placeholder="Enter your email" />

                        <button type="submit" className="btn btn-link">
                            <span className="bi bi-arrow-right"></span>
                        </button>
                        </div>
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">
                        Your subscription request has been sent. Thank you!
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <div className="copyright d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <p>© <span>Copyright</span> <strong className="px-1 sitename">Active.</strong> <span>All Rights Reserved</span></p>
                <div className="credits">
                {/* <!-- All the links in the footer should remain intact. --> */}
                {/* <!-- You can delete the links only if you've purchased the pro version. --> */}
                {/* <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
                {/* <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </div>
            </div>
        </footer>
    </div>
  )
}

export default Acceuil