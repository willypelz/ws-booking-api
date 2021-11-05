import { UserData } from '../user/user.interface';
import { AgentEntity } from './agent.entity';

interface AgentData {
  name: string
  email: string
}

export interface AgentRO {
  agent: AgentEntity;
}

export interface AgentsRO {
  agents: AgentEntity[];
  agentsCount: number;
}

