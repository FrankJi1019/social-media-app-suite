import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagingService } from './messaging.service';
import { Server } from 'socket.io';
import { Socket } from 'net';
import { HealthCheckDto } from './dto/health-check.dto';

@WebSocketGateway()
export class MessagingGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly messagingService: MessagingService) {}

  @SubscribeMessage('health')
  create(
    @MessageBody() data: HealthCheckDto,
    @ConnectedSocket() client: Socket,
  ) {
    const time = new Date();
    client.emit('hello', { msg: data.msg, time });
  }
}
