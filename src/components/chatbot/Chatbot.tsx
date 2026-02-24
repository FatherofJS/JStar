// Chatbot Component - Cosmic themed chatbot for zodiac questions
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChatbotApi, useFallbackResponses, detectLanguage, type ChatLanguage } from "../../hooks/useChatbotApi";
import {
  ChatContainer,
  ChatButton,
  ChatWindow,
  ChatHeader,
  ChatHeaderLeft,
  ChatAvatar,
  ChatTitle,
  ChatTitleText,
  ChatStatus,
  CloseButton,
  MessagesContainer,
  MessageBubble,
  TypingIndicator,
  TypingDot,
  InputArea,
  ChatInput,
  SendButton,
  QuickReplies,
  QuickReplyButton,
} from "./Chatbot.styles";

// Message type
interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use chatbot API hook
  const { sendMessage: apiSendMessage } = useChatbotApi();
  const { getResponse, getWelcomeMessage, getQuickReplies } = useFallbackResponses();

  // Initialize welcome message on mount
  useEffect(() => {
    const initialMessage: Message = {
      id: 0,
      text: getWelcomeMessage('vi'),
      isUser: false,
    };
    setMessages([initialMessage]);
  }, [getWelcomeMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send message handler
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Try API first
      const result = await apiSendMessage(text.trim());
      
      // Add bot response
      const botMessage: Message = {
        id: Date.now() + 1,
        text: result.reply,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setUseFallback(result.isFallback);
    } catch (error) {
      // Use fallback response
      const currentLang: ChatLanguage = detectLanguage(text.trim());
      const fallbackResponse = getResponse(text.trim(), currentLang);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: fallbackResponse,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setUseFallback(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Handle quick reply click
  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  // Get quick replies based on current language
  const currentLang: ChatLanguage = detectLanguage(messages.length > 0 ? messages[0].text : '');
  const quickReplies = getQuickReplies(currentLang);

  return (
    <ChatContainer>
      <ChatWindow $isOpen={isOpen}>
        <ChatHeader>
          <ChatHeaderLeft>
            <ChatAvatar>🌟</ChatAvatar>
            <ChatTitle>
              <ChatTitleText>JStar Assistant</ChatTitleText>
              <ChatStatus>{useFallback ? "Offline" : "Online"}</ChatStatus>
            </ChatTitle>
          </ChatHeaderLeft>
          <CloseButton onClick={toggleChat}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((message) => (
            <MessageBubble key={message.id} $isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          ))}
          {isTyping && (
            <TypingIndicator>
              <TypingDot $delay={0} />
              <TypingDot $delay={0.2} />
              <TypingDot $delay={0.4} />
            </TypingIndicator>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        {messages.length <= 1 && !isTyping && (
          <QuickReplies>
            {quickReplies.map((reply, index) => (
              <QuickReplyButton key={index} onClick={() => handleQuickReply(reply)}>
                {reply}
              </QuickReplyButton>
            ))}
          </QuickReplies>
        )}

        <InputArea onSubmit={handleSubmit}>
          <ChatInput
            ref={inputRef}
            type="text"
            placeholder="Nhập câu hỏi... / Enter question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <SendButton type="submit" disabled={!inputValue.trim() || isTyping}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </SendButton>
        </InputArea>
      </ChatWindow>

      <ChatButton onClick={toggleChat} aria-label="Open chat">
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </ChatButton>
    </ChatContainer>
  );
}

