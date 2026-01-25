import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | Hyunu's Blog",
  description: "My journey map",
};

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const history: TimelineItem[] = [
  {
    year: "2024",
    title: "Started New Blog",
    description: "Launched this blog using Next.js 15, Tailwind CSS, and Monorepo architecture."
  },
  {
    year: "2023",
    title: "Senior Engineer",
    description: "Promoted to Senior Frontend Engineer at Company A. Led the major refactoring project."
  },
  {
    year: "2022",
    title: "Joined Company A",
    description: "Started working as a Frontend Engineer focusing on building design systems."
  },
  {
    year: "2019",
    title: "First Job",
    description: "Started career at Company B as a Junior Developer."
  },
   {
    year: "2019",
    title: "Graduation",
    description: "Graduated from University of Technology with a B.S. in Computer Science."
  }
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Journey</h1>
        <p className="text-xl text-gray-600">A timeline of my professional career and milestones.</p>
      </header>

      <div className="relative border-l-2 border-blue-200 ml-3 md:ml-6 space-y-12 pb-8">
        {history.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            {/* Dot */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
              <span className="text-2xl font-bold text-blue-600 font-mono">{item.year}</span>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed max-w-2xl bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
