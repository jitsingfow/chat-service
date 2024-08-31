import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';

@Controller('chat')
export class ChatServiceController {
  constructor(private readonly chatService: ChatServiceService) {}

  @Post('send')
  async sendMessage(
    @Body() body: { sender: string; receiver: string; content: string },
  ): Promise<string> {
    await this.chatService.sendMessage(
      body.sender,
      body.receiver,
      body.content,
    );
    return 'Message sent';
  }

  @Get('messages')
  async getMessages(
    @Query('sender') sender: string,
    @Query('receiver') receiver: string,
  ): Promise<any[]> {
    const messages = await this.chatService.getMessages(sender, receiver);
    return messages.map((message) => ({
      sender: message.sender,
      receiver: message.receiver,
      content: message.content,
      timestamp: message.timestamp,
    }));
  }
}
