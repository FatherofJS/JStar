import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IconX } from "@tabler/icons-react";
import { API, getApiEndpoint } from "../../constants";
import type { ChartData, SynastryData } from "../../types/chart";
import { useTheme } from "../../theme";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

interface ChatResponse {
  answer: string;
  tokens_used: number;
}

interface ChatPopupProps {
  chartData: ChartData | SynastryData;
  chartType: 'natal' | 'synastry';
  isOpen: boolean;
  onClose: () => void;
}

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(40px) scale(0.95); }
`;

const PopupContainer = styled.div<{ $isLight: boolean; $isClosing: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 380px;
  height: 600px;
  max-height: calc(100dvh - 120px);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ $isLight }) => $isLight ? "rgba(148, 163, 184, 0.22)" : "rgba(255,255,255,0.08)"};
  background: ${({ $isLight }) => $isLight ? "rgba(255, 255, 255, 0.98)" : "rgba(10, 14, 23, 0.96)"};
  box-shadow: ${({ $isLight }) => $isLight ? "0 24px 60px rgba(148, 163, 184, 0.25)" : "0 24px 50px rgba(0, 0, 0, 0.4)"};
  backdrop-filter: blur(14px);
  transform-origin: bottom right;
  animation: ${({ $isClosing }) => $isClosing ? css`${slideDown} 0.25s ease forwards` : css`${slideUp} 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)`};

  @media (max-width: 480px) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
    border: none;
    z-index: 10000;
  }
`;

const Header = styled.div<{ $isLight: boolean }>`
  padding: 18px 18px 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ $isLight }) => $isLight ? "rgba(148, 163, 184, 0.16)" : "rgba(255,255,255,0.07)"};
`;

const TitleBlock = styled.div``;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p<{ $isLight: boolean }>`
  margin: 6px 0 0;
  font-size: 0.86rem;
  line-height: 1.5;
  color: ${({ $isLight }) => $isLight ? "rgba(51, 65, 85, 0.8)" : "rgba(255,255,255,0.62)"};
`;

const CloseButton = styled.button<{ $isLight: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ $isLight }) => $isLight ? "rgba(15, 23, 42, 0.5)" : "rgba(255,255,255,0.5)"};
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ $isLight }) => $isLight ? "rgba(15, 23, 42, 0.05)" : "rgba(255,255,255,0.1)"};
    color: ${({ $isLight }) => $isLight ? "rgba(15, 23, 42, 0.9)" : "rgba(255,255,255,0.9)"};
  }

  @media (min-width: 481px) {
    display: none; /* Hide on desktop since FAB toggles it */
  }
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
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
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
  
  @media (max-width: 480px) {
    padding-bottom: env(safe-area-inset-bottom, 24px);
  }
`;

const TextArea = styled.textarea<{ $isLight: boolean }>`
  width: 100%;
  min-height: 50px;
  max-height: 120px;
  resize: none;
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
  word-wrap: break-word;
  word-break: break-word;

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

const ErrorTextPopup = styled.p`
  margin: 0;
  color: #f87171;
  font-size: 0.8rem;
`;

export function ChatPopup({ chartData, chartType, isOpen, onClose }: ChatPopupProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: chartType === 'synastry'
        ? "Chào, tớ là JStar. Tớ xem bản đồ sao của hai người để hiểu cách hai bạn tác động lên nhau. Gửi chart qua, tớ xem cho."
        : "Chào, tớ là JStar. Tớ đọc bản đồ sao để bạn hiểu rõ hơn về bản thân mình. Gửi chart của bạn qua nhé."
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mount/unmount animations
  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
      setIsClosing(false);
    } else if (!isOpen && mounted && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setMounted(false);
        setIsClosing(false);
      }, 250); // wait for exit animation
    }
  }, [isOpen, mounted, isClosing]);

  useEffect(() => {
    setMessages((prev) => {
      const newArr = [...prev];
      if (newArr.length > 0 && newArr[0].id === 'welcome') {
        newArr[0] = {
          ...newArr[0],
          content: chartType === 'synastry'
            ? "Chào, tớ là JStar. Tớ xem bản đồ sao của hai người để hiểu cách hai bạn tác động lên nhau. Có gì thắc mắc cứ hỏi nhé, tớ xem cho."
            : "Chào, tớ là JStar. Tớ đọc bản đồ sao để bạn hiểu rõ hơn về bản thân mình. Cứ gửi câu hỏi của bạn qua nhé."
        };
      }
      return newArr;
    });
  }, [chartType]);

  useEffect(() => {
    const list = messageListRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, loading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question || loading) return;

    if (question.length > 200) {
      setError("Câu hỏi quá dài (tối đa 200 ký tự).");
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setError(null);
    setLoading(true);

    // Force the AI to respond in Vietnamese with a slightly unhinged persona
    const promptWithInstruction = `${question}\n\n[SYSTEM INSTRUCTION: Please respond ENTIRELY in Vietnamese. Adopt a slightly funny, sarcastic, and unhinged 'mỏ hỗn' gen-z astrology reader persona. Do not use em-dashes. Keep the styling clean with newlines.]`;

    try {
      const response = await fetch(getApiEndpoint(`${API.CHAT}/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': '69420'
        },
        body: JSON.stringify({
          question: promptWithInstruction,
          chart_data: chartData,
          chart_type: chartType
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

  if (!mounted) return null;

  return (
    <PopupContainer $isLight={isLight} $isClosing={isClosing} className="chat-popup-container">
      <Header $isLight={isLight}>
        <TitleBlock>
          <Title>Trợ Lý Tâm Linh</Title>
          <Subtitle $isLight={isLight}>Giải ngải &amp; Đọc vị</Subtitle>
        </TitleBlock>
        <CloseButton $isLight={isLight} onClick={onClose} aria-label="Close chat">
          <IconX size={20} />
        </CloseButton>
      </Header>

      <MessageList ref={messageListRef}>
        {messages.map((msg) => (
          <Bubble key={msg.id} $role={msg.role} $isLight={isLight}>
            {msg.content}
          </Bubble>
        ))}
        {loading && (
          <Bubble $role="assistant" $isLight={isLight}>
            <span style={{ opacity: 0.6 }}>Đang nghĩ...</span>
          </Bubble>
        )}
      </MessageList>

      <Composer $isLight={isLight} onSubmit={handleSubmit}>
        <TextArea
          $isLight={isLight}
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          maxLength={200}
          placeholder="Nhập câu hỏi của bạn vào đây nhé."
          disabled={loading}
        />
        <FooterRow>
          {error ? (
            <ErrorTextPopup>{error}</ErrorTextPopup>
          ) : (
            <div style={{ fontSize: '12px', color: isLight ? '#94a3b8' : '#64748b', opacity: 0.8 }}>
              {question.length}/200
            </div>
          )}
          <SendButton type="submit" disabled={!question || question.length > 200 || loading}>
            {loading ? "Đang gửi..." : "Gửi"}
          </SendButton>
        </FooterRow>
      </Composer>
    </PopupContainer>
  );
}
