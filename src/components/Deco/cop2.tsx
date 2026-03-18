import styled, { keyframes, css } from "styled-components";

export const Logo = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Font calligraphy đặc biệt */
  font-family: 'Cinzel Decorative', serif;
  
  /* Màu gradient với hiệu ứng phát sáng - Dark mode */
  background: linear-gradient(135deg, #7aa2ff 0%, #c084fc 50%, #22d3ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 10px rgba(122, 162, 255, 0.5));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(122, 162, 255, 0.8));
  }

  /* Light mode - Deeper sky colors */
  [data-theme="light"] & {
    background: linear-gradient(135deg, #0284c7 0%, #7c3aed 50%, #0891b2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(2, 132, 199, 0.4));

    &:hover {
      filter: drop-shadow(0 0 15px rgba(2, 132, 199, 0.6));
    }
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;