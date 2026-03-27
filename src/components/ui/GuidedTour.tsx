import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { TourStep } from '../../data/tourSteps';
import {
  Overlay,
  SpotlightHole,
  Tooltip,
  TooltipTitle,
  TooltipDescription,
  TooltipFooter,
  StepDots,
  StepDot,
  ButtonGroup,
  TourButton,
} from './GuidedTour.styles';

interface GuidedTourProps {
  steps: TourStep[];
  storageKey: string;
  isActive: boolean;
  onComplete: () => void;
  onStepChange?: (stepIndex: number, step: TourStep) => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 10;

function getElementRect(selector: string, scale: number = 1, forceCircle: boolean = false): Rect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();

  const baseW = r.width * scale;
  const baseH = r.height * scale;
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  if (forceCircle) {
    // Exact sizing for circles without padding to perfectly match chart rings
    const size = Math.min(baseW, baseH);
    return {
      top: cy - size / 2,
      left: cx - size / 2,
      width: size,
      height: size,
    };
  }

  if (scale !== 1) {
    return {
      top: cy - baseH / 2 - PADDING,
      left: cx - baseW / 2 - PADDING,
      width: baseW + PADDING * 2,
      height: baseH + PADDING * 2,
    };
  }

  return {
    top: r.top - PADDING,
    left: r.left - PADDING,
    width: r.width + PADDING * 2,
    height: r.height + PADDING * 2,
  };
}

function preventScroll(e: Event) {
  e.preventDefault();
}

function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  window.removeEventListener('wheel', preventScroll);
  window.removeEventListener('touchmove', preventScroll);
}

function scrollToElement(selector: string, block: ScrollLogicalPosition = 'center'): void {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) return;

  // 1. Fully unlock so scrollIntoView can work
  unlockScroll();

  // 2. Force a synchronous reflow so layout is accurate
  void document.body.offsetHeight;

  // 3. Use scrollIntoView to reliably bring element into viewport
  if (block === 'start') {
    el.style.scrollMarginTop = '120px';
  }
  el.scrollIntoView({ block, behavior: 'instant' as ScrollBehavior });
  if (block === 'start') {
    el.style.scrollMarginTop = '';
  }

  // 5. Force another reflow so subsequent getBoundingClientRect is correct
  void document.body.offsetHeight;
}

function scrollToTop(): void {
  unlockScroll();
  void document.body.offsetHeight;
  const chartEl = document.querySelector('.chart-wheel-container') || document.querySelector('.synastry-wheel-container');
  if (chartEl) {
    const el = chartEl as HTMLElement;
    el.style.scrollMarginTop = '100px';
    el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    el.style.scrollMarginTop = '';
  } else {
    document.documentElement.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
  }
  void document.body.offsetHeight;
}

function getTooltipPosition(
  rect: Rect,
  position: TourStep['position'] = 'bottom',
  tooltipWidth: number = 340,
): { top: number; left: number } {
  const gap = 20;
  let top = 0;
  let left = 0;

  switch (position) {
    case 'top':
      top = rect.top - gap - 180;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
    case 'bottom':
      top = rect.top + rect.height + gap;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - 90;
      left = rect.left - tooltipWidth - gap;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - 90;
      left = rect.left + rect.width + gap;
      break;
    default:
      top = rect.top + rect.height + gap;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
  }

  // Clamp to viewport
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Use a more generous bottom clamp for mobile screens to handle taller tooltips
  const estTooltipHeight = vw <= 480 ? 320 : 250;
  left = Math.max(16, Math.min(left, vw - tooltipWidth - 16));
  top = Math.max(16, Math.min(top, vh - estTooltipHeight - 16));

  return { top, left };
}

export function GuidedTour({ steps, storageKey, isActive, onComplete, onStepChange }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const rafRef = useRef<number>(0);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const step = steps[currentStep];

  const updateRect = useCallback(() => {
    if (!step) return;
    const isCircle = step.spotlightShape === 'circle';
    const r = getElementRect(step.selector, step.spotlightScale, isCircle);
    setRect(r);
  }, [step]);

  // Lock scroll during tour and reset to top on start and exit
  useEffect(() => {
    if (isActive) {
      // Snap to top immediately when tour button is clicked
      unlockScroll();
      window.scrollTo(0, 0);
      lockScroll();
      return () => {
        clearTimeout(lockTimerRef.current);
        unlockScroll();
      };
    }
  }, [isActive]);

  // Trigger step change callback
  useEffect(() => {
    if (isActive && step && onStepChange) {
      onStepChange(currentStep, step);
    }
  }, [isActive, currentStep, step, onStepChange]);

  // Scroll to element and update rect on step change
  useEffect(() => {
    if (!isActive || !step) return;

    // Clear any pending re-lock
    clearTimeout(lockTimerRef.current);

    // Scroll to the target element (this unlocks, scrolls synchronously)
    scrollToElement(step.selector, step.scrollBlock || 'center');

    // Wait a tick for scroll to settle, then update rect and re-lock
    lockTimerRef.current = setTimeout(() => {
      updateRect();
      lockScroll();
    }, 200);

    // Start continuous rect updates (for resize, etc.)
    const rafId = requestAnimationFrame(function tick() {
      updateRect();
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(lockTimerRef.current);
    };
  }, [isActive, updateRect, step]);

  const handleComplete = useCallback(() => {
    try {
      localStorage.setItem(storageKey, 'true');
    } catch { /* silently ignore */ }
    // Scroll to top BEFORE deactivating - synchronous and reliable
    scrollToTop();
    setCurrentStep(0);
    onComplete();
  }, [storageKey, onComplete]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  }, [currentStep, steps.length, handleComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  if (!isActive || !step || !rect) return null;

  const tooltipPos = getTooltipPosition(rect, step.position);

  return createPortal(
    <Overlay>
      <SpotlightHole
        $top={rect.top}
        $left={rect.left}
        $width={rect.width}
        $height={rect.height}
        $borderRadius={step.spotlightShape === 'circle' ? '50%' : step.spotlightShape || '14px'}
      />

      <Tooltip
        key={currentStep}
        $top={tooltipPos.top}
        $left={tooltipPos.left}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <TooltipTitle>
          {step.title}
        </TooltipTitle>
        <TooltipDescription>{step.description}</TooltipDescription>
        <TooltipFooter>
          <StepDots>
            {steps.map((_, i) => (
              <StepDot key={i} $active={i === currentStep} />
            ))}
          </StepDots>
          <ButtonGroup>
            <TourButton onClick={handleComplete}>Bỏ qua</TourButton>
            {currentStep > 0 && (
              <TourButton onClick={handleBack}>Lùi</TourButton>
            )}
            <TourButton $primary onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Xong!' : 'Tiếp →'}
            </TourButton>
          </ButtonGroup>
        </TooltipFooter>
      </Tooltip>
    </Overlay>,
    document.body,
  );
}
