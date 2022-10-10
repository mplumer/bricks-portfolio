import React from 'react';
import Link from 'next/link';

interface ProjectListItemProps {
  title: string;
  href: string;
  content: string;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  title,
  href,
  content,
}) => {
  return (
    <Link href={`/projects/project/${href}`}>
      <a className="flex-1 block p-6 py-4 -m-6 text-gray-900 transition-colors duration-300 rounded group hover:bg-gray-50">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-lg leading-6">{content}</p>
        <div className="flex items-center mt-4 font-semibold text-cyan-500 group-hover:text-cyan-600">
          <div className="mr-2 transition-all duration-300 group-hover:mr-4">
            Read More
          </div>
          &raquo;
        </div>
      </a>
    </Link>
  );
};

export default ProjectListItem;
