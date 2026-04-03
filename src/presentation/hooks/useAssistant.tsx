import { useEffect, useState } from 'react';
import { generateId } from '../../config';
import { createThreadUseCase, postQuestionUseCase } from '../../core/use-cases';

interface Message {
  id: string;
  text: string;
  isGpt: boolean;
}

export const useAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const loadThreadId = async () => {
      try {
        const threadId = localStorage.getItem('threadId');
        if (threadId) {
          setThreadId(threadId);
        } else {
          const resp = await createThreadUseCase();
          if (resp && resp.ok && resp.threadId) {
            localStorage.setItem('threadId', resp.threadId);
            setThreadId(resp.threadId);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadThreadId();
  }, []);

  useEffect(() => {
    const addThreadIdMessage = () => {
      if (threadId) {
        setMessages(prev => [...prev, { id: generateId(), text: `**Thread ID:** ${threadId}`, isGpt: true }]);
      }
    };
    addThreadIdMessage();
  }, [threadId]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: generateId(), text, isGpt: false }]);

    if (!threadId) return;
    const resp = await postQuestionUseCase(threadId, text);
    setIsLoading(false);

    if (resp && resp.ok && resp.message) {
      resp.message.forEach(message => {
        const content = message.content.join(' ');
        setMessages(prev => [...prev, { id: generateId(), text: content, isGpt: message.role === 'assistant' }]);
      });
    }
  };
  return { messages, isLoading, handlePost };
};
