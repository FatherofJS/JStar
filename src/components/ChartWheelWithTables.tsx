import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChartWheel } from './ChartWheel';
import PlanetTable from './PlanetTable';
import AspectPanel from './AspectPanel';
import HousePanel from './HousePanel';
import InfoPanel from './InfoPanel';
import type { ChartData } from '../types/chart';
import { MOCK_CHART } from '../data/mockData';
import { useChartApi } from '../hooks/useChartApi';

// Loading animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const rotate3d = keyframes`
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(129, 140, 248, 0.3); }
  50% { box-shadow: 0 0 40px rgba(129, 140, 248, 0.6), 0 0 80px rgba(168, 85, 247, 0.3); }
`;

// Loading Screen Styles
const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 50%, #000000 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2px 2px at 60% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 30% 60%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 80% 90%, rgba(255,255,255,0.5), transparent),
            radial-gradient(2px 2px at 10% 80%, rgba(255,255,255,0.6), transparent);
        animation: ${starTwinkle} 4s ease-in-out infinite;
    }
`;

const NebulaEffect = styled.div`
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
    
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 60%);
        animation: ${pulse} 3s ease-in-out infinite reverse;
    }
`;

const LoadingStar = styled.div<{ $top: string; $left: string; $size: number; $delay: string }>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(129, 140, 248, 0.5) 50%, transparent 70%);
    border-radius: 50%;
    animation: ${starTwinkle} 3s ease-in-out infinite;
    animation-delay: ${props => props.$delay};
    box-shadow: 0 0 ${props => props.$size * 2}px rgba(129, 140, 248, 0.5);
`;

const LoadingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    z-index: 1;
`;

const CosmicOrb = styled.div`
    width: 220px;
    height: 220px;
    position: relative;
    animation: ${glow} 3s ease-in-out infinite;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top: 3px solid #818cf8;
        border-right: 3px solid #a855f7;
        animation: ${spin} 3s linear infinite;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        right: 10%;
        bottom: 10%;
        border-radius: 50%;
        border: 2px solid transparent;
        border-bottom: 2px solid #a855f7;
        border-left: 2px solid #818cf8;
        animation: ${spin} 2s linear infinite reverse;
    }
`;

const OrbCenter = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #a855f7, #6366f1, #4f46e5);
    animation: ${pulse} 2s ease-in-out infinite;
    box-shadow: 
        0 0 30px rgba(129, 140, 248, 0.8),
        0 0 60px rgba(168, 85, 247, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.3);
    
    &::after {
        content: '✦';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: white;
        text-shadow: 0 0 10px rgba(255,255,255,0.8);
    }
`;

const PlanetRing = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 160px;
    border: 1px solid rgba(129, 140, 248, 0.3);
    border-radius: 50%;
    animation: ${rotate3d} 10s linear infinite;
    
    &::before {
        content: '';
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        background: #818cf8;
        border-radius: 50%;
        box-shadow: 0 0 10px #818cf8;
    }
`;

const LoadingText = styled.h2`
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    letter-spacing: 4px;
    text-transform: uppercase;
    animation: ${float} 4s ease-in-out infinite;
    text-shadow: 
        0 0 20px rgba(129, 140, 248, 0.8),
        0 0 40px rgba(168, 85, 247, 0.5);
    
    background: linear-gradient(135deg, #fff 0%, #818cf8 50%, #a855f7 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: ${float} 4s ease-in-out infinite, ${shimmer} 3s linear infinite;
`;

const LoadingSubText = styled.p`
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    max-width: 400px;
    line-height: 1.8;
    font-style: italic;
    letter-spacing: 1px;
`;

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 300px;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 30%;
        background: linear-gradient(90deg, #6366f1, #818cf8, #a855f7, #818cf8);
        border-radius: 3px;
        animation: ${shimmer} 2s ease-in-out infinite;
        box-shadow: 0 0 15px rgba(129, 140, 248, 0.5);
    }
`;

const ProgressDot = styled.div`
    width: 12px;
    height: 12px;
    background: #818cf8;
    border-radius: 50%;
    animation: ${pulse} 1.5s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(129, 140, 248, 0.8);
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background: rgba(10, 10, 20, 0.95);
`;

const LeftSection = styled.div`
    width: 360px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    padding-left: 30px;
    max-height: 100vh;
    overflow-y: auto;
    background: rgba(10, 10, 20, 0.95);
    position: relative;
    z-index: 100;
`;

const TableWrapper = styled.div`
    width: 100%;
`;

const CenterSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const ChartWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightSection = styled.div`
    width: 360px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    padding-right: 30px;
    max-height: 100vh;
    overflow-y: auto;
    background: rgba(10, 10, 20, 0.95);
    position: relative;
    z-index: 100;
`;

interface ChartWheelWithTablesProps {
    birthDate?: string;
    birthTime?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    externalChartData?: ChartData | null;
    name?: string;
}

export function ChartWheelWithTables(props: ChartWheelWithTablesProps) {
    const { birthDate, birthTime, latitude, longitude, timezone, externalChartData, name } = props;
    const { chartData: fetchedChartData, loading, error, fetchChart } = useChartApi();
    
    // State để lưu chartData - ưu tiên: externalChartData > fetchedChartData > MOCK_CHART
    const [chartData, setChartData] = useState<ChartData | null>(externalChartData || null);
    const [showLoading, setShowLoading] = useState(false);
    
    // Gọi API khi có birthDate và chưa có externalChartData
    useEffect(() => {
        if (birthDate && !externalChartData) {
            // Hiển thị loading screen
            setShowLoading(true);
            
            fetchChart(birthDate, birthTime || '12:00', latitude || 0, longitude || 0, timezone || 'UTC')
                .then((data) => {
                    if (data) {
                        setChartData(data);
                    }
                })
                .finally(() => {
                    // Ẩn loading sau khi có dữ liệu hoặc lỗi
                    setTimeout(() => {
                        setShowLoading(false);
                    }, 2500); // Delay 2.5s để loading hiển thị lâu hơn
                });
        }
    }, [birthDate, birthTime, latitude, longitude, timezone, externalChartData, fetchChart]);
    
    // Cập nhật chartData khi có fetched data
    useEffect(() => {
        if (fetchedChartData && !externalChartData) {
            setChartData(fetchedChartData);
        }
    }, [fetchedChartData, externalChartData]);
    
    // Cập nhật chartData khi externalChartData thay đổi
    useEffect(() => {
        if (externalChartData) {
            setChartData(externalChartData);
        }
    }, [externalChartData]);
    
    // Sử dụng MOCK_CHART như fallback cuối cùng khi không có dữ liệu
    const displayChartData = chartData || MOCK_CHART;

    // Hiển thị màn hình loading khi đang fetch dữ liệu
    if (showLoading || (loading && !externalChartData)) {
        return (
            <LoadingOverlay>
                <NebulaEffect />
                
                {/* Lots of twinkling stars */}
                <LoadingStar $top="3%" $left="5%" $size={3} $delay="0s" />
                <LoadingStar $top="7%" $left="15%" $size={2} $delay="0.2s" />
                <LoadingStar $top="10%" $left="25%" $size={4} $delay="0.4s" />
                <LoadingStar $top="5%" $left="35%" $size={2} $delay="0.6s" />
                <LoadingStar $top="12%" $left="45%" $size={3} $delay="0.8s" />
                <LoadingStar $top="8%" $left="55%" $size={2} $delay="1s" />
                <LoadingStar $top="15%" $left="65%" $size={4} $delay="1.2s" />
                <LoadingStar $top="6%" $left="75%" $size={2} $delay="1.4s" />
                <LoadingStar $top="11%" $left="85%" $size={3} $delay="1.6s" />
                <LoadingStar $top="9%" $left="95%" $size={2} $delay="1.8s" />
                
                <LoadingStar $top="20%" $left="8%" $size={3} $delay="0.1s" />
                <LoadingStar $top="25%" $left="18%" $size={2} $delay="0.3s" />
                <LoadingStar $top="22%" $left="28%" $size={4} $delay="0.5s" />
                <LoadingStar $top="28%" $left="38%" $size={2} $delay="0.7s" />
                <LoadingStar $top="24%" $left="48%" $size={3} $delay="0.9s" />
                <LoadingStar $top="30%" $left="58%" $size={2} $delay="1.1s" />
                <LoadingStar $top="26%" $left="68%" $size={4} $delay="1.3s" />
                <LoadingStar $top="32%" $left="78%" $size={2} $delay="1.5s" />
                <LoadingStar $top="29%" $left="88%" $size={3} $delay="1.7s" />
                <LoadingStar $top="35%" $left="98%" $size={2} $delay="1.9s" />
                
                <LoadingStar $top="40%" $left="3%" $size={3} $delay="0.15s" />
                <LoadingStar $top="45%" $left="13%" $size={2} $delay="0.35s" />
                <LoadingStar $top="42%" $left="23%" $size={4} $delay="0.55s" />
                <LoadingStar $top="48%" $left="33%" $size={2} $delay="0.75s" />
                <LoadingStar $top="44%" $left="43%" $size={3} $delay="0.95s" />
                <LoadingStar $top="50%" $left="53%" $size={2} $delay="1.15s" />
                <LoadingStar $top="46%" $left="63%" $size={4} $delay="1.35s" />
                <LoadingStar $top="52%" $left="73%" $size={2} $delay="1.55s" />
                <LoadingStar $top="49%" $left="83%" $size={3} $delay="1.75s" />
                <LoadingStar $top="55%" $left="93%" $size={2} $delay="1.95s" />
                
                <LoadingStar $top="60%" $left="6%" $size={3} $delay="0.25s" />
                <LoadingStar $top="65%" $left="16%" $size={2} $delay="0.45s" />
                <LoadingStar $top="62%" $left="26%" $size={4} $delay="0.65s" />
                <LoadingStar $top="68%" $left="36%" $size={2} $delay="0.85s" />
                <LoadingStar $top="64%" $left="46%" $size={3} $delay="1.05s" />
                <LoadingStar $top="70%" $left="56%" $size={2} $delay="1.25s" />
                <LoadingStar $top="66%" $left="66%" $size={4} $delay="1.45s" />
                <LoadingStar $top="72%" $left="76%" $size={2} $delay="1.65s" />
                <LoadingStar $top="69%" $left="86%" $size={3} $delay="1.85s" />
                <LoadingStar $top="75%" $left="96%" $size={2} $delay="2.05s" />
                
                <LoadingStar $top="80%" $left="4%" $size={3} $delay="0.12s" />
                <LoadingStar $top="85%" $left="14%" $size={2} $delay="0.32s" />
                <LoadingStar $top="82%" $left="24%" $size={4} $delay="0.52s" />
                <LoadingStar $top="88%" $left="34%" $size={2} $delay="0.72s" />
                <LoadingStar $top="84%" $left="44%" $size={3} $delay="0.92s" />
                <LoadingStar $top="90%" $left="54%" $size={2} $delay="1.12s" />
                <LoadingStar $top="86%" $left="64%" $size={4} $delay="1.32s" />
                <LoadingStar $top="92%" $left="74%" $size={2} $delay="1.52s" />
                <LoadingStar $top="89%" $left="84%" $size={3} $delay="1.72s" />
                <LoadingStar $top="94%" $left="94%" $size={2} $delay="1.92s" />
                
                <LoadingStar $top="18%" $left="52%" $size={3} $delay="0.22s" />
                <LoadingStar $top="38%" $left="72%" $size={2} $delay="0.42s" />
                <LoadingStar $top="58%" $left="22%" $size={3} $delay="0.62s" />
                <LoadingStar $top="78%" $left="42%" $size={2} $delay="0.82s" />
                <LoadingStar $top="98%" $left="62%" $size={3} $delay="1.02s" />
                <LoadingStar $top="13%" $left="82%" $size={2} $delay="1.22s" />
                <LoadingStar $top="33%" $left="12%" $size={3} $delay="1.42s" />
                <LoadingStar $top="53%" $left="32%" $size={2} $delay="1.62s" />
                <LoadingStar $top="73%" $left="52%" $size={3} $delay="1.82s" />
                <LoadingStar $top="93%" $left="72%" $size={2} $delay="2.02s" />
                
                <LoadingContent>
                    <CosmicOrb>
                        <PlanetRing />
                        <OrbCenter />
                    </CosmicOrb>
                    
                    <LoadingText>Creating Your Cosmic Chart</LoadingText>
                    <LoadingSubText>
                        The universe is weaving your stellar tapestry...
                        <br />
                        Aligning planets, calculating aspects, mapping your destiny
                    </LoadingSubText>
                    
                    <ProgressContainer>
                        <ProgressBar />
                        <ProgressDot />
                    </ProgressContainer>
                </LoadingContent>
            </LoadingOverlay>
        );
    }

    return (
        <Container>
            {/* Left side: Birth Info + Natal Points */}
            <LeftSection>
                <TableWrapper>
                    <InfoPanel chartData={displayChartData} />
                </TableWrapper>
                <TableWrapper>
                    <PlanetTable chartData={displayChartData} />
                </TableWrapper>
            </LeftSection>
            
            {/* Center: ChartWheel */}
            <CenterSection>
                <ChartWrapper>
                    <ChartWheel
                        birthDate={birthDate}
                        birthTime={birthTime}
                        latitude={latitude}
                        longitude={longitude}
                        timezone={timezone}
                        externalChartData={chartData}
                        name={name}
                    />
                </ChartWrapper>
            </CenterSection>
            
            {/* Right side: Natal Houses + Aspect */}
            <RightSection>
                <TableWrapper>
                    <HousePanel chartData={displayChartData} />
                </TableWrapper>
                <TableWrapper>
                    <AspectPanel chartData={displayChartData} />
                </TableWrapper>
            </RightSection>
        </Container>
    );
}
