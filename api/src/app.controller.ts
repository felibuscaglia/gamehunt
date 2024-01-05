import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  checkHealth() {
    return HttpStatus.OK;
  }
}
