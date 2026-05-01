"use client";

import { useRef, useState } from "react";
import { Bean, getCountryFlag } from "@/lib/beans";
import type { DiaryEntry, DiaryStatus } from "@/lib/diary";

const STATUS_COLORS: Record<DiaryStatus, string> = {
  loved: "#C4813D",
  tried: "#7A8B6F",
  "want-to-try": "#8B5E3C",
};

const STATUS_LABELS: Record<DiaryStatus, string> = {
  loved: "Loved",
  tried: "Tried",
  "want-to-try": "Want to Try",
};

interface DiaryRankingViewProps {
  rankedBeans: Array<{ bean: Bean; entry: DiaryEntry }>;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export default function DiaryRankingView({ rankedBeans, onReorder }: DiaryRankingViewProps) {
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (rankedBeans.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🏆</div>
        <p className="text-xl font-serif text-espresso mb-2">Nothing to rank yet</p>
        <p className="text-sm text-roast-light/70">Mark beans as tried or loved to rank them here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <p className="text-xs text-roast-light/60 mb-1">Drag rows to reorder your personal ranking.</p>
      {rankedBeans.map(({ bean, entry }, index) => (
        <div
          key={bean.id}
          draggable
          onDragStart={() => { dragIndex.current = index; }}
          onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
          onDrop={() => {
            if (dragIndex.current !== null && dragIndex.current !== index) {
              onReorder(dragIndex.current, index);
            }
            dragIndex.current = null;
            setDragOverIndex(null);
          }}
          onDragEnd={() => { dragIndex.current = null; setDragOverIndex(null); }}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl border bg-white cursor-grab active:cursor-grabbing select-none transition-all ${
            dragOverIndex === index
              ? "border-caramel shadow-md scale-[1.01]"
              : "border-cream-dark hover:border-caramel/50 hover:shadow-sm"
          }`}
        >
          {/* Rank badge */}
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              index === 0
                ? "bg-caramel text-white"
                : index === 1
                ? "bg-roast text-white"
                : index === 2
                ? "bg-caramel-light text-espresso"
                : "bg-cream-dark text-roast-light"
            }`}
          >
            {index + 1}
          </span>

          {/* Drag handle */}
          <svg className="w-4 h-4 text-roast-light/30 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="4" r="1.2" /><circle cx="11" cy="4" r="1.2" />
            <circle cx="5" cy="8" r="1.2" /><circle cx="11" cy="8" r="1.2" />
            <circle cx="5" cy="12" r="1.2" /><circle cx="11" cy="12" r="1.2" />
          </svg>

          {/* Bean info */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-espresso text-sm truncate">
              {bean.variety || bean.farm || bean.producer || "Unknown Bean"}
            </p>
            <p className="text-xs text-roast-light truncate">
              {getCountryFlag(bean.country)} {bean.country}
              {bean.region ? ` · ${bean.region}` : ""}
            </p>
          </div>

          {/* Status badge */}
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0"
            style={{
              background: STATUS_COLORS[entry.status] + "22",
              color: STATUS_COLORS[entry.status],
            }}
          >
            {STATUS_LABELS[entry.status]}
          </span>

          {/* Score */}
          {bean.scores.total > 0 && (
            <span className="text-xs text-roast-light/70 flex-shrink-0 w-10 text-right">
              {bean.scores.total.toFixed(1)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
