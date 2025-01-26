export const appLinks = {
  crm: {
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
      create: "/crm/appointments/create",
      details: (id: string) => `/crm/appointments/${id}`,
    },
  },
};

export const crmMenu = [
  { label: "Користувачі", path: appLinks.crm.users.list },
  { label: "Персонал", path: appLinks.crm.staff.list },
  { label: "Пацієнти", path: appLinks.crm.patients.list },
  { label: "Прийоми", path: appLinks.crm.appointments.list },
];
