import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) return exception.getStatus();

    const code = this.getSupabaseCode(exception);
    if (code === 'PGRST116') return HttpStatus.NOT_FOUND;
    if (code === '23505') return HttpStatus.CONFLICT;
    if (code === '23503') return HttpStatus.BAD_REQUEST;
    return HttpStatus.BAD_GATEWAY;
  }

  private getMessage(exception: unknown): string | string[] {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') return body;
      if (typeof body === 'object' && body !== null && 'message' in body) {
        return (body as { message: string | string[] }).message;
      }
    }

    if (exception instanceof Error) return exception.message;
    if (typeof exception === 'object' && exception !== null && 'message' in exception) {
      return String((exception as { message: unknown }).message);
    }
    return 'Erro interno ao processar a solicitação';
  }

  private getSupabaseCode(exception: unknown): string | undefined {
    if (typeof exception !== 'object' || exception === null || !('code' in exception)) {
      return undefined;
    }
    return String((exception as { code: unknown }).code);
  }
}