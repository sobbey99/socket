import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'check',
})
export class CheckGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(CheckGateway.name);
  private readonly SOCKET_COMMANDS = {
    DATA: 'DATA',
  };

  private MESSAGES_INTERVALS: { interval: NodeJS.Timeout; id: string }[] = [];

  constructor() {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log('Check Gateway initialized');
  }

  async handleConnection(client: Socket) {
    console.log('CONNECTED ', client.id);

    let counter = 1;
    const interval = setInterval(() => {
      const message = 'MESSAGE# ' + counter;
      client.emit(this.SOCKET_COMMANDS.DATA, {
        clientId: client.id,
        message,
      });
      counter++;
    }, 1000);

    this.MESSAGES_INTERVALS.push({ interval, id: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log('DISCONNECTED ', client.id);

    const idx = this.MESSAGES_INTERVALS.findIndex(
      (item) => item.id == client.id,
    );

    if (idx != -1) {
      clearInterval(this.MESSAGES_INTERVALS[idx].interval);
      this.MESSAGES_INTERVALS.splice(idx, 1);
    }
  }

  //   @SubscribeMessage('terminalCommand')
  //   handleMessage(client: SocketWithAuth, payload: ) {}
}
