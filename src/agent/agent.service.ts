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
  // async addComment(slug: string, commentData): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //
  //   const comment = new Comment();
  //   comment.body = commentData.body;
  //
  //   agent.comments.push(comment);
  //
  //   await this.commentRepository.save(comment);
  //   agent = await this.agentRepository.save(agent);
  //   return {agent}
  // }
  //
  // async deleteComment(slug: string, id: string): Promise<ArticleRO> {
  //   let agent = await this.agentRepository.findOne({slug});
  //
  //   const comment = await this.commentRepository.findOne(id);
  //   const deleteIndex = agent.comments.findIndex(_comment => _comment.id === comment.id);
  //
  //   if (deleteIndex >= 0) {
  //     const deleteComments = agent.comments.splice(deleteIndex, 1);
  //     await this.commentRepository.delete(deleteComments[0].id);
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
  // async findComments(slug: string): Promise<CommentsRO> {
  //   const agent = await this.agentRepository.findOne({slug});
  //   return {comments: agent.comments};
  // }
  //
  async create(userId: number, agentData: CreateAgentDto): Promise<AgentEntity> {

    let agent = new AgentEntity();
    agent.startDate = agentData.startDate;
    agent.finishDate = agentData.finishDate;

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
