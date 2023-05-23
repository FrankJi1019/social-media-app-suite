import { Socket } from 'socket.io';

export interface SocketMapping {
  [name: string]: Socket;
}
