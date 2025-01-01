import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  constructor(response: any) {
    super(response, HttpStatus.UNPROCESSABLE_ENTITY); // Set the status to 422
  }
}
