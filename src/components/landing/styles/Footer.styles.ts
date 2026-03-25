import styled from "styled-components";


export const FooterWrapper = styled.footer`
  position: relative;
  z-index: 10;
  padding: 32px 16px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--glass-border);
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const FooterLogo = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
`;

export const FooterCopyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
  gap: 2px;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--text-primary);
    }
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const FooterLink = styled.a`
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
`;
