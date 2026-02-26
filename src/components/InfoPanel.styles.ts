// InfoPanel styled components

import styled from 'styled-components';

// =============================================================================
// MAIN CONTAINER
// =============================================================================

export const InfoPanelContainer = styled.div`
    background: linear-gradient(145deg, rgba(30, 32, 48, 0.9) 0%, rgba(20, 22, 35, 0.95) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    width: 100%;
    min-width: 320px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e5e7eb;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
`;

// =============================================================================
// HEADER
// =============================================================================

export const InfoPanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, transparent 50%);

    &:hover {
        background: linear-gradient(90deg, rgba(99, 102, 241, 0.25) 0%, transparent 50%);
        border-bottom-color: rgba(99, 102, 241, 0.3);
    }
`;

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const PanelTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

export const PanelSubtitle = styled.span`
    font-size: 12px;
    color: #9ca3af;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ExpandButton = styled.button<{ $expanded: boolean }>`
    background: rgba(255, 255, 255, 0.08);
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 8px;

    &:hover {
        background: rgba(99, 102, 241, 0.2);
        color: #c4b5fd;
    }

    transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

// =============================================================================
// CONTENT - Collapsible
// =============================================================================

export const InfoPanelContent = styled.div<{ $expanded: boolean; $collapsed: boolean }>`
    max-height: ${({ $expanded, $collapsed }) => 
        $expanded ? '600px' : $collapsed ? '0' : '0'};
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ $expanded }) => $expanded && `
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `}
`;

// =============================================================================
// SECTIONS
// =============================================================================

export const InfoSection = styled.div`
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.02);
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const SectionTitle = styled.h3`
    font-size: 11px;
    font-weight: 600;
    color: #6366f1;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;

export const SectionContent = styled.p`
    font-size: 15px;
    color: #f3f4f6;
    margin: 0 0 4px 0;
    font-weight: 500;
`;

export const SectionDetail = styled.p`
    font-size: 13px;
    color: #9ca3af;
    margin: 4px 0;
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 6px;

    &::before {
        content: '';
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        border-radius: 50%;
        flex-shrink: 0;
    }
`;

export const MoonPhaseText = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const MoonIcon = styled.span`
    font-size: 18px;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
`;
