import { StatsSummaryProps } from '@/lib/types';

export default function StatsSummary({ stats }: StatsSummaryProps) {
  // Format numbers with Indonesian locale for better readability
  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID');
  };

  const statCards = [
    {
      label: 'Total Followers',
      value: stats.totalFollowers,
      icon: (
        <svg className="w-6 h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Total Following',
      value: stats.totalFollowing,
      icon: (
        <svg className="w-6 h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Mutual',
      value: stats.mutual,
      icon: (
        <svg className="w-6 h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Tidak Follow Balik',
      value: stats.tidakFollowBalik,
      icon: (
        <svg className="w-6 h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
        </svg>
      ),
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Fans',
      value: stats.fans,
      icon: (
        <svg className="w-6 h-6 text-shark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-shark-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 ${stat.bgColor} rounded-lg sm:rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>

            {/* Label */}
            <p className="text-xs sm:text-xs lg:text-xs font-medium text-shark-600 mb-1 uppercase tracking-wide">
              {stat.label}
            </p>

            {/* Value */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-shark-950 tabular-nums">
              {formatNumber(stat.value)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
