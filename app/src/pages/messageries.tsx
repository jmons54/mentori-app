import React, { useState } from 'react';

import { Search, Send } from 'lucide-react';
import { Card } from '../components/card';
import { Input } from '../components/input';
import { Button } from '../components/button';

export const Messageries = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  interface Contact {
    id: number;
    name: string;
    photo: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: boolean;
  }

  interface Message {
    id: number;
    conversationId: number;
    sender: 'me' | 'other';
    content: string;
    timestamp: string;
  }

  const contacts: Contact[] = [
    /* ... */
  ];
  const messages: Message[] = [
    /* ... */
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conversationMessages = messages.filter(
    (message) => message.conversationId === selectedConversation
  );

  const selectedContactInfo = contacts.find(
    (contact) => contact.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    setMessageInput('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-mentori-green mb-6">
        Messagerie
      </h1>

      <div className="flex flex-col md:flex-row h-[70vh] gap-4">
        {/* Liste des contacts */}
        <div className="md:w-1/3 h-full">
          <Card className="h-full flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Rechercher un contact..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedConversation(contact.id)}
                  className={`flex items-center p-3 border-b cursor-pointer transition-colors ${
                    selectedConversation === contact.id
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={contact.photo}
                        alt={contact.name}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    {contact.unread && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-mentori-orange rounded-full"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-mentori-green font-medium truncate">
                        {contact.name}
                      </p>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {contact.lastMessageTime}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        contact.unread
                          ? 'text-mentori-green font-semibold'
                          : 'text-gray-600'
                      }`}
                    >
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  Aucun contact trouvé.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Conversation */}
        <div className="md:w-2/3 h-full">
          <Card className="h-full flex flex-col">
            {selectedContactInfo ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                  <img
                    src={selectedContactInfo.photo}
                    alt={selectedContactInfo.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h3 className="text-mentori-green font-medium">
                    {selectedContactInfo.name}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'me'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-[80%] text-sm ${
                          message.sender === 'me'
                            ? 'bg-mentori-green text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs text-right mt-1 opacity-70">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t">
                  <div className="flex">
                    <Input
                      placeholder="Écrivez un message..."
                      className="flex-1"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleSendMessage()
                      }
                    />
                    <Button
                      className="ml-2 bg-mentori-green hover:bg-mentori-green/90"
                      onClick={handleSendMessage}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Sélectionnez une conversation pour commencer.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
