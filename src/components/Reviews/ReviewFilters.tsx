import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DashedSeparator } from '@/components/DashedSeparator';
import type { ReviewFilter } from '@/types/reviews';


const Checkbox: React.FC<{ checked?: boolean; onCheckedChange?: (checked: boolean) => void }> = ({
  checked = false,
  onCheckedChange = () => {},
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
    />
  );
};

interface ReviewFiltersProps {
  className?: string;
}

const RATING_OPTIONS = [
  { value: 5, label: '5 Star' },
  { value: 4, label: '4 Star' },
  { value: 3, label: '3 Star' },
  { value: 2, label: '2 Star' },
  { value: 1, label: '1 Star' },
];

const TOPIC_OPTIONS = [
  'Product Quality',
  'Better Service',
  'Product Price',
  'Shipment',
  'Match with Description',
];

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  className = '',
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>();
  const [selectedTopic, setSelectedTopic] = useState<string | null>();
  const [withMedia, setWithMedia] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isTopicOpen, setIsTopicOpen] = useState(true);

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
  };

  const handleTopicChange = (topic: string) => {
    const newTopic = selectedTopic === topic ? null : topic;
    setSelectedTopic(newTopic);
  };

  const handleMediaFilterChange = (checked: boolean) => {
    setWithMedia(checked);
  };

  return (
    <div className={cn('space-y-4 sticky', className)}>
      {/* Rating Filter */}
      <div>
        <Collapsible open={isRatingOpen} onOpenChange={setIsRatingOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group mb-4">
            <p className="text-base font-semibold text-gray-900">Rating</p>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                isRatingOpen && "transform rotate-180"
              )} 
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3">
              {RATING_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={selectedRating === option.value}
                    onCheckedChange={() => handleRatingChange(option.value)}
                  />
                  <span className="flex items-center gap-1.5 text-sm text-gray-600">
                    <span className="text-orange-400 text-base">★</span>
                    <span>{option.value}</span>
                  </span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Topic Filter */}
      <div>
        <Collapsible open={isTopicOpen} onOpenChange={setIsTopicOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group mb-4">
            <p className="text-base font-semibold text-gray-900">Review Topics</p>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                isTopicOpen && "transform rotate-180"
              )} 
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3">
              {TOPIC_OPTIONS.map((topic) => (
                <label key={topic} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={selectedTopic === topic}
                    onCheckedChange={() => handleTopicChange(topic)}
                  />
                  <span className="text-sm text-gray-600">{topic}</span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Media Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox checked={withMedia} onCheckedChange={handleMediaFilterChange} />
          <span className="text-sm text-[#6b7280]">With Photo & Video</span>
        </label>
      </div>
    </div>
  );
};
