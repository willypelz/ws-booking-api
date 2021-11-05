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
  // async addAgent(slug: string, agentData): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //
  //   const agent = new Agent();
  //   agent.body = agentData.body;
  //
  //   agent.agents.push(agent);
  //
  //   await this.agentRepository.save(agent);
  //   agent = await this.agentRepository.save(agent);
  //   return {agent}
  // }
  //
  // async deleteAgent(slug: string, id: string): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //
  //   const agent = await this.agentRepository.findOne(id);
  //   const deleteIndex = agent.agents.findIndex(_agent => _agent.id === agent.id);
  //
  //   if (deleteIndex >= 0) {
  //     const deleteAgents = agent.agents.splice(deleteIndex, 1);
  //     await this.agentRepository.delete(deleteAgents[0].id);
  //     agent =  await this.agentRepository.save(agent);
  //     return {agent};
  //   } else {
  //     return {agent};
  //   }
  //
  // }
  //
  // async favorite(id: number, slug: string): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //   const user = await this.userRepository.findOne(id);
  //
  //   const isNewFavorite = user.favorites.findIndex(_agent => _agent.id === agent.id) < 0;
  //   if (isNewFavorite) {
  //     user.favorites.push(agent);
  //     agent.favoriteCount++;
  //
  //     await this.userRepository.save(user);
  //     agent = await this.agentRepository.save(agent);
  //   }
  //
  //   return {agent};
  // }
  //
  // async unFavorite(id: number, slug: string): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //   const user = await this.userRepository.findOne(id);
  //
  //   const deleteIndex = user.favorites.findIndex(_agent => _agent.id === agent.id);
  //
  //   if (deleteIndex >= 0) {
  //
  //     user.favorites.splice(deleteIndex, 1);
  //     agent.favoriteCount--;
  //
  //     await this.userRepository.save(user);
  //     agent = await this.agentRepository.save(agent);
  //   }
  //
  //   return {agent};
  // }
  //
  // async findAgents(slug: string): Promise<AgentsRO> {
  //   const agent = await this.agentRepository.findOne({slug});
  //   return {agents: agent.agents};
  // }
  //
  async create(userId: number, agentData: CreateAgentDto): Promise<AgentEntity> {

    let agent = new AgentEntity();
    agent.email = agentData.email;
    agent.name = agentData.name;

    return await this.agentRepository.save(agent);
  }

  // async update(slug: string, agentData: any): Promise<ArticleRO> {
  //   let toUpdate = await this.agentRepository.findOne({ slug: slug});
  //   let updated = Object.assign(toUpdate, agentData);
  //   const agent = await this.agentRepository.save(updated);
  //   return {agent};
  // }
  //
  // async delete(slug: string): Promise<DeleteResult> {
  //   return await this.agentRepository.delete({ slug: slug});
  // }
  //
  // slugify(title: string) {
  //   return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  // }
}
