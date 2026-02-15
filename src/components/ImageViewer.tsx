import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"

interface ImageViewerProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  projectSlug: string
  projectTitle: string
}

export function ImageViewer({
  images,
  currentIndex,
  projectSlug,
}: ImageViewerProps) {
  const [isLoaded, setIsLoaded] = useState(true)

  const total = images.length
  const current = images[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < total - 1

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return
      window.location.href = `/works/${projectSlug}/${index + 1}`
    },
    [projectSlug, total]
  )

  const goPrev = useCallback(() => {
    if (hasPrev) goTo(currentIndex - 1)
  }, [hasPrev, goTo, currentIndex])

  const goNext = useCallback(() => {
    if (hasNext) goTo(currentIndex + 1)
  }, [hasNext, goTo, currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goPrev, goNext])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Image area */}
      <div className="flex items-center justify-center px-6 lg:px-16 max-h-[85vh]">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className={cn(
              "max-w-full max-h-[85vh] object-contain transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
          />
      </div>

      {/* Bottom navigation bar */}
      <div className="flex items-center justify-center px-6 pt-2 lg:px-16">
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={!hasPrev}
            className={cn(
              "p-1 transition-opacity",
              hasPrev ? "text-foreground hover:opacity-60" : "text-muted-foreground/30 cursor-default"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-[10px] tracking-[0.2em] tabular-nums text-muted-foreground">
            {currentIndex + 1} / {total}
          </span>

          <button
            onClick={goNext}
            disabled={!hasNext}
            className={cn(
              "p-1 transition-opacity",
              hasNext ? "text-foreground hover:opacity-60" : "text-muted-foreground/30 cursor-default"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
