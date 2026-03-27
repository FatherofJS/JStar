import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { SynastryData, Planet, Angle } from '../../types/chart';
import { API } from '../../constants';
import * as S from '../gallery/Gallery.styles';
import { ImageZoomModal } from '../ui/ImageZoomModal';
import { IconArrowLeft, IconArrowsShuffle } from '@tabler/icons-react';

const BOARD_CLOUD = import.meta.env.VITE_CLOUDINARY_BOARD_CLOUD_NAME || 'dqf4atcvo';
const cloudUrl = (id: string, w = 600) =>
  `https://res.cloudinary.com/${BOARD_CLOUD}/image/upload/f_auto,q_auto,w_${w},c_fill/${id}`;

type Manifest = Record<string, Record<string, string[]>>;
interface BoardImage { id: string; src: string; sourceSign: string }

const SIGNS_VI: Record<string, string> = {
  Aries: 'Bạch Dương', Taurus: 'Kim Ngưu', Gemini: 'Song Tử',
  Cancer: 'Cự Giải', Leo: 'Sư Tử', Virgo: 'Xử Nữ',
  Libra: 'Thiên Bình', Scorpio: 'Bọ Cạp', Sagittarius: 'Nhân Mã',
  Capricorn: 'Ma Kết', Aquarius: 'Bảo Bình', Pisces: 'Song Ngư'
};

const FALLBACK_CATEGORIES = ['Others', 'Fashion', 'Đồ vật'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPersonBoard(planets: Planet[], angles: Angle[], manifest: Manifest): BoardImage[] {
  const sign = (name: string) => planets.find(p => p.name === name)?.sign;
  const sunSign = sign('Sun') || 'Aries';
  const moonSign = sign('Moon') || sunSign;
  const ascSign = angles?.find(a => a.name === 'ASC')?.sign || sunSign;
  const venusSign = sign('Venus') || sunSign;
  const marsSign = sign('Mars') || sunSign;
  const mercurySign = sign('Mercury') || sunSign;

  const pool: BoardImage[] = [];
  const used = new Set<string>();

  const pick = (s: string, cat: string, n: number, label: string) => {
    const sd = manifest[s];
    if (!sd) return;
    let avail = [...(sd[cat] || [])];
    for (const fb of FALLBACK_CATEGORIES) {
      if (avail.length >= n) break;
      avail.push(...(sd[fb] || []));
    }
    shuffle(avail.filter(id => !used.has(id)))
      .slice(0, n)
      .forEach(id => {
        used.add(id);
        pool.push({ id, src: cloudUrl(id), sourceSign: `${SIGNS_VI[s]} (${label})` });
      });
  };

  pick(sunSign, 'Quotes', 4, 'Sun');
  pick(sunSign, 'Hành tinh', 3, 'Sun');
  pick(sunSign, 'Fashion', 5, 'Sun');
  pick(sunSign, 'Others', 3, 'Sun');
  pick(moonSign, 'Others', 3, 'Moon');
  pick(moonSign, 'Đồ vật', 2, 'Moon');
  pick(ascSign, 'Fashion', 3, 'Rising');
  pick(ascSign, 'Đồ vật', 3, 'Rising');
  pick(venusSign, 'Đồ ăn', 3, 'Venus');
  pick(venusSign, 'Fashion', 3, 'Venus');
  pick(marsSign, 'Đồ vật', 3, 'Mars');
  pick(marsSign, 'Others', 2, 'Mars');
  pick(mercurySign, 'Đồ vật', 2, 'Mercury');

  return shuffle(pool).slice(0, 20);
}

// ── Styled Components ──

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BoardContainer = styled.div<{ $isLight: boolean }>`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 60px 0;
  background: transparent;
  animation: ${fadeIn} 0.6s ease-out;
  @media (max-width: 768px) { padding: 40px 0; }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const BackArrow = styled.button<{ $isLight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#a5b4fc')};
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover { transform: translateX(-4px); }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 15px;
  text-transform: uppercase;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #4f46e5, #818cf8, #4f46e5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  @media (max-width: 900px) { font-size: 2.5rem; }
  @media (max-width: 500px) { font-size: 1.8rem; }
`;

const Subtitle = styled.p<{ $isLight: boolean }>`
  font-size: 1.1rem;
  color: ${({ $isLight }) => ($isLight ? '#64748b' : '#a0a0a0')};
  max-width: 700px;
  margin: 16px auto 0;
  line-height: 1.6;
  letter-spacing: 0.5px;
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 90%;
  max-width: none;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const PersonColumn = styled.div``;

const PersonLabel = styled.div<{ $isLight: boolean }>`
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#818cf8')};
  padding-bottom: 14px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ $isLight }) =>
    $isLight ? 'rgba(99, 102, 241, 0.2)' : 'rgba(129, 140, 248, 0.15)'};
`;

const FloatingShuffleButton = styled.button<{ $isLight: boolean }>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $isLight }) => $isLight ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.4)'};
  background: ${({ $isLight }) =>
    $isLight
      ? 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,255,0.8))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(12,16,24,0.7))'};
  color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#818cf8')};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  z-index: 50;
  &:hover {
    transform: scale(1.1) rotate(15deg);
    border-color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#818cf8')};
  }
  &:active { transform: scale(0.9) rotate(-15deg); }
  @media (max-width: 768px) { bottom: 24px; right: 24px; width: 56px; height: 56px; }
`;

const LoadingSpinner = styled.div<{ $isLight: boolean }>`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid ${({ $isLight }) => ($isLight ? 'rgba(99, 102, 241, 0.2)' : 'rgba(129, 140, 248, 0.2)')};
  border-top-color: ${({ $isLight }) => ($isLight ? '#4f46e5' : '#818cf8')};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;

const LoadingState = styled.div<{ $isLight: boolean }>`
  text-align: center;
  padding: 80px 24px;
`;

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
    <line x1="11" x2="11" y1="8" y2="14" />
    <line x1="8" x2="14" y1="11" y2="11" />
  </svg>
);

// ── Component ──

export function SynastryBoard({ data, isLight, onBack }: { data: SynastryData; isLight: boolean; onBack?: () => void }) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [p1Tiles, setP1Tiles] = useState<BoardImage[]>([]);
  const [p2Tiles, setP2Tiles] = useState<BoardImage[]>([]);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    fetch(`${API.BASE_URL}/zodiac-board`)
      .then(r => r.json())
      .then(setManifest)
      .catch(e => console.error('Failed to load zodiac board:', e))
      .finally(() => setLoading(false));
  }, []);

  const buildBoth = (m: Manifest) => {
    setP1Tiles(buildPersonBoard(data.person1_planets, data.person1_angles, m));
    setP2Tiles(buildPersonBoard(data.person2_planets, data.person2_angles, m));
  };

  useEffect(() => {
    if (manifest) buildBoth(manifest);
  }, [manifest, data]);

  const handleShuffle = () => {
    if (manifest) buildBoth(manifest);
  };

  if (loading) {
    return (
      <BoardContainer $isLight={isLight}>
        <LoadingState $isLight={isLight}>
          <LoadingSpinner $isLight={isLight} />
        </LoadingState>
      </BoardContainer>
    );
  }

  if (!p1Tiles.length && !p2Tiles.length) return null;

  const p1Name = data.person1?.name || 'Người 1';
  const p2Name = data.person2?.name || 'Người 2';

  return (
    <BoardContainer $isLight={isLight}>
      <Header>
        <TitleContainer>
          {onBack && (
            <BackArrow $isLight={isLight} onClick={onBack} aria-label="Go back">
              <IconArrowLeft size={28} stroke={1.5} />
            </BackArrow>
          )}
          <Title>Vũ Trụ Song Hành</Title>
        </TitleContainer>
        <Subtitle $isLight={isLight}>
          Hai vũ trụ thẩm mỹ song song - mỗi bên phản ánh năng lượng riêng biệt từ bản đồ sao của {p1Name} và {p2Name}.
        </Subtitle>
      </Header>

      <SplitGrid>
        <PersonColumn>
          <PersonLabel $isLight={isLight}>{p1Name}</PersonLabel>
          <S.GalleryGrid style={{ minHeight: '600px' }}>
            {p1Tiles.map((tile, i) => (
              <S.ImageWrapper
                key={`p1-${tile.id}-${i}-${Date.now()}`}
                onClick={() => setZoomImage({ src: tile.src, alt: `${p1Name} - ${tile.sourceSign}` })}
                style={{ marginBottom: '16px' }}
              >
                <S.ZoomOverlay>
                  <ZoomInIcon />
                  {tile.sourceSign}
                </S.ZoomOverlay>
                <img src={tile.src} alt={tile.sourceSign} loading="lazy" />
              </S.ImageWrapper>
            ))}
          </S.GalleryGrid>
        </PersonColumn>

        <PersonColumn>
          <PersonLabel $isLight={isLight}>{p2Name}</PersonLabel>
          <S.GalleryGrid style={{ minHeight: '600px' }}>
            {p2Tiles.map((tile, i) => (
              <S.ImageWrapper
                key={`p2-${tile.id}-${i}-${Date.now()}`}
                onClick={() => setZoomImage({ src: tile.src, alt: `${p2Name} - ${tile.sourceSign}` })}
                style={{ marginBottom: '16px' }}
              >
                <S.ZoomOverlay>
                  <ZoomInIcon />
                  {tile.sourceSign}
                </S.ZoomOverlay>
                <img src={tile.src} alt={tile.sourceSign} loading="lazy" />
              </S.ImageWrapper>
            ))}
          </S.GalleryGrid>
        </PersonColumn>
      </SplitGrid>

      <FloatingShuffleButton $isLight={isLight} onClick={handleShuffle} title="Trộn Lại Bản Phối">
        <IconArrowsShuffle size={28} stroke={2} />
      </FloatingShuffleButton>

      {zoomImage && (
        <ImageZoomModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />
      )}
    </BoardContainer>
  );
}
