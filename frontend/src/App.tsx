import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./Pages/Auth/Login";
import CRM from "./Pages/CRM";
import Patient from "./Pages/Patient";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./constants/roles";

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
      />

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
