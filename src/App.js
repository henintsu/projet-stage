import './App.css'
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Dashboard from './composants/Dashboard/Dashboard';
import DashForm from './composants/Forms/Add/form/DashForm';
import Acceuil from './composants/Users/utilisateur/body/acceuil';
import Contact from './composants/Users/utilisateur/body/contact';
import Login from './composants/Login/Login';
import Inscription from './composants/Inscription/Inscription';
import Profiles from './composants/Profile/profile';
import DashProfile from './composants/Profile/DashProfile';
import TabAdmin from './composants/Tab/TabAdmin/TabAdmin';
import TabUser from './composants/Tab/TabUser/TabUser';
import Tab from './composants/Tab/Tab';
import DashTab from './composants/Tab/DashTab';
import Nationalite from './composants/Nationalite/Nationalite';
import Commune from './composants/Commune/Commune';
import DashboardCommune from './composants/Commune/DashboardCommune';
import DashboardNationalite from './composants/Nationalite/DashboardNationalite';
import FormEdit from './composants/Forms/Edit/form/formedit';
import DashFormEdit from './composants/Forms/Edit/form/DashFormEdit';
import FormAdd from './composants/Users/utilisateur/body/FormAdd';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
            <Route path='/DashForm' element={<DashForm/>}></Route>
            <Route path='/DashProfile' element={<DashProfile/>}></Route>
            <Route path='/DashTab' element={<DashTab/>}></Route>
            <Route path='/DashNationalite' element={<DashboardNationalite/>}></Route>
            <Route path='/DashCommune' element={<DashboardCommune/>}></Route>
            <Route path='/DashFormEdit' element={<DashFormEdit/>}></Route>

            {/* ******************** utilisateur ******************** */}
            <Route path='/' element={<Acceuil/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/formadd' element={<FormAdd/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/inscription' element={<Inscription/>}></Route>
            <Route path='/profiles' element={<Profiles/>}></Route>
            <Route path='/tabadmin' element={<TabAdmin/>}></Route>
            <Route path='/tabuser' element={<TabUser/>}></Route>
            <Route path='/tab' element={<Tab/>}></Route>
            <Route path='/nationalite' element={<Nationalite/>}></Route>
            <Route path='/commune' element={<Commune/>}></Route>
            <Route path='/formedit' element={<FormEdit/>}></Route>

            {/* *********************Edit**************************** */}
            <Route path='/DashFormEdit/:id' element={<DashFormEdit/>}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
