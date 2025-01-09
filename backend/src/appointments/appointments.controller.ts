import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { PaginationDto } from 'src/dtos/pagination-dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(Role.Admin, Role.Receptionist, Role.Dentist)
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Receptionist, Role.Dentist)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.appointmentsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Receptionist, Role.Dentist)
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Receptionist, Role.Dentist)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Roles(Role.Admin, Role.Receptionist, Role.Dentist)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
