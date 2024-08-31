// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from './redis/redis.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {}

  afterInit() {
    console.log('WebSocket server initialized');
    this.redisService.subscriber.subscribe('chat_channel');
    this.redisService.subscriber.on('message', (channel, message) => {
      console.log('Received message:', message, 'from channel:', channel);
      this.server.emit('message', message);
    });
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Received message:', message);
    // Broadcast the received message to all connected clients
    this.server.emit('message', message);

    // Optionally, you can also publish the message to Redis for further processing
    this.redisService.publisher.publish('chat_channel', message);
  }
}
