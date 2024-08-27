import { Pagination } from "../pagination";
import { ConversationType } from "./types";

export enum Role {
  // eslint-disable-next-line unused-imports/no-unused-vars
  USER = "user",
  // eslint-disable-next-line unused-imports/no-unused-vars
  BOT = "bot",
}

export interface ConversationsHistory extends Pagination {
  data: Conversation[];
}

export interface Conversation {
  id: number;
  last_message_content: string;
  last_message_role: string;
  last_message_time: string;
  created_at: string;
  updated_at: string;
  type: ConversationType;
}

export interface Message {
  id: number;
  content: string;
  role: Role;
  created_at: string;
}
