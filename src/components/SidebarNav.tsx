import { useState } from "react"
import { cn } from "../lib/utils"
import { ChevronDown, Menu, X } from "lucide-react"

interface Project {
  title: string
  slug: string
  ongoing?: boolean
}

const projects: Project[] = [
  { title: "Ghost Malls", slug: "ghost-malls" },
  { title: "RT 125", slug: "rt-125", ongoing: true },
  { title: "Portraits", slug: "portraits" },
]

interface SidebarNavProps {
  currentPath: string
}

export function SidebarNav({ currentPath }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [worksExpanded, setWorksExpanded] = useState(true)

  const currentProject = projects.find((p) => currentPath.includes(p.slug))

  return (
    <>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-background lg:hidden">
        <a href="/" className="text-[11px] font-sans tracking-[0.3em] uppercase text-foreground leading-relaxed">
          Corey Hendrickson<br />Fine Art
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground p-1"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background pt-16 px-5 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="pt-8">
          <button
            onClick={() => setWorksExpanded(!worksExpanded)}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase text-foreground mb-4"
          >
            Photographs
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                worksExpanded && "rotate-180"
              )}
            />
          </button>
          {worksExpanded && (
            <ul className="pl-4 flex flex-col gap-3 mb-8">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`/works/${project.slug}/1`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-[11px] tracking-[0.15em] uppercase transition-colors",
                      currentProject?.slug === project.slug
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {project.title}
                    {project.ongoing && " (ongoing)"}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a
            href="/info"
            onClick={() => setMobileOpen(false)}
            className="text-[11px] tracking-[0.3em] uppercase text-foreground"
          >
            Info
          </a>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 lg:py-10 lg:px-8 lg:bg-background lg:z-50">
        <div>
          <a
            href="/"
            className="block text-[11px] font-sans tracking-[0.3em] uppercase text-foreground mb-12 leading-relaxed whitespace-nowrap"
          >
            Corey Hendrickson<br />Fine Art
          </a>

          <nav>
            <button
              onClick={() => setWorksExpanded(!worksExpanded)}
              className="flex items-center gap-1.5 text-[11px] tracking-[0.3em] uppercase text-foreground mb-4 hover:opacity-60 transition-opacity"
            >
              Photographs
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  worksExpanded && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                worksExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <ul className="pl-4 flex flex-col gap-2.5 mb-8">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <a
                      href={`/works/${project.slug}/1`}
                      className={cn(
                        "text-[11px] tracking-[0.12em] uppercase transition-opacity",
                        currentProject?.slug === project.slug
                          ? "text-foreground opacity-100"
                          : "text-muted-foreground hover:opacity-70"
                      )}
                    >
                      {project.title}
                      {project.ongoing && " (ongoing)"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="/info"
              className={cn(
                "text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60",
                currentPath === "/info" ? "text-foreground" : "text-foreground"
              )}
            >
              Info
            </a>
          </nav>
        </div>

        <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
          &copy;2026 Corey Hendrickson - All Rights Reserved
        </p>
      </aside>
    </>
  )
}
