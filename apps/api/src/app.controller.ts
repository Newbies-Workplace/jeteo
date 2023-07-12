import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): any {
    console.log('aaaaa');
    return {
      message: 'This is a test',
      data: {
        name: 'John Doe',
      },
    };
  }
}
