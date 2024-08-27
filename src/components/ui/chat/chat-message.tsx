import { Message, Role } from "@/types/Chat";
import { Avatar } from "antd";
import moment from "moment";
import { FaRobot, FaUser } from "react-icons/fa";
import Markdown from "react-markdown";

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <li
      className={`flex h-fit items-start ${
        message.role === Role.USER ? "ml-8 flex-row-reverse" : "mr-8"
      }`}
      id={message.id.toString()}
    >
      <Avatar
        alt="avatar"
        className="shrink-0"
        style={{
          backgroundColor: message.role === Role.BOT ? "#f56565" : "#00b87c",
        }}
      >
        {message.role === Role.BOT ? <FaRobot /> : <FaUser />}
      </Avatar>
      <div className="ml-3 flex flex-col rounded-md bg-neutral-100 p-2">
        <div className="text-xs">
          {typeof message.content === "string" ? (
            <Markdown>{message.content}</Markdown>
          ) : (
            <span>{message.content}</span>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {moment(message.created_at).fromNow()}
        </span>
      </div>
    </li>
  );
};
export default ChatMessage;
