// app/social/page.tsx (server)
import Image1 from '@/assets/imgs/Gallary/Image1.webp'
import Image2 from '@/assets/imgs/Gallary/Image2.webp'
import Image3 from '@/assets/imgs/Gallary/Image3.webp'
import Image4 from '@/assets/imgs/Gallary/Image4.webp'
import Image5 from '@/assets/imgs/Gallary/Image5.webp'
import Image6 from '@/assets/imgs/Gallary/Image6.webp'
import Image7 from '@/assets/imgs/Gallary/Image7.webp'

import SocialClient from "@/components/clientComponents/SocialClient";

export const metadata = {
  title: "Social | RIVO",
  description: "Follow RIVO — Instagram, TikTok and gallery",
};

export default function SocialPage() {
  const images = [
    Image1.src,
    Image2.src,
    Image3.src,
    Image4.src,
    Image5.src,
    Image6.src,
    Image7.src,
  ];

  return <SocialClient images={images} linksBgImage={Image1.src} />;
}
