"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Coffee, MapPin, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // shadcn button (أو كومبوننت بديل)
import { getFeaturedProducts } from "@/data/products";
import { branches } from "@/data/branches";
import Image from "next/image";
import HeroImage from "@/assets/Sections/Hero.webp";
import refillSVG from "../../assets/Sections/refill.webp";
import TestimonialsCarousel from "../sections/TestimonialsCarousel";
import ProductCard from "../ProductCard";
import Stack from "../ui/Stack";
import NewCard from "../NewCard";
import NewBg from '@/assets/Sections/NewBg.webp'

export default function HomeClient() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* -------------------- HERO (PRIMARY) -------------------- */}
      <section className="relative overflow-hidden bg-primary text-foreground text-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="container mx-auto px-4 relative"
            >
              <div className="container mx-auto px-4 relative">
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl">
                    <div className="w-full">
                      <Image
                        src={HeroImage}
                        alt="RIVO showcase"
                        className="w-full h-full object-cover scale-130"
                        width={1600}
                        height={1000}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 min-h-full min-w-full select-none"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="pt-25"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-card text-primary rounded-full text-sm font-medium mb-6">
                <Coffee className="w-4 h-4" />
                Premium Coffee Experience
              </span>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Your Perfect Cup,</span>{" "}
                <span className="text-white">Anytime</span>
              </h1>

              <p className="mt-6 text-lg text-white max-w-lg mx-auto">
                Experience exceptional coffee crafted with passion. Order
                online, find your nearest branch, and discover available seats
                in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Link href="/products">
                  <Button className="btn-primary group w-full sm:w-auto">
                    Order Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/branches">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl bg-card text-card-foreground hover:bg-card/90"
                  >
                    <MapPin className="mr-2 w-4 h-4 text-secondary-foreground" />
                    View Branches
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------- FEATURED PRODUCTS (WHITE) -------------------- */}
      <section className="py-16 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-card-foreground">
                Featured Products
              </h2>
              <p className="mt-2 text-secondary-foreground">
                Our most popular selections
              </p>
            </div>
            <Link href="/products">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary"
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <AnimatePresence mode="wait">
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-y-15 pt-10">
                {featuredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
              </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* -------------------- refill -------------------- */}
      <section id="showcase" className="py-16 bg-[#4215D3] text-foreground">
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <div className="w-full">
                <Image
                  src={refillSVG}
                  alt="RIVO showcase"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={1000}
                />
              </div>
            </motion.div>
          </div>
          <div className="absolute top-0 min-h-full min-w-full select-none"></div>
        </div>
      </section>

      {/* -------------------- BRANCHES (PRIMARY again) -------------------- */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto bg-primary p-10 rounded-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="font-heading text-primary-foreground text-3xl md:text-4xl font-bold">
                Our Branches
              </h2>
              <p className="mt-3 text-primary-foreground/90 max-w-md">
                Find your nearest RIVO branch and enjoy the same premium
                experience everywhere.
              </p>
            </div>

            <Link href="/branches">
              <Button
                variant="outline"
                className="self-start md:self-auto rounded-xl border-border hover:bg-card "
              >
                View All Branches
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          {/* Branches Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {branches.slice(0, 3).map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
              >
                <Link href={`/branches/${branch.slug}`}>
                  <article className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer">
                    {/* Image */}
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-500 group-hover:bg-white/15">
                        <h3 className="font-heading text-xl font-semibold text-white">
                          {branch.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/80">
                          {branch.address}, {branch.city}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- New Section (Stack) -------------------- */}
      <section
        className="w-full h-[70vh] sm:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${NewBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="flex items-center justify-center pt-10"
          style={{
            width: 350,
            height: "100%", // ياخد ارتفاع السكشن
            maxHeight: "100%", // يمنع الخروج بره
          }}
        >
          <Stack
            randomRotation={false}
            sensitivity={200}
            sendToBackOnClick={true}
            cards={featuredProducts.map((product, index) => (
              <NewCard key={product.id} product={product} index={index} />
            ))}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={false}
          />
        </div>
      </section>


      {/* -------------------- TESTIMONIALS (PRIMARY) -------------------- */}
      <TestimonialsCarousel />

      {/* -------------------- CTA (PRIMARY) -------------------- */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready for Your Perfect Cup?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Order now and experience the RIVO difference. Premium coffee,
                exceptional service.
              </p>
              <Link href="/products">
                <Button
                  size="lg"
                  className="mt-8 bg-background text-primary hover:bg-background/90 rounded-xl font-semibold"
                >
                  Start Your Order
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
