import Image from 'next/image';
import Link from 'next/link';
import { Users, Heart, LifeBuoy } from 'lucide-react';
import HeroSlider from '@/shared/components/common/HeroSlider';
import SectionHeading from '@/shared/components/common/SectionHeading';
import { Brain, MessageSquare, Utensils, GraduationCap, TrendingUp, HeartHandshake, Stethoscope, Gift } from 'lucide-react';
import CounterSection from '@/shared/components/common/CounterSection';
import TestimonialCarousel from '@/shared/components/common/TestimonialCarousel';
import SponsorLogos from '@/shared/components/common/SponsorLogos';
import CTASection from '@/shared/components/common/CTASection';

import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import TeamCard from '@/features/team/components/TeamCard';
import { Progress } from '@/shared/components/ui/progress';
import {
  slides,
  counterItems,
  teamMembers,
  testimonials,
  sponsorLogos,
  galleryImages,
} from '@/features/home/data';
import { successStories } from '@/features/success-stories/data';

const services = [
  {
    icon: Brain,
    title: 'Applied Behavior Therapy',
    description:
      'Individualized ABA-based programs that improve communication, behavior, and essential life skills for each child on the spectrum.',
  },
  {
    icon: MessageSquare,
    title: 'Speech Therapy',
    description:
      'Structured support for language development, communication skills, and social interaction tailored to each child\'s needs.',
  },
  {
    icon: Utensils,
    title: 'Food Therapy',
    description:
      'Specialized programs to address feeding challenges, improve nutrition, and build tolerance for a wider range of foods.',
  },
  {
    icon: GraduationCap,
    title: 'Parent Training',
    description:
      'Practical training sessions that equip parents with skills to support their children at home — ensuring consistency between sessions.',
  },
  {
    icon: TrendingUp,
    title: 'Parent Empowerment',
    description:
      'Income-generating initiatives that help parents build sustainable livelihoods while caring for their children full-time.',
  },
  {
    icon: HeartHandshake,
    title: 'Social & Financial Aid',
    description:
      'Financial assistance, clothing, holiday meal support, and sponsorship programs for families facing hardship.',
  },
  {
    icon: Stethoscope,
    title: 'Health & Wellness',
    description:
      'Free annual medical check-ups for children and their parents, ensuring health is never a barrier to progress.',
  },
  {
    icon: Gift,
    title: 'Daily Meal Support',
    description:
      'Nutritional support for 38 children every day through community partnerships — because learning starts with a full meal.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Slider */}
      <HeroSlider slides={slides} />

      {/* 2. Mission / About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll animation="fadeLeft">
              <div>
                <SectionHeading title="Our" highlightedWord="Mission" align="left" />
                <p className="text-foreground">
                  We are dedicated to providing holistic care, education, and empowerment to children
                  with Autism Spectrum Disorder (ASD). Since our founding in 2011, we have worked
                  tirelessly to break the social stigma associated with autism in Ethiopia. Our mission
                  is to create an inclusive environment where our children can thrive and reach their
                  full potential.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <Image
                    src="/images/signature.png"
                    alt="CEO Signature"
                    width={120}
                    height={50}
                  />
                  <div>
                    <p className="font-serif font-semibold text-heading">Rahel Abayneh</p>
                    <p className="text-sm text-foreground">Founder &amp; Director</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeRight">
              <Image
                src="/images/volunteers.jpg"
                alt="Our volunteers in action"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </AnimateOnScroll>
          </div>

          {/* 3. Highlight Boxes */}
          <div className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-3">
            <div className="flex gap-4 border bg-white p-8">
              <div className="text-4xl text-primary">
                <Users className="size-10" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-heading">Volunteering</h3>
                <p className="mt-2 text-sm text-foreground">
                  Join our network of volunteers and make a direct impact in the lives of
                  children with autism and their families.
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-primary p-8 text-white">
              <div className="text-4xl text-white">
                <Heart className="size-10" />
              </div>
              <div>
                <h3 className="font-serif font-semibold">Donating</h3>
                <p className="mt-2 text-sm text-white/80">
                  Your contributions directly support therapy sessions, special education
                  programs, and center facilities.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border bg-white p-8">
              <div className="text-4xl text-primary">
                <LifeBuoy className="size-10" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-heading">Help &amp; Support</h3>
                <p className="mt-2 text-sm text-foreground">
                  We provide comprehensive support services including therapy, life skills training, and
                  parental counseling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Urgent Cause Section */}
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fadeLeft">
                <Image
                  src="/images/about-us.jpg"
                  alt="Urgent cause - Education for all"
                  width={700}
                  height={450}
                  className="rounded-lg"
                />
              </AnimateOnScroll>
            </div>
            <div className="lg:col-span-5">
              <AnimateOnScroll animation="fadeRight">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Urgent Cause
                </span>
                <hr className="my-3 h-0.5 w-12 border-0 bg-primary" />
                <h2 className="font-serif text-3xl font-medium text-heading">
                  Support Holistic Care for Children with Autism
                </h2>
                <p className="mt-4 text-foreground">
                  Many children with autism in Ethiopia come from families with limited financial resources.
                  Our center relies heavily on support to provide access to necessary therapies, specialized
                  education, and learning resources. Help us accommodate more children and expand our capacity
                  for training teachers.
                </p>
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-heading">TARGET: $10,000</span>
                    <span className="font-semibold text-heading">RAISED: $6,000</span>
                  </div>
                  <Progress value={60} />
                  <p className="mt-1 text-right text-xs font-bold text-primary">60%</p>
                </div>
                <div className="mt-6 flex gap-4">
                  <Link
                    href="/about"
                    className="inline-block rounded bg-text-dark px-6 py-2.5 text-xs font-semibold uppercase text-white transition hover:bg-black"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/donate"
                    className="inline-block rounded bg-primary px-6 py-2.5 text-xs font-semibold uppercase text-white transition hover:bg-primary-hover"
                  >
                    Donate Now
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Counter Section */}
      <CounterSection items={counterItems} />

      {/* 6. Services Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimateOnScroll animation="fadeUp">
            <SectionHeading
              title="Services We"
              highlightedWord="Provide"
              subtitle="A holistic model of care that addresses the needs of the whole child — and the whole family."
              align="center"
            />
          </AnimateOnScroll>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }) => (
              <AnimateOnScroll key={title} animation="fadeUp">
                <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="size-5 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 font-serif font-semibold text-heading">{title}</h3>
                  <p className="text-sm leading-relaxed text-foreground">{description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="font-semibold text-primary transition hover:text-primary-dark"
            >
              Learn More About Our Programs &raquo;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Our"
            highlightedWord="Volunteer"
            subtitle="Meet the dedicated individuals who donate their time and skills to make our mission possible."
            align="left"
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {teamMembers.map((member) => (
              <AnimateOnScroll key={member.slug} animation="fadeUp">
                <TeamCard {...member} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <CTASection
        title="Make a Difference for Children with ASD"
        buttonLabel="Join With Us"
        buttonHref="/contact"
        backgroundImage="/images/cta_bg.jpg"
        videoUrl="https://www.youtube.com/watch?v=S0T0t1o_mNo"
      />

      {/* 9. Testimonials Section */}
      <TestimonialCarousel
        title="What People Say"
        highlightedWord="Say"
        subtitle="Hear from the people whose lives have been touched by our work."
        testimonials={testimonials}
      />

      {/* 10. Success Stories Section */}
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Stories of"
            highlightedWord="Hope"
            subtitle="Discover the inspiring journeys of the children and families whose lives have been transformed."
            align="center"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {successStories.slice(0, 3).map((story) => (
              <AnimateOnScroll key={story.id} animation="fadeUp">
                <div className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all h-full flex flex-col border border-gray-100">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={story.images[0]}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="mb-3 font-serif text-xl font-semibold text-heading line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-foreground leading-relaxed text-sm mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link href={`/success-stories`} className="font-semibold text-primary transition hover:text-primary-dark">
                        Read More &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link
               href="/success-stories"
               className="inline-block rounded bg-primary px-8 py-3 text-sm font-semibold uppercase text-white transition hover:bg-primary-hover"
             >
               View All Stories
             </Link>
          </div>
        </div>
      </section>

      {/* 11. Gallery Section */}
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Photo"
            highlightedWord="Archives"
            subtitle="Browse through moments captured during our events, campaigns, and community outreach programs."
            align="center"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Sponsors Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Our"
            highlightedWord="Sponsors"
            subtitle="We are grateful to our sponsors and partners who make our work possible through their generous support."
            align="left"
          />
        </div>
        <SponsorLogos logos={sponsorLogos} />
      </section>

      {/* 13. Newsletter Section */}

    </>
  );
}
