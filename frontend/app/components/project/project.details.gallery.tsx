import CustomScrollBar from "@/widgets/customScrollBar";
import { useRef, useState } from "react";
import LightBoxOverlay from "./project.gallery.overlay";

export interface GalleryData {
    url: string;
    description: string;
}

export interface ProjectDetailsGalleryProbs {
    title: string;
    gallery: Array<GalleryData>;
}

export default function ProjectDetailsGallery( {title, gallery}: ProjectDetailsGalleryProbs ) {

    const galleryContentRef = useRef<HTMLUListElement>(null);
    
    const [openImageIndex, setOpenImage] = useState<number>(-1);

    const [isDragging, setIsDragging] = useState(false);;

    const onOpenImage = (index: number) => {
        if (isDragging) return;
        setOpenImage(index);
    }

    const onCloseImage = () => {
        setOpenImage(-1);
    }

    if (gallery && gallery.length > 0) {
        return (
            <div className="project_gallery_wrapper">
                <h5>
                    {title}
                </h5>
                <ul ref={galleryContentRef} className="project_gallery_content">
                    {
                        gallery.map((image, index) => (
                            <li 
                                className="project_gallery_image_container"
                                key={index}>
                                <img 
                                    className="project_gallery_image"
                                    onClick={() => onOpenImage(index)}
                                    src={image.url}
                                    alt=""
                                />
                            </li>
                        ))
                    }
                </ul>
                <CustomScrollBar 
                    wrapperRef={galleryContentRef}
                    setIsDragging={setIsDragging} />
                {
                    (openImageIndex != -1)
                    ? <LightBoxOverlay 
                        gallery={gallery} 
                        start={openImageIndex}
                        onClose={onCloseImage}
                    />
                    : null
                }
            </div>
        )
    }
    return null;
}