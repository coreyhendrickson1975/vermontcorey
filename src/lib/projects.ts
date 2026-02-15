export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  title: string
  slug: string
  ongoing?: boolean
  images: ProjectImage[]
}

export const projects: Project[] = [
  {
    title: "Ghost Malls",
    slug: "ghost-malls",
    images: [
      { src: "/images/Ghost_Mall-1.jpg", alt: "Ghost Malls" },
      { src: "/images/Ghost_Mall-2.jpg", alt: "Ghost Malls" },
      { src: "/images/Ghost_Mall-3.jpg", alt: "Ghost Malls" },
      { src: "/images/Ghost_Mall-4.jpg", alt: "Ghost Malls" },
      { src: "/images/Ghost_Mall-5.jpg", alt: "Ghost Malls" },
    ],
  },
  {
    title: "RT 125",
    slug: "rt-125",
    ongoing: true,
    images: [
      { src: "/images/RT125-1.jpg", alt: "RT 125" },
      { src: "/images/RT125-2.jpg", alt: "RT 125" },
      { src: "/images/RT125-3.jpg", alt: "RT 125" },
      { src: "/images/RT125-4.jpg", alt: "RT 125" },
      { src: "/images/RT125-5.jpg", alt: "RT 125" },
    ],
  },
  {
    title: "Portraits",
    slug: "portraits",
    images: [
      { src: "/images/gallery-1.jpg", alt: "Portraits" },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
