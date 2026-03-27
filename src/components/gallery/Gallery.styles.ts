import styled from 'styled-components';

export const BannerSection = styled.section`
  text-align: center;
  padding: 80px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 30px;

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: -1px;
    
    background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 20px var(--text-shadow));

    @media (max-width: 900px) { font-size: 3rem; }
    @media (max-width: 500px) { font-size: 2.2rem; }
  }

  p {
    font-size: 1.2rem;
    color: #a0a0a0;
    letter-spacing: 1px;
  }
`;

export const GalleryGrid = styled.div`
  column-count: 3;
  column-gap: 24px;
  width: 90%;
  margin: 0 auto 60px;

  @media (max-width: 900px) { column-count: 2; }
  @media (max-width: 500px) { column-count: 1; }
`;

export const ZoomOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
  color: #d4af37;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const ImageWrapper = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  margin-bottom: 24px;
  break-inside: avoid;
  background: #1a1a1a;
  padding: 15px;
  border: 3px solid #d4af37; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(212, 175, 55, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  /* Gold Inner Frame */
  &::before {
    content: "";
    position: absolute;
    top: 5px; left: 5px; right: 5px; bottom: 5px;
    border: 1px solid #d4af37;
    pointer-events: none;
    z-index: 1;
  }

  /* Star Flourish */
  &::after {
    content: "✧";
    color: #d4af37;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    padding: 0 10px;
    font-size: 1.2rem;
    z-index: 2;
  }

  img {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    ${ZoomOverlay} {
      opacity: 1;
    }
  }
`;