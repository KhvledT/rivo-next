'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'
import TestimonialPerson from '../../assets/imgs/Testimonial-person.png'

type Testimonial = {
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Regular Customer',
    content: 'Best coffee in town! The app makes ordering so convenient.',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Ahmed K.',
    role: 'Coffee Enthusiast',
    content: 'Love the seat availability feature. No more waiting for tables!',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Mona R.',
    role: 'Freelancer',
    content: 'My go-to workspace. Great coffee and amazing atmosphere.',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Ahmed K.',
    role: 'Coffee Enthusiast',
    content: 'Love the seat availability feature. No more waiting for tables!',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Mona R.',
    role: 'Freelancer',
    content: 'My go-to workspace. Great coffee and amazing atmosphere.',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Ahmed K.',
    role: 'Coffee Enthusiast',
    content: 'Love the seat availability feature. No more waiting for tables!',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Mona R.',
    role: 'Freelancer',
    content: 'My go-to workspace. Great coffee and amazing atmosphere.',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
  {
    name: 'Ahmed K.',
    role: 'Coffee Enthusiast',
    content: 'Love the seat availability feature. No more waiting for tables!',
    rating: 5,
    avatar: TestimonialPerson.src,
  },
]


export default function TestimonialsCarousel() {
  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-foreground/80 max-w-2xl mx-auto">
            Join thousands of satisfied coffee lovers
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-6">
            {testimonials.map((t, i) => (
              <CarouselItem
                key={i}
                className="
                  pl-6
                  basis-full          /* 📱 mobile = 1 */
                  md:basis-1/2        /* 📱➡️💻 tablet = 2 */
                  lg:basis-1/3        /* 💻 desktop = 3 */
                "
              >
                {/* ---------- CUSTOM TESTIMONIAL CARD ---------- */}
                <article
                  role="article"
                  aria-label={`Review by ${t.name}`}
                  className="relative w-full max-w-xl mx-auto py-5 cursor-grab select-none"
                >

                  {/* Main card */}
                  <div
                    className="relative -mt-8 bg-card rounded-2xl border border-border"
                    style={{ padding: '28px' }}
                  >
                    <div className="flex gap-5 items-start">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background shadow-sm">
                          <Image
                            src={t.avatar!}
                            alt={t.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-card-foreground">
                          {t.name}
                        </h4>
                        <p className="text-sm text-black mb-2">
                          {t.role}
                        </p>

                        <div className="flex items-center gap-1">
                          {[...Array(t.rating)].map((_, k) => (
                            <Star
                              key={k}
                              className="w-4 h-4 fill-yellow-300 text-yellow-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="mt-4 text-black leading-relaxed">
                      “{t.content}”
                    </p>
                  </div>
                </article>
                {/* ---------- END CARD ---------- */}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}
