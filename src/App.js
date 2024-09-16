import './App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Index from './composants/Acceuil/Index';
import DemandeCarte from './composants/Acceuil/DemandeCarte';
import MiniDrawer from './composants/Dashboard/MiniDrawer';
import HeaderUi from './composants/Dashboard/Header.jsx';
import { SitemarkIcon } from './composants/Pages/Connection/CustomIcons.jsx';
import ForgotPassword from './composants/Pages/Connection/ForgotPassword.jsx';
import Commune from './composants/Pages/Administration/Commune.jsx';
import Nationalite from './composants/Pages/Administration/Nationalite.jsx';
import FormJuridique from './composants/Pages/Administration/FormeJuridique.jsx';
import FormulaireAjout from './composants/Pages/Administration/FormulaireAjout.jsx';
import FormulaireModification from './composants/Pages/Administration/FormulaireModification.jsx';
import Administration from './composants/Pages/Administration/Administration.jsx';
import Repertoire from './composants/Pages/Administration/Repertoire.jsx';
import SignInCard from './composants/Pages/Connection/SingInPage.jsx';
import LoadingRetour from './composants/Pages/Autres/LoadingRetour.jsx';
import Dashboard from './composants/Pages/Administration/Dashboard.jsx';
import Loading from './composants/Pages/Autres/Loading.jsx'
import { AuthProvider } from './composants/Pages/Connection/provider.jsx';
import ProtectedRoute from './composants/Pages/Connection/protectedroute.jsx';
import ResumeListe from './composants/Pages/Administration/ResumeListe.jsx';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <BrowserRouter>
              <Routes>

                {/* ===================ACCEUIL==================== */}
                <Route path='/demadecarte-page' element={<DemandeCarte />} />
                <Route path='/header-page' element={<HeaderUi />} />


                {/* =================== LODING ==================== */}
                <Route path='/' element={<Index/>} />
                <Route path='/loading-page' element={<Loading />} />
                <Route path='/loading-retour' element={<LoadingRetour />} />


                {/* =================== PROTECTED PAGES==================== */}
                <Route path='/dashboard-page' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/commune-page' element={<ProtectedRoute><Commune/></ProtectedRoute>} />
                <Route path='/nationalite-page' element={ <ProtectedRoute><Nationalite /></ProtectedRoute> } />
                <Route path='/formj-page' element={<ProtectedRoute><FormJuridique /></ProtectedRoute>} />
                <Route path='/formulaireajout-page' element={<ProtectedRoute><FormulaireAjout /></ProtectedRoute>} />
                <Route path='/formulaire-modification/:id' element={<ProtectedRoute><FormulaireModification /></ProtectedRoute>} />
                <Route path='/administration-page' element={<ProtectedRoute><Administration /></ProtectedRoute>} />
                <Route path='/repertoire-page' element={<ProtectedRoute><Repertoire /></ProtectedRoute>} />
                <Route path='/resume-page' element={<ProtectedRoute><ResumeListe /></ProtectedRoute>} />


                {/* ===================MiniDrawer==================== */}
                <Route path='/minidrawer' element={<MiniDrawer />} />


                {/* ==================== CONNEXION ==================== */}
                <Route path="/connexion-page" element={ <SignInCard /> } />
                <Route path="/forgotpassword-page" element={ <ForgotPassword /> } />
                <Route path="/sitemarkicon-page" element={ <SitemarkIcon /> } />

                  
              </Routes>
          </BrowserRouter> 
      </AuthProvider>
    </div>
  );
}

export default App;
