import Background from "../components/layout/Background";
import Layout from "../components/layout/Layout";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

import { useEffect, useState } from "react";
import { API } from "../constants";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API.BASE_URL}/fatherofjs`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <Layout>
      <Background showShootingStars={false} />
      <style>
        {`
          .gallery {
            column-count: 3;
            column-gap: 12px;
            width: 90%;
            margin: 0 auto;
          }

          .img-wrapper {
            margin-bottom: 12px;
            break-inside: avoid;
            overflow: hidden; /* ✅ THIS is the key fix */
            border-radius: 10px;
          }

          .img-wrapper img {
            width: 100%;
            display: block;
            transition: transform 0.25s ease;
          }

          .img-wrapper img:hover {
            transform: scale(1.05);
          }

          @media (max-width: 900px) {
            .gallery {
              column-count: 2;
            }
          }

          @media (max-width: 500px) {
            .gallery {
              column-count: 1;
            }
          }
        `}
      </style>

      <div className="gallery">
        {images.map((img: any) => (
          <div className="img-wrapper" key={img.public_id}>
            <img
              src={`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${img.public_id}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}