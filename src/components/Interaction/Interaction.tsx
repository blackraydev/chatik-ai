import { ChangeEventHandler, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useConversationsScope, useMessagesScope, useUserScope } from '../../scopes';
import { askChatik } from '../../api';
import { SendIcon } from '../../icons';
import './Interaction.css';

export const Interaction = () => {
  const { user } = useUserScope();
  const { conversationId, createConversation, initializeConversation, setConversationCreated } =
    useConversationsScope();
  const { addMessage, botMessage, setBotMessage } = useMessagesScope();

  const [userPrompt, setUserPrompt] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed && botMessage) {
      addMessage(botMessage);
      setBotMessage(null);
      setCompleted(false);
    }
  }, [completed]);

  const handleCreateConversation = (conversationId: string, prompt: string) => {
    initializeConversation(conversationId);
    createConversation({ userId: user?.id, conversationId, prompt }).then(() => {
      setConversationCreated(true);
    });
  };

  const handleGetResponse = async () => {
    if (!userPrompt) return;

    const targetConversationId = conversationId || v4();

    if (!conversationId) {
      handleCreateConversation(targetConversationId, userPrompt);
    }

    addMessage({ role: 'user', text: userPrompt });
    setBotMessage({ role: 'model', isLoading: true });
    setUserPrompt('');

    try {
      const stream = await askChatik({
        conversationId: targetConversationId,
        userMessage: userPrompt,
      });
      const decoder = new TextDecoder();

      if (!stream) {
        throw new Error('No stream found');
      }

      for await (const chunk of stream) {
        const decodedChunk = decoder.decode(chunk);

        setBotMessage((prev) => ({
          ...prev,
          text: (prev?.text || '') + decodedChunk,
          isLoading: false,
        }));
      }
    } catch (e) {
      setBotMessage((prev) => ({
        ...prev,
        error: 'Something went wrong',
      }));
    } finally {
      setBotMessage((prev) => ({
        ...prev,
        isLoading: false,
      }));
      setCompleted(true);
    }
  };

  const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserPrompt(e.target.value);
  };

  return (
    <div className="interaction">
      <input
        className="user-input"
        placeholder="Send a message..."
        value={userPrompt}
        onChange={handleChangeMessage}
      />
      <button
        className="send-btn"
        disabled={!userPrompt || botMessage?.isLoading}
        onClick={handleGetResponse}
      >
        <SendIcon />
      </button>
    </div>
  );
};
