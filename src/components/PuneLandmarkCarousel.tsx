import React, { useState, useEffect, useCallback } from 'react';
import { PUNE_MEDIA } from '../assets/puneAssets';
import { PuneLandmarkSlide } from '../types';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface PuneLandmarkCarouselProps {
  slides: PuneLandmarkSlide[];
  latestBudgetCrores: number;
  latestFY: string;
  onNavigate: (page: string) => void;
}

export const PuneLandmarkCarousel: React.FC<PuneLandmarkCarouselProps> = ({
  slides,
  latestBudgetCrores,
  latestFY,
  onNavigate
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [loadedUrls, setLoadedUrls] = useState<Record<string, boolean>>({});

  const totalSlides = slides.length;
  const activeSlide = slides[activeIndex] || slides[0];

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = window.setInterval(goNext, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides, goNext]);

  const handleImageError = (slideId: string) => {
    setFailedUrls((prev) => ({ ...prev, [slideId]: true }));
  };

  const handleImageLoad = (slideId: string) => {
    setLoadedUrls((prev) => ({ ...prev, [slideId]: true }));
  };

  if (!activeSlide) return null;

  const activeImgSrc = failedUrls[activeSlide.id]
    ? PUNE_MEDIA[activeSlide.fallbackAssetKey]
    : activeSlide.imageUrl;
  const isCurrentLoaded = Boolean(loadedUrls[activeSlide.id] || failedUrls[activeSlide.id]);

  return (
    <section
      aria-label="Rotating Pune Landmarks and Municipal Finance Hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }}
      className="relative w-full min-h-[520px] sm:min-h-[560px] lg:min-h-[610px] flex items-center bg-[#0E2920] overflow-hidden select-none"
    >
      {/* Background Slide Images with Smooth Crossfade & Bundled Fallback */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === activeIndex;
        const shouldMount =
          isCurrent ||
          idx === (activeIndex + 1) % totalSlides ||
          idx === (activeIndex - 1 + totalSlides) % totalSlides;

        if (!shouldMount) return null;

        const src = failedUrls[slide.id] ? PUNE_MEDIA[slide.fallbackAssetKey] : slide.imageUrl;

        return (
          <img
            key={slide.id}
            src={src}
            alt={`${slide.title} — ${slide.subtitle} in Pune, Maharashtra`}
            referrerPolicy="no-referrer"
            onError={() => handleImageError(slide.id)}
            onLoad={() => handleImageLoad(slide.id)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
              isCurrent ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
            }`}
          />
        );
      })}

      {/* Subtle Loading Shimmer until active image settles */}
      {!isCurrentLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#133429] via-[#0E2920] to-[#164235] animate-pulse"
        />
      )}

      {/* Editorial Dark Gradient Scrim ensuring >= 4.5:1 text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0E2920]/92 via-[#0E2920]/74 to-[#0E2920]/42"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 z-[1] bg-gradient-to-t from-[#0E2920]/85 via-[#0E2920]/40 to-transparent"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-14 py-14 lg:py-20">
        <div className="max-w-2xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-[#D3DFD9] font-medium">
            <span>Pune Municipal Corporation</span>
            <span aria-hidden="true">·</span>
            <span>Civic Finance &amp; Urban Data Portal</span>
          </div>

          <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.1] tracking-tight text-[#FAF8F3] text-balance">
            Understanding Where Pune&apos;s Money Goes
          </h1>

          {/* Active Landmark Spotlight Strip */}
          <div className="p-4 rounded-[6px] bg-[#0E2920]/75 backdrop-blur-xs border border-white/15 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#5CC2BA]">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{activeSlide.title}</span>
              </span>
              <span className="text-[11px] font-mono tabular-nums text-[#D3DFD9]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')} · {activeSlide.location}
              </span>
            </div>
            <p className="text-[13px] text-[#E6ECE9] leading-relaxed">
              {activeSlide.description}
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => onNavigate('finances')}
              className="h-11 px-6 rounded-[6px] bg-[#FAF8F3] hover:bg-white text-[#133429] text-sm font-semibold inline-flex items-center gap-2 shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-all duration-150 cursor-pointer"
            >
              <span>Explore Municipal Finances</span>
              <ArrowRight className="w-4 h-4 text-[#0E7C74]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate(activeSlide.targetPage)}
              className="h-11 px-5 rounded-[6px] border border-white/30 bg-[#0E2920]/60 hover:bg-[#0E2920]/90 text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{activeSlide.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5CC2BA]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('sources')}
              className="text-xs sm:text-sm font-medium text-[#FAF8F3] hover:text-white underline underline-offset-4 decoration-[#FAF8F3]/50 hover:decoration-white transition-colors cursor-pointer"
            >
              Inspect Official Sources
            </button>
          </div>
        </div>
      </div>

      {/* Left / Right Carousel Controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous Pune landmark slide"
        className="hidden sm:inline-flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-[6px] bg-[#0E2920]/70 hover:bg-[#0E2920] border border-white/20 text-[#FAF8F3] items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next Pune landmark slide"
        className="hidden sm:inline-flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-[6px] bg-[#0E2920]/70 hover:bg-[#0E2920] border border-white/20 text-[#FAF8F3] items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Controls Bar: Dots + Pause/Play + Attribution + Latest FY Figure */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume slide rotation' : 'Pause slide rotation'}
            className="w-7 h-7 rounded-[4px] bg-[#0E2920]/80 hover:bg-[#0E2920] border border-white/20 text-[#FAF8F3] inline-flex items-center justify-center cursor-pointer"
            title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-7 h-7 rounded-[4px] bg-[#0E2920]/80 border border-white/20 text-[#FAF8F3] inline-flex items-center justify-center"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="w-7 h-7 rounded-[4px] bg-[#0E2920]/80 border border-white/20 text-[#FAF8F3] inline-flex items-center justify-center"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Select landmark slide">
            {slides.map((s, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View ${s.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isSelected ? 'w-6 bg-[#5CC2BA]' : 'w-2 bg-white/40 hover:bg-white/75'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#E6ECE9]/90">
          {!failedUrls[activeSlide.id] ? (
            <a
              href={activeSlide.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white underline decoration-white/30"
            >
              <span>Photo: {activeSlide.creditLabel}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="text-[#D3DFD9]">
              Local Civic Archive Fallback · {activeSlide.title}
            </span>
          )}
          <span aria-hidden="true" className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline font-mono tabular-nums text-white">
            FY {latestFY} Approved Outlay: ₹{latestBudgetCrores.toLocaleString('en-IN')} Cr
          </span>
        </div>
      </div>

      {/* Hidden img probe guarantees TypeScript uses activeImgSrc cleanly */}
      <span className="sr-only">{activeImgSrc}</span>
    </section>
  );
};
