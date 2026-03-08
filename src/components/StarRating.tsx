import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  songId: string;
  averageRating: number;
  totalVotes: number;
  userRating: number | null;
  onRate: (rating: number) => void;
}

const StarRating = ({ averageRating, totalVotes, userRating, onRate }: StarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayRating = hovered ?? userRating ?? 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onClick={() => onRate(star)}
            className="transition-transform duration-150 hover:scale-110 focus:outline-none"
          >
            <Star
              className={`w-4 h-4 transition-colors duration-150 ${
                star <= displayRating
                  ? "text-primary fill-primary"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
      {totalVotes > 0 && (
        <span className="text-[10px] font-body text-muted-foreground tracking-wide">
          {averageRating.toFixed(1)} ({totalVotes})
        </span>
      )}
    </div>
  );
};

export default StarRating;
