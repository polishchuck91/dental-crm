import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./Pages/Auth/Login";
import CRM from "./Pages/CRM";
import Patient from "./Pages/Patient";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./constants/roles";
import { appLinks } from "./routes";
import Treatments from "./Pages/CRM/Treatments";
import Appointments from "./Pages/CRM/Appointments";
import UsersList from "./Pages/CRM/ Users/UsersList";
import StaffList from "./Pages/Staff/StaffList";
import PatientsList from "./Pages/CRM/Patients/PatientsList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/crm"
        element={
          <ProtectedRoute
            requiredRoles={[Role.Admin, Role.Dentist, Role.Receptionist]}
            element={<CRM />}
          />
        }
      >
        <Route path={appLinks.crm.users.list}>
          <Route index element={<UsersList />} />
        </Route>

        <Route path={appLinks.crm.staff.list}>
          <Route index element={<StaffList />} />
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

      <Route
        path="/patient"
        element={
          <ProtectedRoute
            requiredRoles={[Role.Receptionist]}
            element={<Patient />}
          />
        }
      />
    </Routes>
  );
}

export default App;
