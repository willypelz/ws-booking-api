import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { Request } from 'express';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto';
import {AgentRO, AgentsRO} from './agent.interface';
import { User } from '../user/user.decorator';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('agents')
@Controller('agents')
export class AgentController {

  constructor(private readonly agentService: AgentService) {}

  @ApiOperation({ summary: 'Get all agents' })
  @ApiResponse({ status: 200, description: 'Return all agents.'})
  @Get()
  async findAll(@Query() query): Promise<AgentsRO> {
    return await this.agentService.findAll(query);
  }

  //
  // @Get(':slug')
  // async findOne(@Param('slug') slug): Promise<AgentRO> {
  //   return await this.agentService.findOne({slug});
  // }
  //
  // // @Get(':slug/comments')
  // // async findComments(@Param('slug') slug): Promise<CommentsRO> {
  // //   return await this.agentService.findComments(slug);
  // // }
  //
  @ApiOperation({ summary: 'Create agent' })
  @ApiResponse({ status: 201, description: 'The agent has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('agent') agentData: CreateAgentDto) {
    return this.agentService.create(userId, agentData);
  }

  // @ApiOperation({ summary: 'Update agent' })
  // @ApiResponse({ status: 201, description: 'The agent has been successfully updated.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Put(':slug')
  // async update(@Param() params, @Body('agent') agentData: CreateAgentDto) {
  //   // Todo: update slug also when title gets changed
  //   return this.agentService.update(params.slug, agentData);
  // }
  //
  // @ApiOperation({ summary: 'Delete agent' })
  // @ApiResponse({ status: 201, description: 'The agent has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug')
  // async delete(@Param() params) {
  //   return this.agentService.delete(params.slug);
  // }
  // //
  // // @ApiOperation({ summary: 'Create comment' })
  // // @ApiResponse({ status: 201, description: 'The comment has been successfully created.'})
  // // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // // @Post(':slug/comments')
  // // async createComment(@Param('slug') slug, @Body('comment') commentData: CreateCommentDto) {
  // //   return await this.agentService.addComment(slug, commentData);
  // // }
  //
  // @ApiOperation({ summary: 'Delete comment' })
  // @ApiResponse({ status: 201, description: 'The agent has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/comments/:id')
  // async deleteComment(@Param() params) {
  //   const {slug, id} = params;
  //   return await this.agentService.deleteComment(slug, id);
  // }
  //
  // @ApiOperation({ summary: 'Favorite agent' })
  // @ApiResponse({ status: 201, description: 'The agent has been successfully favorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Post(':slug/favorite')
  // async favorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.agentService.favorite(userId, slug);
  // }
  //
  // @ApiOperation({ summary: 'Unfavorite agent' })
  // @ApiResponse({ status: 201, description: 'The agent has been successfully unfavorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/favorite')
  // async unFavorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.agentService.unFavorite(userId, slug);
  // }

}
