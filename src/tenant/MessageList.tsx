import React from 'react';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import { TenantMessage } from '../types/tenant';

interface MessageListProps {
  messages: TenantMessage[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-2rem)] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Messages</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isAdmin
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isAdmin ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {format(new Date(message.timestamp), 'MMM dd, h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <form onSubmit={onSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageList;