'use client';

import Select from '../ui/Select';
import { SORT_OPTIONS } from '@/lib/constants';

interface CategoryFilterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function CategoryFilter({
  sortBy,
  onSortChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F0F0F0]">
      <div>
        <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
          Showing all products
        </p>
      </div>

      <div className="w-full sm:w-auto min-w-[200px]">
        <Select
          label="Sort by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={SORT_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
        />
      </div>
    </div>
  );
}
