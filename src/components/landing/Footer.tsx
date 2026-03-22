// Footer Component - Site footer with links

import { memo } from "react";
import { landingContent } from "../../data/landingData";
import {
  FooterWrapper,
  FooterContent,
  FooterBrand,
  FooterLogo,
  FooterCopyright,
  FooterLinks,
  FooterLink,
} from "./styles/Footer.styles.ts";

interface FooterProps {
  currentYear?: number;
}

function Footer({ currentYear = new Date().getFullYear() }: FooterProps) {
  const t = landingContent;
  
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterBrand>
          <FooterLogo>JSTAR</FooterLogo>
          <FooterCopyright>
            <span>© {currentYear} JSTAR</span>
            <span>
              JSCLUB:{" "}
              <a
                href="https://www.facebook.com/fu.jsclub"
                target="_blank"
                rel="noopener noreferrer"
              >
                facebook
              </a>
            </span>
          </FooterCopyright>
        </FooterBrand>

        <FooterLinks>
          <FooterLink href="#">{t.footerAbout}</FooterLink>
          <FooterLink href="#">{t.footerPrivacy}</FooterLink>
          <FooterLink href="#">{t.footerTerms}</FooterLink>
          <FooterLink href="#">{t.footerAccessibility}</FooterLink>
          <FooterLink href="#">{t.footerCookies}</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterWrapper>
  );
}

export default memo(Footer);

