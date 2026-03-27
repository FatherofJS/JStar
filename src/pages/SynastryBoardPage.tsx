import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { Background } from '../components/layout/Background';
import { SynastryBoard } from '../components/panels/SynastryBoard';
import { useTheme } from '../theme';
import type { SynastryData } from '../types/chart';

const PageWrapper = styled.div<{ $isLight: boolean }>`
  min-height: 100vh;
  padding: 100px 24px 60px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const BackButton = styled.button<{ $isLight: boolean }>`
  position: absolute;
  top: 40px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ $isLight }) =>
    $isLight ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  background: ${({ $isLight }) =>
    $isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(20, 20, 30, 0.6)'};
  color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#a5b4fc')};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  z-index: 10;

  &:hover {
    transform: scale(1.1) translateX(-2px);
    background: ${({ $isLight }) =>
      $isLight ? 'rgba(255, 255, 255, 1)' : 'rgba(40, 40, 60, 0.8)'};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: ${({ $isLight }) =>
      $isLight ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.3)'};
  }

  @media (max-width: 768px) {
    top: 24px;
    left: 16px;
    width: 40px;
    height: 40px;
  }
`;

const EmptyState = styled.div<{ $isLight: boolean }>`
  text-align: center;
  padding: 80px 24px;
  color: ${({ $isLight }) => ($isLight ? '#64748b' : '#94a3b8')};

  h2 {
    font-size: 1.8rem;
    margin-bottom: 16px;
    color: ${({ $isLight }) => ($isLight ? '#1e293b' : '#e2e8f0')};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto 32px;
  }
`;

export default function SynastryBoardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const cachedData = (() => {
    try {
      const raw = sessionStorage.getItem('jstar_synastry_cache');
      if (raw) return JSON.parse(raw) as SynastryData;
    } catch { /* ignore */ }
    return null;
  })();

  return (
    <Layout>
      <Background />
      <PageWrapper $isLight={isLight}>
        {cachedData ? (
          <SynastryBoard data={cachedData} isLight={isLight} onBack={() => navigate(-1)} />
        ) : (
          <>
            <BackButton $isLight={isLight} onClick={() => navigate(-1)} aria-label="Go back">
              <IconArrowLeft size={24} stroke={1.5} />
            </BackButton>
            <EmptyState $isLight={isLight}>
              <h2>Chưa có dữ liệu tương hợp</h2>
              <p>
                Bạn cần tạo bản đồ tương hợp trước để xem Aesthetic Board song hành. Hai vũ trụ, hai thẩm mỹ!
              </p>
              <BackButton $isLight={isLight} onClick={() => navigate('/star-chart')}>
                → Tạo Bản Đồ Tương Hợp
              </BackButton>
            </EmptyState>
          </>
        )}
      </PageWrapper>
    </Layout>
  );
}
