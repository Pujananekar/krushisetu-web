import GalleryHero from "../../components/gallery/GalleryHero"
import GalleryHighlights from "../../components/gallery/GalleryHighlights"
import GalleryCTA from "../../components/gallery/GalleryCTA"
import GalleryNews from "../../components/gallery/GalleryNews"

const Gallery = () => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">
            <GalleryHero />
            <GalleryHighlights />
            <GalleryNews />
            <GalleryCTA />
        </main>
    )
}

export default Gallery