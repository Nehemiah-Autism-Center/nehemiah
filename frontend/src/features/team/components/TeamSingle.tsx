import Image from 'next/image';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Separator } from '@/shared/components/ui/separator';
import { Progress } from '@/shared/components/ui/progress';
import type { TeamMember } from '@/features/team/types';

interface TeamSingleProps {
  member: TeamMember;
}

const skills = [
  { name: 'Leadership', value: 90 },
  { name: 'Communication', value: 85 },
  { name: 'Project Management', value: 80 },
  { name: 'Community Engagement', value: 95 },
];

export default function TeamSingle({ member }: TeamSingleProps) {
  return (
    <article className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-heading font-serif text-3xl font-medium">{member.name}</h2>
          <p className="text-primary mt-1 text-sm font-semibold uppercase">{member.role}</p>

          <Separator className="my-6" />

          {/* Bio */}
          <div className="space-y-4">
            {member.bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-heading text-sm font-semibold">Follow:</span>
            {member.social?.facebook && (
              <a
                href={member.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
              >
                <Facebook size={18} />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
              >
                <Twitter size={18} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition hover:text-white"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-heading mb-6 font-serif text-xl font-semibold">Skills</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-heading font-semibold">{skill.name}</span>
                <span className="text-primary">{skill.value}%</span>
              </div>
              <Progress value={skill.value} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
