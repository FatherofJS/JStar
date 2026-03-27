import styled from "styled-components";

export const PanelContainer = styled.div<{ $isLight: boolean }>`
  margin-top: 0;
  padding: 32px;
  border-radius: 24px;
  background: ${({ $isLight }) => $isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(16, 22, 36, 0.6)"};
  border: 1px solid ${({ $isLight }) => $isLight ? "rgba(148, 163, 184, 0.2)" : "rgba(129, 140, 248, 0.15)"};
  box-shadow: none;
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 16px;
  }
`;

export const SectionTitle = styled.h3<{ $isLight: boolean }>`
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: ${({ $isLight }) => $isLight ? "#1e293b" : "#f1f5f9"};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IntroText = styled.p<{ $isLight: boolean }>`
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${({ $isLight }) => $isLight ? "#475569" : "#cbd5e1"};
  margin-bottom: 32px;
`;

export const Table = styled.div<{ $isLight: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TableRow = styled.div<{ $isLight: boolean; $columns?: string }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || "140px 1fr"};
  padding: 16px;
  border-radius: 12px;
  background: ${({ $isLight }) => $isLight ? "rgba(248, 250, 252, 0.8)" : "rgba(255, 255, 255, 0.03)"};
  border: 1px solid ${({ $isLight }) => $isLight ? "rgba(148, 163, 184, 0.1)" : "rgba(255, 255, 255, 0.05)"};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const LabelWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowTitle = styled.div<{ $isLight: boolean }>`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${({ $isLight }) => $isLight ? "#0f172a" : "#fff"};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RowSubtitle = styled.div<{ $isLight: boolean }>`
  font-size: 0.85rem;
  color: ${({ $isLight }) => $isLight ? "#64748b" : "rgba(255, 255, 255, 0.5)"};
  margin-top: 4px;
`;

export const RowContent = styled.div<{ $isLight: boolean }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ $isLight }) => $isLight ? "#334155" : "rgba(255, 255, 255, 0.85)"};
`;

export const Divider = styled.hr<{ $isLight: boolean }>`
  border: none;
  height: 1px;
  background: ${({ $isLight }) => $isLight ? "rgba(148, 163, 184, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  margin: 40px 0;
`;
