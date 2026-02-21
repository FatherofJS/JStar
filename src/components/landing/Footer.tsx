// Footer Component - Site footer with links

import { memo } from "react";
import {
  FooterWrapper,
  FooterContent,
  FooterBrand,
  FooterLogo,
  FooterCopyright,
  FooterLinks,
  FooterLink,
} from "./Footer.styles.ts";

interface FooterProps {
  currentYear?: number;
}

function Footer({ currentYear = new Date().getFullYear() }: FooterProps) {
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
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Accessibility</FooterLink>
          <FooterLink href="#">Cookies</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterWrapper>
  );
}

export default memo(Footer);

