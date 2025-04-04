import { Routes, Route } from 'react-router';
import './App.css';
import Login from './Pages/Auth/Login';
import CRM from './Pages/CRM';
import ProtectedRoute from './components/ProtectedRoute';
import { Role } from './constants/roles';
import { appLinks } from './routes';
import Treatments from './Pages/CRM/Treatments';
import Appointments from './Pages/CRM/Appointments';
import UsersList from './Pages/CRM/Users/UsersList';

import PatientsList from './Pages/CRM/Patients/PatientsList';
import { SnackbarProvider } from 'notistack';

const protectedRouteProps = {
  requiredRoles: [Role.Admin, Role.Dentist, Role.Receptionist],
};

function App() {
  return (
    <SnackbarProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/crm"
          element={
            <ProtectedRoute {...protectedRouteProps} element={<CRM />} />
          }
        >
          <Route path={appLinks.crm.users.list}>
            <Route index element={<UsersList />} />
          </Route>

          <Route path={appLinks.crm.patients.list}>
            <Route index element={<PatientsList />} />
          </Route>

          <Route
            path={appLinks.crm.appointments.list}
            element={<Appointments />}
          />
          <Route path={appLinks.crm.treatments.list} element={<Treatments />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
