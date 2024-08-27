import React from "react";
import { Badge, Button, Drawer } from "antd";
import { FaBars, FaPlus, FaRobot } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import { PiBowlFood, PiChat } from "react-icons/pi";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { useChatContext } from "./chat.context";
import moment from "moment";
import "moment/locale/es";
import Chat from "./chat";
import { fetcher } from "@/lib/fetch/fetcher";
import { ConversationType } from "@/types/Chat/types";

moment.locale("es");

const ChatHistory: React.FC = () => {
  const {
    open,
    setOpen,
    getConversationsQuery: query,
    selectedChatID,
    setSelectedChatID,
  } = useChatContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer}>
        <FaRobot />
        <span className="sr-only">Abrir chatbot</span>
      </Button>
      <Drawer
        mask={false}
        title="Chatbot (IA)"
        extra={
          <div className="flex items-center gap-2">
            <Button onClick={() => setSelectedChatID(null)}>
              <FaBars />
              <span className="sr-only">Ir al historial de conversaciones</span>
            </Button>
            <Button
              onClick={async () => {
                // Add new chat
                const response = await fetcher(
                  "/chatbot/conversations/create",
                  { method: "POST" }
                );
                if (response.ok) {
                  query.refetch();
                }
              }}
            >
              <FaPlus />
              <span className="sr-only">Iniciar nueva conversación</span>
            </Button>
            <Button
              onClick={async () => {
                query.refetch();
              }}
            >
              <TbRefresh />
              <span className="sr-only">
                Actualizar lista de conversaciones
              </span>
            </Button>
          </div>
        }
        onClose={onClose}
        open={open}
        width={500}
      >
        {selectedChatID ? (
          <Chat />
        ) : (
          <>
            {query.data && query.data.data.length > 0 && (
              <ul className="flex flex-col gap-2">
                {query.data.data.map((chat) => (
                  <li key={chat.id}>
                    <Button
                      onClick={() => setSelectedChatID(chat.id)}
                      className="flex h-fit w-full items-center justify-between overflow-hidden py-2"
                    >
                      <div className="flex w-full items-center">
                        <Badge
                          offset={[-2, 5]}
                          count={
                            <span className="grid h-5 w-5 place-content-center rounded-full bg-red-600 text-white">
                              {chat.type === ConversationType.DIETA && (
                                <PiBowlFood
                                  style={{ color: "white" }}
                                  size={16}
                                />
                              )}
                              {chat.type === ConversationType.DIAGNOSTICO && (
                                <LiaNotesMedicalSolid
                                  style={{ color: "white" }}
                                  size={16}
                                />
                              )}
                              {chat.type === ConversationType.CHAT && (
                                <PiChat style={{ color: "white" }} size={14} />
                              )}
                            </span>
                          }
                        >
                          <aside className="grid h-10 w-10 shrink-0 place-content-center overflow-hidden rounded-full bg-slate-200">
                            <FaRobot />
                          </aside>
                        </Badge>
                        <div className="ml-3 flex w-full flex-col text-start">
                          <div className="grid text-sm font-medium">
                            <p className="line-clamp-1 ">
                              {chat.last_message_content ||
                                "Nueva conversación"}
                            </p>
                          </div>
                          <footer className="flex w-full justify-between">
                            <span className="text-xs text-gray-500">
                              {moment(
                                chat.last_message_time || chat.created_at
                              ).fromNow()}
                            </span>
                          </footer>
                        </div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default ChatHistory;
