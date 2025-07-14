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
    <Link href={href} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
} 