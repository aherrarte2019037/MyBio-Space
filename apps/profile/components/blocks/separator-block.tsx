"use client";

import type { SeparatorBlockData } from "@repo/db";

interface Props {
  data: SeparatorBlockData;
}

import { AutoTextSize } from "auto-text-size";

export function SeparatorBlock({ data }: Props) {
  return (
    <div className="relative size-full bg-stone-800 cursor-pointer rounded-4xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group flex items-center justify-center p-8">
      <div className="flex-row-center text-center w-full font-serif italic text-[#f0d1b2] leading-tight tracking-tighter">
        <AutoTextSize mode="multiline" maxFontSizePx={70} minFontSizePx={25}>
          {data.title}
        </AutoTextSize>
      </div>
    </div>
  );
}
