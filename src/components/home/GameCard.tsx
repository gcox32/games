import Link from "next/link";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function GameCard({ id, title, description, icon, href }: GameCardProps) {
  return (
    <Link href={href} className="group block" id={id}>
      <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 border border-gray-200 dark:border-gray-700 rounded-xl transition-all hover:-translate-y-1 duration-300 transform">
        <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 dark:group-hover:bg-blue-800 group-hover:bg-blue-200 mx-auto mb-4 rounded-full w-16 h-16 text-blue-600 dark:text-blue-400 transition-colors">
          {icon}
        </div>
        <h3 className="mb-2 font-semibold text-gray-900 dark:group-hover:text-blue-400 dark:text-white group-hover:text-blue-600 text-xl text-center transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
} 