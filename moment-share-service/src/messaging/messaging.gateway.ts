import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessagingService } from './messaging.service';
import { Server, Socket } from 'socket.io';
import { HealthCheckDto } from './dto/health-check.dto';
import { MessageSentDto } from './dto/message-sent.dto';
import { SocketMapping } from '../types/socket';
import { NotImplementedException } from '@nestjs/common';
import { RegisterClientDto } from './dto/register-client.dto';

@WebSocketGateway()
export class MessagingGateway {
  @WebSocketServer()
  wss: Server;

  private onlineUsers: SocketMapping = {};

  constructor(private readonly messagingService: MessagingService) {}

  @SubscribeMessage('health')
  getHealth(
    @MessageBody() data: HealthCheckDto,
    @ConnectedSocket() client: Socket,
  ) {
    const time = new Date();
    client.emit('hello', { msg: data.msg, time });
  }

  @SubscribeMessage('register')
  registerClient(
    @MessageBody() data: RegisterClientDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.onlineUsers[data.accountName] = client;
    client.emit('greet', { msg: `Hi ${data.accountName}` });
  }

  @SubscribeMessage('deregister')
  deregisterClient(@ConnectedSocket() client: Socket) {
    const accountName = Object.entries(this.onlineUsers).find(
      ([, socket]) => socket.id === client.id,
    )[0];
    this.onlineUsers[accountName] = undefined;
    client.emit('greet', { msg: `Bye ${accountName}` });
  }

  @SubscribeMessage('message-sent')
  async handleMessageSent(
    @MessageBody() data: MessageSentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.messagingService.handleMessageSent(
      data.senderUsername,
      data.receiverUsername,
      data.content,
    );
    client.emit('message-received', chat);
    const receiverSocket = this.onlineUsers[data.receiverUsername];
    if (receiverSocket) {
      receiverSocket.emit('message-received', chat);
    }
  }
}
