import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, DeleteResult} from 'typeorm';
import {AgentEntity} from './agent.entity';
import {UserEntity} from '../user/user.entity';
import {CreateAgentDto} from './dto';

import {AgentRO, AgentsRO} from './agent.interface';

const slug = require('slug');

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly agentRepository: Repository<AgentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async findAll(query): Promise<AgentsRO> {

    const qb = await getRepository(AgentEntity)
      .createQueryBuilder('agent')
      .leftJoinAndSelect('agent.userId', 'userId');

    qb.where("1 = 1");
    qb.orderBy('agent.created', 'DESC');
    const agentsCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const agents = await qb.getMany();
    return {agents, agentsCount};
  }


  async findOne(where): Promise<AgentRO> {
    const agent = await this.agentRepository.findOne(where);
    return {agent};
  }

  //
  async addAgent(slug: string, agentData): Promise<AgentEntity> {

    let agent = new AgentEntity();
    agent.name = agentData.name;
    agent.email = agentData.email;
    agent = await this.agentRepository.save(agent);
    return {agent}
  }

  //
  async create(userId: number, agentData: CreateAgentDto): Promise<AgentEntity> {

    let agent = new AgentEntity();
    agent.email = agentData.email;
    agent.name = agentData.name;

    return await this.agentRepository.save(agent);
  }

  async update(slug: string, agentData: any): Promise<ArticleRO> {
    let toUpdate = await this.agentRepository.findOne({ slug: slug});
    let updated = Object.assign(toUpdate, agentData);
    const agent = await this.agentRepository.save(updated);
    return {agent};
  }

  async delete(slug: string): Promise<DeleteResult> {
    // return await this.agentRepository.delete({ slug: slug});
  }

}
