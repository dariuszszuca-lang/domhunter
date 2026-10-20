"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";

export type GalleryImage = { url: string; alt: string };

type GalleryContextValue = {
  images: GalleryImage[];
  open: (index: number) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery poza OfferGalleryProvider");
  return ctx;
}

/** Przewijanie poziome ze snapem: strzałki, swipe palcem, numer bieżącego zdjęcia. */
function useSnapScroller(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const el = ref.current;
      if (!el || count === 0) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
      setIndex(next);
    },
    [count],
  );

  return { ref, index, onScroll, goTo };
}

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-md hover:bg-white transition-colors";

export function OfferGalleryProvider({
  images,
  children,
}: {
  images: GalleryImage[];
  children: ReactNode;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <GalleryContext.Provider value={{ images, open: setOpenAt }}>
      {children}
      {openAt !== null && (
        <Lightbox images={images} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </GalleryContext.Provider>
  );
}

/** Górna galeria: duże zdjęcie z karuzelą (strzałki + swipe) i 3 miniatury obok na desktopie. */
export function OfferGalleryHero() {
  const { images, open } = useGallery();
  const { ref, index, onScroll, goTo } = useSnapScroller(images.length);
  const thumbs = images.slice(1, 4);
  const hiddenCount = images.length - 4;
  const many = images.length > 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="lg:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 group">
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              aria-label={`Powiększ zdjęcie ${i + 1} z ${images.length}`}
              className="relative h-full w-full shrink-0 snap-center cursor-zoom-in"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </button>
          ))}
        </div>

        {many && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Poprzednie zdjęcie"
              className={`${arrowClass} left-3 size-10 lg:size-12 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100`}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Następne zdjęcie"
              className={`${arrowClass} right-3 size-10 lg:size-12 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100`}
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
          <span className="rounded-full bg-black/60 text-white text-xs font-semibold tabular-nums px-3 py-1.5">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => open(index)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 text-foreground text-xs font-semibold px-3 py-1.5 shadow-md hover:bg-white transition-colors"
          >
            <Expand className="size-3.5" />
            Wszystkie zdjęcia
          </button>
        </div>
      </div>

      {thumbs.length > 0 && (
        <div className="hidden lg:grid grid-rows-3 gap-3">
          {thumbs.map((img, i) => {
            const realIndex = i + 1;
            const isLast = i === thumbs.length - 1 && hiddenCount > 0;
            return (
              <button
                key={realIndex}
                type="button"
                onClick={() => open(realIndex)}
                aria-label={`Powiększ zdjęcie ${realIndex + 1} z ${images.length}`}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in group/thumb"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                />
                {isLast && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 text-white font-semibold">
                    <Images className="size-6" />+{hiddenCount} zdjęć
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Siatka pozostałych zdjęć pod opisem; klik otwiera powiększenie. */
export function OfferGalleryGrid({ from }: { from: number }) {
  const { images, open } = useGallery();
  const rest = images.slice(from);
  if (rest.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {rest.map((img, i) => (
        <button
          key={from + i}
          type="button"
          onClick={() => open(from + i)}
          aria-label={`Powiększ zdjęcie ${from + i + 1} z ${images.length}`}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in group/thumb"
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
          />
        </button>
      ))}
    </div>
  );
}

/** Pełnoekranowy podgląd: strzałki, klawiatura, swipe, Esc zamyka. */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const { ref, index, onScroll, goTo } = useSnapScroller(images.length);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = thumbsRef.current?.children[index] as HTMLElement | undefined;
    active?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    goTo(startIndex, false);
  }, [goTo, startIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeria zdjęć oferty"
      className="fixed inset-0 z-[100] flex flex-col bg-black"
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm font-semibold tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij galerię"
          className="flex size-11 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="size-6" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0">
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full w-full shrink-0 snap-center">
              <Image src={img.url} alt={img.alt} fill sizes="100vw" className="object-contain" />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Poprzednie zdjęcie"
              className={`${arrowClass} left-2 sm:left-4 size-11 sm:size-14`}
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Następne zdjęcie"
              className={`${arrowClass} right-2 sm:right-4 size-11 sm:size-14`}
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Pokaż zdjęcie ${i + 1}`}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-opacity ${
                i === index ? "ring-2 ring-brand opacity-100" : "opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
