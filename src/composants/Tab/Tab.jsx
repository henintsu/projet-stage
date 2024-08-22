import React from 'react'
import './mainTab'
import TabUser from './TabUser/TabUser'
import TabAdmin from './TabAdmin/TabAdmin'
import { Link } from 'react-router-dom'


function Tab() {
  return (
    <div> 
        <div className="card mt-2 px-2">
            <div className="container mt-2 px-2 ">
                <div className="row ">
                    <div className="col-md-6 col-sm-12">
                        <div className="title">
                            <h4>Tab</h4>
                        </div>
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/Dashboard">Dashboard</Link>
                            </li>
                                <li className="breadcrumb-item " aria-current="page">
                                    <Link to="/DashForm" variant="contained"  type='submit'>Ajouter</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

<       div className="card container mt-3 max">
            {/* <h2 className='card-header color-text'>Tab</h2> */}
            <p className=' ' >Lorem ipsum dolor sit amet.</p>

            {/* <!-- Nav tabs --> */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tableau inscription</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="menu1-tab" data-bs-toggle="tab" href="#menu1" role="tab" aria-controls="menu1" aria-selected="false">Tableau admin</a>
                </li>
            </ul>
            <br />

            {/* <!-- Tab panes --> */}
            <div className="tab-content border mb-3">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <TabUser />
                </div>
                <div className="tab-pane fade" id="menu1" role="tabpanel" aria-labelledby="menu1-tab">
                    <TabAdmin />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tab