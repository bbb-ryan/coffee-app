"use client";

import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Bean, getCountryFlag } from "@/lib/beans";
import type { DiaryEntry, DiaryStatus } from "@/lib/diary";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// [longitude, latitude] for each coffee-producing country in the dataset
const COUNTRY_COORDS: Record<string, [number, number]> = {
  Brazil: [-51.9, -14.2],
  Burundi: [29.9, -3.4],
  China: [104.2, 35.9],
  Colombia: [-74.3, 4.6],
  "Cote d?Ivoire": [-5.5, 7.5],
  "Costa Rica": [-83.8, 9.7],
  Ecuador: [-78.2, -1.8],
  "El Salvador": [-88.9, 13.8],
  Ethiopia: [40.5, 9.1],
  Guatemala: [-90.2, 15.8],
  Haiti: [-72.3, 18.9],
  Honduras: [-86.2, 15.2],
  India: [78.9, 20.6],
  Indonesia: [113.9, -0.8],
  Japan: [138.3, 36.2],
  Kenya: [37.9, -0.02],
  Laos: [102.5, 19.9],
  Malawi: [34.3, -13.3],
  Mauritius: [57.6, -20.3],
  Mexico: [-102.6, 23.6],
  Myanmar: [96.0, 21.9],
  Nicaragua: [-85.2, 12.9],
  Panama: [-80.8, 8.5],
  "Papua New Guinea": [143.9, -6.3],
  Peru: [-75.0, -9.2],
  Philippines: [121.8, 12.9],
  Rwanda: [29.9, -1.9],
  Taiwan: [120.9, 23.7],
  "Tanzania, United Republic Of": [34.9, -6.4],
  Thailand: [100.9, 15.9],
  Uganda: [32.3, 1.4],
  "United States": [-95.7, 37.1],
  "United States (Hawaii)": [-155.6, 19.9],
  "United States (Puerto Rico)": [-66.6, 18.2],
  Vietnam: [108.3, 14.1],
  Zambia: [27.8, -13.1],
};

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

interface CountryGroup {
  country: string;
  coords: [number, number];
  beans: Array<{ bean: Bean; entry: DiaryEntry }>;
  dominantStatus: DiaryStatus;
}

interface DiaryMapViewProps {
  diaryBeans: Array<{ bean: Bean; entry: DiaryEntry }>;
}

export default function DiaryMapView({ diaryBeans }: DiaryMapViewProps) {
  const [tooltip, setTooltip] = useState<CountryGroup | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Group beans by country
  const countryGroups = useMemo<CountryGroup[]>(() => {
    const map = new Map<string, Array<{ bean: Bean; entry: DiaryEntry }>>();
    for (const item of diaryBeans) {
      const country = item.bean.country;
      if (!map.has(country)) map.set(country, []);
      map.get(country)!.push(item);
    }

    return Array.from(map.entries())
      .filter(([country]) => COUNTRY_COORDS[country])
      .map(([country, items]) => {
        // Pick the "most positive" status as dominant
        const statusPriority: Record<DiaryStatus, number> = {
          loved: 3,
          tried: 2,
          "want-to-try": 1,
        };
        const dominant = items.reduce((best, item) =>
          statusPriority[item.entry.status] > statusPriority[best.entry.status]
            ? item
            : best
        ).entry.status;

        return {
          country,
          coords: COUNTRY_COORDS[country],
          beans: items,
          dominantStatus: dominant,
        };
      });
  }, [diaryBeans]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-cream-dark bg-white shadow-sm"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Legend */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-cream-dark shadow-sm">
        {(Object.keys(STATUS_COLORS) as DiaryStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-2 text-xs text-espresso">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: STATUS_COLORS[status] }}
            />
            {STATUS_LABELS[status]}
          </div>
        ))}
      </div>

      {/* Hint */}
      <p className="absolute bottom-3 left-3 z-10 text-xs text-roast-light/70 bg-white/80 rounded-lg px-2 py-1">
        Scroll to zoom · drag to pan · hover pins
      </p>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130, center: [20, 10] }}
        style={{ width: "100%", height: "480px" }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F5EDE3"
                  stroke="#E8D9C8"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#EDE0D0" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {countryGroups.map((group) => (
            <Marker
              key={group.country}
              coordinates={group.coords}
              onMouseEnter={() => setTooltip(group)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Outer glow ring */}
              <circle
                r={group.beans.length > 1 ? 11 : 9}
                fill={STATUS_COLORS[group.dominantStatus]}
                fillOpacity={0.2}
              />
              {/* Pin dot */}
              <circle
                r={group.beans.length > 1 ? 7 : 5.5}
                fill={STATUS_COLORS[group.dominantStatus]}
                stroke="white"
                strokeWidth={1.5}
                style={{ cursor: "pointer" }}
              />
              {/* Count badge for multi-bean countries */}
              {group.beans.length > 1 && (
                <text
                  textAnchor="middle"
                  y={4}
                  style={{
                    fontSize: "8px",
                    fill: "white",
                    fontWeight: "700",
                    pointerEvents: "none",
                  }}
                >
                  {group.beans.length}
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 bg-white border border-cream-dark rounded-xl shadow-md p-3 max-w-[220px] pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y - 16,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getCountryFlag(tooltip.country)}</span>
            <span className="font-medium text-espresso text-sm">{tooltip.country}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {tooltip.beans.map(({ bean, entry }) => (
              <div key={bean.id} className="flex items-start gap-2">
                <span
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: STATUS_COLORS[entry.status] }}
                />
                <div>
                  <p className="text-xs font-medium text-espresso leading-tight">
                    {bean.region || bean.farm || bean.variety || "—"}
                  </p>
                  <p className="text-xs text-roast-light">{STATUS_LABELS[entry.status]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {countryGroups.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-roast-light text-sm">No beans to show on map</p>
        </div>
      )}
    </div>
  );
}
