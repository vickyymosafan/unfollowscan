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
    },
    {
      label: 'Total Following',
      value: stats.totalFollowing,
    },
    {
      label: 'Mutual',
      value: stats.mutual,
    },
    {
      label: 'Tidak Follow Balik',
      value: stats.tidakFollowBalik,
    },
    {
      label: 'Fans',
      value: stats.fans,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border border-[#DADDE1]"
        >
          <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-[#111315]">
            {formatNumber(stat.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
