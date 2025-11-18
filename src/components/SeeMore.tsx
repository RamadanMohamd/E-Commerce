import type { SeeMoreProps } from "@/types/seeMore";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Button } from '@/components/ui/button';
import DOMPurify from "dompurify";
import { useTranslation } from "@/hooks/useTranslation";

export default function SeeMore({ title, content }: SeeMoreProps) {
  const { t } = useTranslation();
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const toggleSeeMore = () => {
    setIsSeeMoreOpen((prev) => !prev);
  };

  const sanitizedContent = useMemo(() => DOMPurify.sanitize(content || ""), [content]);

  return (
    <div className="mb-8 sm:mb-10">
      {title && <p className="mb-3 font-semibold sm:text-lg text-gray-900">{title}</p>}

      <div
        className={cn(
          "mb-4 max-h-[100px] overflow-hidden text-sm leading-relaxed text-[#4b5563] transition-all duration-300 sm:text-base",
          isSeeMoreOpen && "max-h-[1000px] py-4"
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>

      <Button variant="link" size="sm"      className="flex-1 !text-black  rounded-lg focus:outline-none focus:ring-black border-0"
 onClick={toggleSeeMore}>
        {isSeeMoreOpen ? t('products.seeLess') : t('products.seeMore')}
      </Button>
    </div>
  );
}
