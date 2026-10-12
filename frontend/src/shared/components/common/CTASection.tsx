import Image from 'next/image';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundImage?: string;
}

export default function CTASection({
  title,
  description,
  buttonLabel,
  buttonHref,
  backgroundImage,
}: CTASectionProps) {
  return (
    <section className="bg-primary relative py-16 text-center text-white md:py-20">
      {backgroundImage && (
        <>
          <Image src={backgroundImage} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
          <HeartHandshake className="h-7 w-7 text-white" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-white/90 md:text-lg">{description}</p>}
        <Link
          href={buttonHref}
          className="text-primary mt-8 inline-block rounded bg-white px-8 py-3 text-sm font-semibold uppercase transition hover:bg-gray-100"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
