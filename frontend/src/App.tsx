import { Routes, Route } from 'react-router';
import './App.css';
import Login from './Pages/Auth/Login';
import CRM from './Pages/CRM';
import ProtectedRoute from './components/ProtectedRoute';
import { Role } from './constants/roles';
import { appLinks } from './routes';
import Treatments from './Pages/CRM/Treatments';
import Appointments from './Pages/CRM/Appointments';
import UsersList from './Pages/CRM/Users';

import Patients from './Pages/CRM/Patients';
import { SnackbarProvider } from 'notistack';
import Staff from './Pages/CRM/Staff';

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
          <Route path={appLinks.crm.staff.list} element={<Staff />} />
          <Route path={appLinks.crm.patients.list} element={<Patients />} />
          <Route path={appLinks.crm.users.list}>
            <Route index element={<UsersList />} />
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
