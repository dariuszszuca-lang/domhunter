import Image from "next/image";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

type MemberPhotoProps = {
  member: TeamMember;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

// Subtle warm gradients per agent (deterministyczne wg slug) — premium feel placeholderu
const gradients = [
  "from-[#E8DCD3] via-[#D7C9BC] to-[#C2B0A0]",
  "from-[#F0E5DE] via-[#E0CFC2] to-[#BFA593]",
  "from-[#E2D3CB] via-[#CDB7AC] to-[#9F8779]",
  "from-[#F2E8E2] via-[#DCC8BC] to-[#A8907F]",
  "from-[#DED2C9] via-[#B5A296] to-[#8C7567]",
  "from-[#E9DCD0] via-[#C8B19F] to-[#967962]",
  "from-[#EDE0D5] via-[#D2BBAA] to-[#A38975]",
  "from-[#E5D7CB] via-[#BDA593] to-[#8F715E]",
];

function pickGradient(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

export function MemberPhoto({
  member,
  sizes,
  priority = false,
  className,
  imageClassName,
}: MemberPhotoProps) {
  const grad = pickGradient(member.slug);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br flex items-center justify-center",
        grad,
        className
      )}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.fullName}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle radial accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.45),transparent_50%),radial-gradient(circle_at_75%_85%,rgba(153,26,117,0.18),transparent_55%)]" />
          {/* Monogram */}
          <div className="relative flex flex-col items-center gap-1">
            <span className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold tracking-[-0.05em] text-foreground/85 leading-none">
              {member.firstName[0]}
              {member.lastName[0]}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55">
              DomHunter
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
