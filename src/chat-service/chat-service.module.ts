import { Module } from '@nestjs/common';
import { ChatServiceController } from './chat-service.controller';
import { ChatServiceService } from './chat-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
import { RedisModule } from './redis/redis.module';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    RedisModule,
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    UserModule,
  ],
  controllers: [ChatServiceController],
  providers: [ChatServiceService, ChatGateway],
})
export class ChatServiceModule {}
