"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  images?: string[];
  instagram?: string;
  tiktok?: string;
  brand?: string;
  linksBgImage?: string;
  ctaBgImage?: string;
};

export default function SocialClient({
  images,
  instagram = "https://www.instagram.com/rivo_coffee",
  tiktok = "https://www.tiktok.com/@rivocoffee",
  brand = "RIVO",
  linksBgImage = "/gallery/links-bg.jpg",
  ctaBgImage,
}: Props) {
  return (
    <main className="w-full min-h-screen">
      {/* SOCIAL LINKS SECTION */}
      <motion.section
        suppressHydrationWarning
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 px-6 min-h-[93vh] md:px-12 lg:px-20 text-white flex flex-col justify-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${linksBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          suppressHydrationWarning
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="max-w-6xl min-h-full"
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            {brand}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 max-w-xl opacity-90"
          >
            Follow us on social media and explore our latest moments.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 transition"
            >
              Instagram
            </a>

            <a
              href={tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 transition"
            >
              TikTok
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* GALLERY SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            suppressHydrationWarning
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {/* Featured image */}
            {images?.[1] && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.96 },
                  show: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative col-span-2 row-span-2 aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-200"
              >
                <Image
                  src={images[1]}
                  alt="Featured gallery image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            )}

            {/* Rest of images */}
            {images?.slice(3).map((src, i) => (
              <motion.div
                key={src + i}
                variants={{
                  hidden: { opacity: 0, scale: 0.96 },
                  show: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPLY CTA SECTION */}
      <section
        className="relative h-[60vh] px-6 md:px-12 lg:px-20 text-white flex flex-col justify-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
            url(${ctaBgImage})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}

      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Work With RIVO
          </h2>

          <p className="mt-5 text-white/80 max-w-xl mx-auto mb-10">
            Whether you’re looking for a job, have a creative idea,
            or want to be part of our campaigns — we’re open to hearing from you.
          </p>

          <Link
              href="/join"
              rel="noopener noreferrer"
              className="relative
                      w-full sm:w-auto
                      rounded-full
                      border border-white/30
                      bg-white/5
                      backdrop-blur-sm
                      px-8 py-3

                      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                      hover:bg-white/30
                      transition-all duration-200

                      before:absolute
                      before:inset-0
                      before:rounded-full
                      before:bg-linear-to-b
                      before:from-white/40
                      before:to-transparent
                      before:opacity-70
                      before:pointer-events-none

                      after:absolute
                      after:inset-0
                      after:rounded-full
                      after:ring-1
                      after:ring-white/20
                      after:pointer-events-none

                      active:scale-95"
            >
              Join Us
            </Link>
        </motion.div>
      </section>

    </main>
  );
}
