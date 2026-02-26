// AspectPanel styled components

import styled from 'styled-components';

// =============================================================================
// MAIN CONTAINER
// =============================================================================

export const AspectPanelContainer = styled.div`
    width: 100%;
    min-width: 320px;
    background: linear-gradient(145deg, rgba(30, 32, 48, 0.9) 0%, rgba(20, 22, 35, 0.95) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    color: #e5e7eb;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
`;

// =============================================================================
// HEADER
// =============================================================================

export const AspectPanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    cursor: pointer;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, transparent 50%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(90deg, rgba(56, 189, 248, 0.25) 0%, transparent 50%);
        border-bottom-color: rgba(56, 189, 248, 0.3);
    }
`;

export const AspectPanelTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #f3f4f6;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ToggleIcon = styled.span<{ $isOpen: boolean }>`
    background: rgba(255, 255, 255, 0.08);
    padding: 6px;
    border-radius: 8px;
    color: #9ca3af;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(56, 189, 248, 0.2);
        color: #7dd3fc;
    }

    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

// =============================================================================
// BODY - Collapsible
// =============================================================================

export const AspectPanelBody = styled.div<{ $show: boolean }>`
    max-height: ${({ $show }) => $show ? '500px' : '0'};
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
`;

// =============================================================================
// SCROLL CONTAINER
// =============================================================================

export const GridScrollContainer = styled.div`
    padding: 12px;
    max-height: 350px;
    overflow-y: auto;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #6366f1 0%, #a855f7 100%);
        border-radius: 10px;
    }
`;

// =============================================================================
// GRID
// =============================================================================

export const AspectGrid = styled.div`
    display: inline-block;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
`;

export const GridRow = styled.div`
    display: flex;
`;

export const GridCell = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

export const LabelCell = styled(GridCell)`
    background-color: rgba(255, 255, 255, 0.04);
    color: #9ca3af;
    font-size: 10px;
    font-weight: 600;
`;

// =============================================================================
// ASPECT ICONS
// =============================================================================

export const AspectIcon = styled.span<{ $aspectType: string }>`
    font-weight: 700;
    font-size: 11px;
    transition: all 0.2s ease;
    text-shadow: 0 0 10px currentColor;
    color: ${({ $aspectType }) => {
        switch ($aspectType) {
            case 'conjunction': return '#38bdf8';
            case 'opposition': return '#ef4444';
            case 'trine': return '#22c55e';
            case 'square': return '#f97316';
            case 'sextile': return '#2dd4bf';
            default: return '#9ca3af';
        }
    }};
    text-shadow: ${({ $aspectType }) => {
        switch ($aspectType) {
            case 'conjunction': return '0 0 12px rgba(56, 189, 248, 0.6)';
            case 'opposition': return '0 0 12px rgba(239, 68, 68, 0.6)';
            case 'trine': return '0 0 12px rgba(34, 197, 94, 0.6)';
            case 'square': return '0 0 12px rgba(249, 115, 22, 0.6)';
            case 'sextile': return '0 0 12px rgba(45, 212, 191, 0.6)';
            default: return 'none';
        }
    }};

    &:hover {
        transform: scale(1.2);
    }
`;

// =============================================================================
// RESPONSIVE
// =============================================================================

// Note: Responsive styles are handled in the component using CSS media queries
// or can be added using styled-components' css helper if needed
