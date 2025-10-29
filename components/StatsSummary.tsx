import { StatsSummaryProps } from '@/types';
import { formatNumber } from '@/lib/utils/format';
import { UsersIcon, UserPlusIcon, HeartIcon, UserMinusIcon, StarIcon } from '@/components/icons';

export default function StatsSummary({ stats }: StatsSummaryProps) {
  const statCards = [
    {
      label: 'Total Followers',
      value: stats.totalFollowers,
      icon: <UsersIcon className="w-6 h-6 text-shark-700" />,
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Total Following',
      value: stats.totalFollowing,
      icon: <UserPlusIcon className="w-6 h-6 text-shark-700" />,
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Mutual',
      value: stats.mutual,
      icon: <HeartIcon className="w-6 h-6 text-shark-700" />,
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Tidak Follow Balik',
      value: stats.tidakFollowBalik,
      icon: <UserMinusIcon className="w-6 h-6 text-shark-700" />,
      bgColor: 'bg-shark-200',
      iconColor: 'text-shark-700',
    },
    {
      label: 'Fans',
      value: stats.fans,
      icon: <StarIcon className="w-6 h-6 text-shark-700" />,
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
