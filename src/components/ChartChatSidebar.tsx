import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { API, getApiEndpoint } from "../constants";
import type { ChartData } from "../types/chart";
import { useTheme } from "../contexts/ThemeContext";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface ChatResponse {
  answer: string;
  tokens_used: number;
}

interface ChartChatSidebarProps {
  chartData: ChartData;
}

const Sidebar = styled.aside<{ $isLight: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.22)" : "rgba(255,255,255,0.08)"};
  background: ${({ $isLight }) =>
    $isLight
      ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,245,249,0.94))"
      : "linear-gradient(180deg, rgba(10,14,23,0.92), rgba(15,23,42,0.88))"};
  box-shadow: ${({ $isLight }) =>
    $isLight
      ? "0 24px 60px rgba(148, 163, 184, 0.18)"
      : "0 24px 50px rgba(0, 0, 0, 0.24)"};
  backdrop-filter: blur(14px);
`;

const Header = styled.div<{ $isLight: boolean }>`
  padding: 18px 18px 14px;
  border-bottom: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.16)" : "rgba(255,255,255,0.07)"};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p<{ $isLight: boolean }>`
  margin: 6px 0 0;
  font-size: 0.86rem;
  line-height: 1.5;
  color: ${({ $isLight }) =>
    $isLight ? "rgba(51, 65, 85, 0.8)" : "rgba(255,255,255,0.62)"};
`;

const MessageList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Bubble = styled.div<{ $role: "assistant" | "user"; $isLight: boolean }>`
  max-width: 92%;
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  padding: 12px 14px;
  border-radius: 18px;
  white-space: pre-wrap;
  line-height: 1.55;
  font-size: 0.92rem;
  background: ${({ $role, $isLight }) =>
    $role === "user"
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
      : $isLight
        ? "rgba(248, 250, 252, 0.94)"
        : "rgba(255,255,255,0.05)"};
  color: ${({ $role, $isLight }) =>
    $role === "user" ? "#ffffff" : $isLight ? "#0f172a" : "rgba(255,255,255,0.92)"};
  border: 1px solid
    ${({ $role, $isLight }) =>
      $role === "user"
        ? "transparent"
        : $isLight
          ? "rgba(148, 163, 184, 0.14)"
          : "rgba(255,255,255,0.08)"};
`;

const Composer = styled.form<{ $isLight: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px 16px;
  border-top: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.16)" : "rgba(255,255,255,0.07)"};
`;

const TextArea = styled.textarea<{ $isLight: boolean }>`
  width: 100%;
  min-height: 92px;
  resize: vertical;
  border-radius: 16px;
  padding: 12px 14px;
  font: inherit;
  color: ${({ $isLight }) => ($isLight ? "#0f172a" : "rgba(255,255,255,0.92)")};
  background: ${({ $isLight }) =>
    $isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.04)"};
  border: 1px solid
    ${({ $isLight }) =>
      $isLight ? "rgba(148, 163, 184, 0.2)" : "rgba(255,255,255,0.08)"};
  outline: none;

  &::placeholder {
    color: ${({ $isLight }) =>
      $isLight ? "rgba(100, 116, 139, 0.86)" : "rgba(255,255,255,0.42)"};
  }
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const SendButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: #f87171;
  font-size: 0.8rem;
`;

const quickPrompt =
  "Ask about personality, strengths, love style, career direction, or any placement in this chart.";

export function ChartChatSidebar({ chartData }: ChartChatSidebarProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm your astrology guide. Ask me anything about this chart and I'll keep it focused on the placements, aspects, and overall themes.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = messageListRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, loading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(getApiEndpoint(`${API.CHAT}/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
          chart_data: chartData,
        }),
      });

      const payload = (await response.json()) as ChatResponse | { detail?: string };

      if (!response.ok) {
        throw new Error(
          "detail" in payload && payload.detail
            ? payload.detail
            : "The astrology assistant is unavailable right now."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: (payload as ChatResponse).answer,
        },
      ]);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The astrology assistant is unavailable right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <Sidebar $isLight={isLight}>
      <Header $isLight={isLight}>
        <Title>Chart Guide</Title>
        <Subtitle $isLight={isLight}>{quickPrompt}</Subtitle>
      </Header>

      <MessageList ref={messageListRef}>
        {messages.map((message) => (
          <Bubble
            key={message.id}
            $role={message.role}
            $isLight={isLight}
          >
            {message.content}
          </Bubble>
        ))}
        {loading && (
          <Bubble $role="assistant" $isLight={isLight}>
            Reading the chart...
          </Bubble>
        )}
      </MessageList>

      <Composer onSubmit={handleSubmit} $isLight={isLight}>
        <TextArea
          $isLight={isLight}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What stands out in this chart?"
        />
        {error && <ErrorText>{error}</ErrorText>}
        <FooterRow>
          <SendButton type="submit" disabled={loading || !question.trim()}>
            Send
          </SendButton>
        </FooterRow>
      </Composer>
    </Sidebar>
  );
}

export default ChartChatSidebar;
