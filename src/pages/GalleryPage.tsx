import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Background from "../components/layout/Background";
import { ImageZoomModal } from "../components/ui/ImageZoomModal";
import { GalleryView } from "../components/gallery/GallerySection";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

import { API } from "../constants";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    fetch(`${API.BASE_URL}/fatherofjs`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  const handleZoom = (url: string) => {
    setZoomImage({ src: url, alt: "Gallery Image" });
  };

  return (
    <Layout>
      <Background showShootingStars={false} />
      <GalleryView 
        images={images} 
        onImageClick={handleZoom} 
        cloudName={cloudName} 
      />

      {zoomImage && (
        <ImageZoomModal
          src={zoomImage.src}
          alt={zoomImage.alt}
          onClose={() => setZoomImage(null)}
        />
      )}
    </Layout>
  );
}