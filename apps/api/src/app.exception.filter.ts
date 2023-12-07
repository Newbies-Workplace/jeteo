import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpServer) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    const responseBody = {
      statusCode: httpStatus,
      message: message,
      path: this.httpAdapterHost.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    this.httpAdapterHost.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
