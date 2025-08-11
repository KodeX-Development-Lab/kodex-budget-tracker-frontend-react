"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export function MonthPicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [year, setYear] = React.useState(value.getFullYear());

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(year, monthIndex, 1);
    onChange(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (increment: number) => {
    setYear(prev => prev + increment);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          {format(value, "MMM yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleYearChange(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{year}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleYearChange(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={
                  value.getFullYear() === year && value.getMonth() === index
                    ? "default"
                    : "ghost"
                }
                onClick={() => handleMonthClick(index)}
                className="h-8 w-16 p-0"
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}