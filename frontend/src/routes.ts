import { Role } from "./constants/roles";

export const appLinks = {
  crm: {
    index: "/crm",
    users: {
      list: "/crm/users",
      create: "/crm/users/create",
      details: (id: string) => `/crm/users/${id}`,
    },
    staff: {
      list: "/crm/staff",
      create: "/crm/staff/create",
      details: (id: string) => `/crm/staff/${id}`,
    },
    patients: {
      list: "/crm/patients",
      create: "/crm/patients/create",
      details: (id: string) => `/crm/patients/${id}`,
    },
    appointments: {
      list: "/crm/appointments",
    },
    treatments: {
      list: "/crm/treatments",
    },
  },
};

export const crmMenu = [
  { label: "Користувачі", path: appLinks.crm.users.list },
  { label: "Персонал", path: appLinks.crm.staff.list },
  { label: "Пацієнти", path: appLinks.crm.patients.list },
  { label: "Прийоми", path: appLinks.crm.appointments.list },
  { label: "Послуги лікуваня", path: appLinks.crm.treatments.list },
];
