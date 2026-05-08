interface StatsCardProps {
  label: string;
  value: number;
  color: "violet" | "blue" | "green" | "red";
  icon: string;
}

const colorMap = {
  violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
  blue:   "from-blue-500/20   to-blue-600/10   border-blue-500/30   text-blue-400",
  green:  "from-green-500/20  to-green-600/10  border-green-500/30  text-green-400",
  red:    "from-red-500/20    to-red-600/10    border-red-500/30    text-red-400",
};

export default function StatsCard({ label, value, color, icon }: StatsCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-xl p-5 flex items-center gap-4`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-white text-3xl font-bold leading-none mt-1">{value}</p>
      </div>
    </div>
  );
}
