'use client';

import Image from 'next/image';
import CountUp from 'react-countup';

interface CounterItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
}

interface CounterSectionProps {
  items: CounterItem[];
  backgroundImage?: string;
}

export default function CounterSection({
  items,
  backgroundImage = '/images/counter_bg.jpg',
}: CounterSectionProps) {
  return (
    <section className="relative">
      <Image src={backgroundImage} alt="Counter background" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-primary mb-4 flex justify-center text-4xl">{item.icon}</div>
              <p className="mb-2 text-sm tracking-wider text-white/80 uppercase">{item.label}</p>
              <div className="text-4xl font-bold md:text-5xl">
                <CountUp
                  end={item.value}
                  suffix={item.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                  duration={2.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
