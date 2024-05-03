import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './adapters/socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new SocketIOAdapter(app));
  await app.listen(5000);
}
bootstrap();
