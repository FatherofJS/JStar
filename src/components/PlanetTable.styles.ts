// PlanetTable styled components

import styled from 'styled-components';

// =============================================================================
// MAIN CONTAINER
// =============================================================================

export const PlanetTableContainer = styled.div`
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

export const PlanetTableHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(90deg, rgba(168, 85, 247, 0.15) 0%, transparent 50%);

    &:hover {
        background: linear-gradient(90deg, rgba(168, 85, 247, 0.25) 0%, transparent 50%);
        border-bottom-color: rgba(168, 85, 247, 0.3);
    }
`;

export const TableTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #f3f4f6;
    margin: 0;
    letter-spacing: 0.02em;
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
        background: rgba(168, 85, 247, 0.2);
        color: #d8b4fe;
    }

    transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

// =============================================================================
// CONTENT - Collapsible
// =============================================================================

export const PlanetTableContent = styled.div<{ $expanded: boolean }>`
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

export const PlanetTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const PlanetRow = styled.tr`
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;

    &:hover {
        background: rgba(168, 85, 247, 0.08);
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const PlanetCell = styled.td`
    padding: 12px 24px;
    font-size: 13px;
`;

export const PlanetName = styled.td`
    color: #d1d5db;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    }
`;

export const PlanetPosition = styled.td`
    color: #f3f4f6;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
`;

export const PositionIndicator = styled.span`
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    border-radius: 2px;
    display: inline-block;
    flex-shrink: 0;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
`;

export const PlanetHouse = styled.td`
    color: #9ca3af;
    text-align: right;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.03);
    padding: 4px 10px;
    border-radius: 6px;
`;
