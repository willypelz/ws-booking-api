import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './agent.entity';
import { UserEntity } from '../user/user.entity';
import { AgentService } from './agent.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity, UserEntity]), UserModule],
  providers: [AgentService],
  controllers: [
    AgentController
  ]
})
export class AgentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'agents', method: RequestMethod.GET},
        {path: 'agents', method: RequestMethod.POST},
        {path: 'agents/:slug', method: RequestMethod.DELETE},
        {path: 'agents/:slug', method: RequestMethod.PUT}
      )
  }
}
