import { AppDataSource } from '../ormconfig';
import { User, UserRole } from '../entities/user.entity';
import { Patient } from '../entities/patient.entity';
import { Employee } from '../entities/employee.entity';
import { UserDetail } from '../entities/user-detail.entity';

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const patientRepository = AppDataSource.getRepository(Patient);
  const employeeRepository = AppDataSource.getRepository(Employee);
  const userDetailsRepository = AppDataSource.getRepository(UserDetail);

  // Додати пацієнта
  const patientUser = userRepository.create({
    username: 'patient1',
    email: 'patient1@example.com',
    password: 'password',
    role: UserRole.PATIENT,
  });
  await userRepository.save(patientUser);

  const patient = patientRepository.create({
    first_name: 'John',
    last_name: 'Doe',
    phone: '123-456-7890',
    date_of_birth: '1980-01-01',
    address: '123 Main St',
  });
  await patientRepository.save(patient);

  const patientDetails = userDetailsRepository.create({
    user: patientUser,
    patient,
  });
  await userDetailsRepository.save(patientDetails);

  // Додати працівника
  const employeeUser = userRepository.create({
    username: 'doctor1',
    email: 'doctor1@example.com',
    password: 'password',
    role: UserRole.DOCTOR,
  });
  await userRepository.save(employeeUser);

  const employee = employeeRepository.create({
    first_name: 'Alice',
    last_name: 'Smith',
    phone: '987-654-3210',
    specialization: 'Dentist',
  });
  await employeeRepository.save(employee);

  const employeeDetails = userDetailsRepository.create({
    user: employeeUser,
    employee,
  });
  await userDetailsRepository.save(employeeDetails);

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
});
