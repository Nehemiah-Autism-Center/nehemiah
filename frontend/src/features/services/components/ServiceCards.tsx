import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import { services } from '@/features/services/data';

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {services.map(({ slug, title, description, icon: Icon }) => (
        <AnimateOnScroll key={slug} animation="fadeUp">
          <article className="h-full rounded-lg border bg-white p-8 shadow-sm">
            <div className="bg-primary/10 text-primary mb-5 flex size-14 items-center justify-center rounded-full">
              <Icon className="size-7" aria-hidden="true" />
            </div>
            <h3 className="text-heading font-serif text-xl font-semibold">{title}</h3>
            <p className="text-foreground mt-3 text-sm leading-relaxed">{description}</p>
          </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
