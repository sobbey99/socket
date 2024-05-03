import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    this.logger.log('Configuring SocketIO server with open CORS options');
    const io: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    return io;
  }
}
