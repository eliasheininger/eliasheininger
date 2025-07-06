import React from "react";

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
};

export default function ProjectSection({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  return (
    <section>
      <h2 className="text-[1.5rem] mb-1 mt-8">{title}</h2>
      <div className="mt-8">
        {projects.map((project, idx) => (
          <div className="mb-12" key={project.name + idx}>
            <h3 className="text-[1.2rem] mb-2">{project.name}</h3>
            <p className="text-[1rem] text-white/90 font-light mb-6 max-w-xl">
              {project.description}
            </p>
            <div className="mb-4">
              <span className="text-white">tech stack</span>
              <div className="mt-1 text-white/90 text-[1rem] flex flex-wrap gap-x-2 gap-y-1">
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={tech + i}>
                    <span>{tech}</span>
                    {i < project.technologies.length - 1 && <span>•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {project.url && (
              <a
                href={project.url}
                className="text-[1rem] text-white underline underline-offset-4 hover:text-gray-300 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                visit project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
