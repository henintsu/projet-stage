import React from 'react'
import { Link } from 'react-router-dom'
import './styleBody.css'
// import './main'


function Contact() {
  return (
    <div className='contact-page'>
            <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" className="logo d-flex align-items-center">
                {/* <!-- Uncomment the line below if you also wish to use an image logo -->
                <!-- <img src="assets/img/logo.png" alt=""> --> */}
                <h1 className="sitename">Direction Iterregional de Fianarantsoa</h1>
            </a>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <Link to='/login'  className="btn-get-started">Se connecter</Link>
                    <li><Link to="/contact" className="active">Contact</Link></li>
                    <li><Link to="/formadd">S'inscrire</Link></li>                
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            </div>
        </header>

        <main className="main">

            {/* <!-- Page Title --> */}
            <div className="page-title light-background">
            <div className="container">
                <h1>Contact</h1>
                <nav className="breadcrumbs">
                <ol>
                    <li><Link to="/">Home</Link></li>
                    <li className="current">Contact</li>
                </ol>
                </nav>
            </div>
            </div>{/* <!-- End Page Title --> */}

            {/* <!-- Contact Section --> */}
            <section id="contact" className="contact section">

            <div className="container" data-aos="fade">

                <div className="row gy-5 gx-lg-5">

                <div className="col-lg-4">

                    <div className="info">
                    <h3>Information</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, nulla.</p>

                    <div className="info-item d-flex">
                        <i className="bi bi-geo-alt flex-shrink-0"></i>
                        <div>
                        <h4>Location:</h4>
                        <p>Isaha Fianarantsoa </p>
                        </div>
                    </div>{/* <!-- End Info Item --> */}
                    

                    <div className="info-item d-flex">
                        <i className="bi bi-envelope flex-shrink-0"></i>
                        <div>
                        <h4>Email:</h4>
                        <p>info@example.com</p>
                        </div>
                    </div>{/* <!-- End Info Item --> */}
                    

                    <div className="info-item d-flex">
                        <i className="bi bi-phone flex-shrink-0"></i>
                        <div>
                        <h4>Call:</h4>
                        <p>+261 34 xx xxx xx</p>
                        </div>
                    </div> {/* <!-- End Info Item --> */}
                    

                    </div>

                </div>

                <div className="col-lg-8">
                    <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                    <div className="row">
                        <div className="col-md-6 form-group">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required="" />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required="" />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required="" />
                    </div>
                    <div className="form-group mt-3">
                        <textarea className="form-control" name="message" placeholder="Message" required=""></textarea>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center"><button type="submit">Envoyer votre message</button></div>
                    </form>
                </div>{/* <!-- End Contact Form --> */}
                

                </div>

            </div>

            </section> {/* <!-- /Contact Section --> */}
            

        </main>

        <footer id="footer" className="footer light-background">
            <div className="container">
            <div className="row g-4">
                <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">About Us</h3>
                    <p className="mb-4">
                    There live the blind texts. Separated they live in Bookmarksgrove
                    right at the coast of the Semantics, a large language ocean.
                    </p>
                    <p className="mb-0">
                    <a href="#" className="btn-learn-more">Learn more</a>
                    </p>
                </div>
                </div>
                <div className="col-md-6 col-lg-3 ps-lg-5 mb-3 mb-md-0">
                <div className="widget">
                    <h3 className="widget-heading">Navigation</h3>
                    <ul className="list-unstyled float-start me-5">
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Find Buyers</a></li>
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
                {/* <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you've purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] --> */}
                {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
                </div>
            </div>
            </div>
        </footer>

    </div>
  )
}

export default Contact