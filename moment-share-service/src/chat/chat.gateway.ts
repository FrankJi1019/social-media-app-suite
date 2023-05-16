import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { HealthCheckDto } from './dto/health-check.dto';
import { Socket } from 'net';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('health')
  create(
    @MessageBody() data: HealthCheckDto,
    @ConnectedSocket() client: Socket,
  ) {
    const time = new Date();
    client.emit('hello', { msg: data.msg, time });
  }
}
