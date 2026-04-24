"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Bean } from "@/lib/beans";
import { useDiary } from "@/components/DiaryProvider";
import { useLocalStorage } from "@/lib/useLocalStorage";
import BeanCard from "./BeanCard";
import DiaryRankingView from "./DiaryRankingView";
import type { DiaryStatus } from "@/lib/diary";

const DiaryMapView = dynamic(() => import("./DiaryMapView"), { ssr: false });

type ViewMode = "cards" | "map" | "ranking";

const STATUS_FILTERS: {
  value: DiaryStatus | "all";
  label: string;
  icon: React.ReactNode;
  activeClass: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: null,
    activeClass: "bg-espresso text-cream border-espresso",
  },
  {
    value: "loved",
    label: "Loved",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    activeClass: "bg-rose-500 text-white border-rose-500",
  },
  {
    value: "tried",
    label: "Tried",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    activeClass: "bg-sage text-white border-sage",
  },
  {
    value: "want-to-try",
    label: "Want to Try",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    activeClass: "bg-honey text-espresso border-honey",
  },
];

export default function DiaryView({ beans }: { beans: Bean[] }) {
  const { entries, hydrated } = useDiary();
  const [statusFilter, setStatusFilter] = useState<DiaryStatus | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [storedRankings, setStoredRankings] = useLocalStorage<number[]>("coffee-diary-rankings", []);

  const beanMap = useMemo(() => {
    const map = new Map<number, Bean>();
    beans.forEach((b) => map.set(b.id, b));
    return map;
  }, [beans]);

  const diaryBeans = useMemo(() => {
    return Object.values(entries)
      .filter((entry) => statusFilter === "all" || entry.status === statusFilter)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((entry) => ({
        entry,
        bean: beanMap.get(entry.beanId),
      }))
      .filter((item): item is { entry: typeof item.entry; bean: Bean } => item.bean !== undefined);
  }, [entries, statusFilter, beanMap]);

  // Rankings: only tried/loved beans, persisted order, auto-append new ones
  const rankedBeans = useMemo(() => {
    const eligibleIds = new Set(
      Object.values(entries)
        .filter((e) => e.status === "tried" || e.status === "loved")
        .map((e) => e.beanId)
    );
    const ordered = storedRankings.filter((id) => eligibleIds.has(id));
    for (const id of eligibleIds) {
      if (!ordered.includes(id)) ordered.push(id);
    }
    return ordered
      .map((id) => ({ bean: beanMap.get(id), entry: entries[id] }))
      .filter((item): item is { bean: Bean; entry: (typeof entries)[number] } =>
        item.bean !== undefined && item.entry !== undefined
      );
  }, [entries, storedRankings, beanMap]);

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const ids = rankedBeans.map((item) => item.bean.id);
    const [moved] = ids.splice(fromIndex, 1);
    ids.splice(toIndex, 0, moved);
    setStoredRankings(ids);
  };

  const entryCount = Object.keys(entries).length;

  if (!hydrated) {
    return (
      <div>
        <div className="skeleton h-10 w-64 mb-4" />
        <div className="skeleton h-5 w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-52 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-serif text-3xl font-bold text-espresso">My Coffee Diary</h1>
        <div className="flex-1 h-px bg-cream-dark" />
        <p className="text-sm text-roast-light">
          {entryCount} bean{entryCount !== 1 ? "s" : ""}
        </p>
      </div>
      <p className="text-roast-light mb-8">
        Your personal coffee tasting journal.
      </p>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        {/* Left: status filter pills + ranking pill */}
        <div className="flex gap-2 flex-wrap items-center">
          {STATUS_FILTERS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setStatusFilter(opt.value); setViewMode("cards"); }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                statusFilter === opt.value && viewMode !== "ranking"
                  ? opt.activeClass + " shadow-sm"
                  : "bg-white text-espresso-light border-cream-dark hover:border-caramel hover:text-espresso"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
          {rankedBeans.length > 0 && (
            <button
              onClick={() => setViewMode(viewMode === "ranking" ? "cards" : "ranking")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                viewMode === "ranking"
                  ? "bg-caramel text-espresso border-caramel shadow-sm"
                  : "bg-white text-espresso-light border-cream-dark hover:border-caramel hover:text-espresso"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10h2V6H2v4zM6 10h2V3H6v7zm4 0h2V7h-2v3z" fill="currentColor"/>
              </svg>
              Ranking
            </button>
          )}
        </div>

        {/* Right: Cards / Map segmented toggle */}
        <div className="flex items-center gap-1 bg-cream-dark rounded-lg p-1">
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "cards"
                ? "bg-white text-espresso shadow-sm"
                : "text-roast-light hover:text-espresso"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="0.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Cards
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "map"
                ? "bg-white text-espresso shadow-sm"
                : "text-roast-light hover:text-espresso"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 7h12M7 1c-1.5 2-2 3.8-2 6s.5 4 2 6M7 1c1.5 2 2 3.8 2 6s-.5 4-2 6" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Map
          </button>
        </div>
      </div>

      {/* Results */}
      {viewMode === "map" ? (
        <DiaryMapView diaryBeans={diaryBeans} />
      ) : viewMode === "ranking" ? (
        <DiaryRankingView rankedBeans={rankedBeans} onReorder={handleReorder} />
      ) : diaryBeans.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-5xl mb-4">📓</div>
          <p className="text-xl font-serif text-espresso mb-2">
            {entryCount === 0 ? "Your diary is empty" : "No beans match this filter"}
          </p>
          <p className="text-sm text-roast-light/70 max-w-md mx-auto mb-6">
            {entryCount === 0
              ? "Browse beans and mark them as tried, loved, or want to try."
              : "Try selecting a different status filter."}
          </p>
          {entryCount === 0 && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream rounded-full hover:bg-espresso-light transition-colors text-sm font-medium"
            >
              Browse Beans
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {diaryBeans.map(({ bean, entry }, i) => (
            <div key={entry.beanId} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
              <BeanCard bean={bean} />
              {entry.notes && (
                <p className="mt-1.5 px-2 text-xs text-roast-light/70 italic line-clamp-2">
                  &ldquo;{entry.notes}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
