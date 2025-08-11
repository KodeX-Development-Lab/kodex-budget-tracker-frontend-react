"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";

export function YearPicker({
  value,
  onChange,
  yearRange = 12,
}: {
  value: Date;
  onChange: (date: Date) => void;
  yearRange?: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [centerYear, setCenterYear] = React.useState(value.getFullYear());

  // Generate years around the center year
  const years = Array.from({ length: yearRange }, (_, i) => 
    centerYear - Math.floor(yearRange / 2) + i
  );

  const handleYearClick = (selectedYear: number) => {
    const newDate = new Date(value);
    newDate.setFullYear(selectedYear);
    onChange(newDate);
    setIsOpen(false);
  };

  const shiftYears = (increment: number) => {
    setCenterYear(prev => prev + increment);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-between text-left font-normal"
        >
          <span>{value.getFullYear()}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => shiftYears(-yearRange)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {years[0]} - {years[years.length - 1]}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => shiftYears(yearRange)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={
                  value.getFullYear() === year
                    ? "default"
                    : "ghost"
                }
                onClick={() => handleYearClick(year)}
                className="h-8 w-16 p-0"
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}