import Background from "../components/layout/Background";
import Layout from "../components/layout/Layout";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function Gallery() {
  const images = ["98303acd63b73b65e3aa2f96dbbed252_eq71uq", "IMG_2878_nmn5vx", "IMG_2881_ogch7s", "IMG_2879_zucsjs", "IMG_2887_b9ucqp", "IMG_2880_epaunp", "IMG_2999_vhbrmn", "124d033dbdbbedc4998de3803c6303a4_iacfq9", "IMG_2977_fbzi1a"];

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
        {images.map((id) => (
          <div className="img-wrapper" key={id}>
            <img
              key={id}
              src={`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${id}.jpg`}
              alt=""
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}