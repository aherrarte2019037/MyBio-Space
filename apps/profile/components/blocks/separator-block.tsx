"use client";

import type { SeparatorBlockData } from "@repo/db";

interface Props {
  data: SeparatorBlockData;
}

import { AutoTextSize } from "auto-text-size";

export function SeparatorBlock({ data }: Props) {
  return (
    <div className="relative size-full bg-[#FAFAF8] cursor-pointer rounded-4xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group flex items-center justify-center p-8 border border-stone-200">
      <div className="flex-col-center justify-between w-full h-full">
        <div className="w-full h-px bg-stone-200" />

        <div className="flex-col-center w-full text-center">
          <div className="flex-row-center w-full">
            <AutoTextSize
              className="text-stone-800 font-serif leading-tight tracking-tighter"
              mode="multiline"
              maxFontSizePx={60}
              minFontSizePx={25}
            >
              {data.title}
            </AutoTextSize>
          </div>

          <div className="flex-row-center w-full">
            <AutoTextSize
              className="text-stone-800 font-serif leading-tight tracking-tighter"
              mode="multiline"
              maxFontSizePx={26}
              minFontSizePx={16}
            >
              sdd a dsa d sa dsa d asdsa asd dsasd as d asa sd
            </AutoTextSize>
          </div>
        </div>

        <div className="w-full h-px bg-stone-200" />
      </div>
    </div>
  );
}
