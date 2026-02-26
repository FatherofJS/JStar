// HousePanel styled components

import styled from 'styled-components';

// =============================================================================
// MAIN CONTAINER
// =============================================================================

export const HousePanelContainer = styled.div`
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

export const HousePanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.15) 0%, transparent 50%);

    &:hover {
        background: linear-gradient(90deg, rgba(34, 197, 94, 0.25) 0%, transparent 50%);
        border-bottom-color: rgba(34, 197, 94, 0.3);
    }
`;

export const PanelTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #f3f4f6;
    margin: 0;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const MenuButton = styled.button`
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 8px;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #e5e7eb;
    }
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
        background: rgba(34, 197, 94, 0.2);
        color: #86efac;
    }

    transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

// =============================================================================
// CONTENT - Collapsible
// =============================================================================

export const HousePanelContent = styled.div<{ $expanded: boolean }>`
    max-height: ${({ $expanded }) => $expanded ? '600px' : '0'};
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ $expanded }) => $expanded && `
        transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `}
`;

// =============================================================================
// TABLE
// =============================================================================

export const HouseTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const HouseRow = styled.tr`
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;

    &:hover {
        background: rgba(34, 197, 94, 0.08);
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const HouseCell = styled.td`
    padding: 12px 24px;
    font-size: 13px;
`;

export const HouseNumber = styled.td`
    color: #d1d5db;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
    }
`;

export const HousePosition = styled.td`
    color: #f3f4f6;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
`;

export const HouseIndicator = styled.span`
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-radius: 2px;
    display: inline-block;
    flex-shrink: 0;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
`;
