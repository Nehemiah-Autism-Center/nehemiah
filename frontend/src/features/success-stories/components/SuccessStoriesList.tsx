import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import { successStories } from '@/features/success-stories/data';
import SuccessStoryCard from './SuccessStoryCard';

export default function SuccessStoriesList() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {successStories.map((story) => (
        <AnimateOnScroll key={story.slug} animation="fadeUp">
          <SuccessStoryCard
            image={story.images[0]}
            title={story.title}
            excerpt={story.excerpt}
            slug={story.slug}
          />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
