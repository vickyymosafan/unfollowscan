'use client';

import { KeyboardEvent, useRef, useEffect } from 'react';
import { ResultTabsProps } from '@/lib/types';

type TabType = 'tidak-follow-balik' | 'fans' | 'mutual';

export default function ResultTabs({ activeTab, onTabChange, counts }: ResultTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'tidak-follow-balik', label: 'Tidak follow balik', count: counts.tidakFollowBalik },
    { id: 'fans', label: 'Fans yang tidak Kamu ikuti', count: counts.fans },
    { id: 'mutual', label: 'Mutual', count: counts.mutual },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

  // Format number with Indonesian locale
  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    // Focus the new tab
    tabRefs.current[newIndex]?.focus();
    // Activate the new tab
    onTabChange(tabs[newIndex].id);
  };

  // Focus active tab on mount or when activeTab changes
  useEffect(() => {
    if (currentIndex >= 0 && tabRefs.current[currentIndex]) {
      tabRefs.current[currentIndex]?.focus();
    }
  }, [activeTab, currentIndex]);

  return (
    <div className="bg-white rounded-2xl p-2 border border-shark-300 shadow-sm" role="tablist" aria-label="Kategori hasil">
      <div className="flex flex-col sm:flex-row gap-2">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex-1 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-shark-700 focus:ring-offset-2 ${
                isActive
                  ? 'bg-shark-950 text-shark-50 shadow-lg sm:scale-105'
                  : 'bg-transparent text-shark-700 hover:bg-shark-100 hover:text-shark-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm lg:text-base">{tab.label}</span>
                <span className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isActive
                    ? 'bg-shark-700 text-shark-50'
                    : 'bg-shark-200 text-shark-800'
                }`}>
                  {formatNumber(tab.count)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
