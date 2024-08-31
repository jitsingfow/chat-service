import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redisPublisher: Redis;
  private readonly redisSubscriber: Redis;

  constructor() {
    this.redisPublisher = new Redis({ host: 'redis', port: 6379 });
    this.redisSubscriber = new Redis({ host: 'redis', port: 6379 });
  }

  get publisher(): Redis {
    return this.redisPublisher;
  }

  get subscriber(): Redis {
    return this.redisSubscriber;
  }

  async onModuleDestroy() {
    await this.redisPublisher.quit();
    await this.redisSubscriber.quit();
  }
}
