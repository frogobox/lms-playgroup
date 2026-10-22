"use client";

import { useState } from "react";
import { LMS_PRESETS } from "@/data/lms-data";
import { IconCheckCircle, IconGraduationCap, IconShield, IconAward, IconUsers } from "./icons";

export function PresetSelector() {
  const [activePresetId, setActivePresetId] = useState<string>("campus");
  const activePreset = LMS_PRESETS.find((p) => p.id === activePresetId) || LMS_PRESETS[0]!;

  const getPresetIcon = (id: string) => {
    switch (id) {
      case "campus":
        return <IconGraduationCap className="h-4 w-4" />;
      case "bootcamp":
        return <IconAward className="h-4 w-4" />;
      case "corporate":
        return <IconShield className="h-4 w-4" />;
      case "creator":
      default:
        return <IconUsers className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
      {/* Preset Tabs Navigation */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
        {LMS_PRESETS.map((preset) => {
          const isActive = preset.id === activePresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActivePresetId(preset.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {getPresetIcon(preset.id)}
              <span>{preset.title}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {preset.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Preset Details Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {activePreset.subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {activePreset.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {activePreset.description}
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Fitur Utama yang Dikonfigurasi:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activePreset.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground">
                  <IconCheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Persona Card */}
        <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Target Pengguna & Stakeholder
          </span>
          <p className="text-sm font-medium text-foreground">
            {activePreset.targetUsers}
          </p>
          <div className="pt-3 border-t border-border/60">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Status Kustomisasi</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                100% Siap Pakai
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
