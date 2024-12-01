// ClientExperience.tsx
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { TExperiences } from "@/types/experiencesTypes";

interface TExperiencesProps {
  experiences: TExperiences[];
}

const ClientExperience: React.FC<TExperiencesProps> = ({ experiences }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {experiences.map((exp) => (
        <div
          key={exp._id}
          className="bg-default-50 rounded-lg p-6 flex flex-col items-start justify-start border border-default-200 max-w-3xl"
        >
          <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
          <p className="text-default-600 font-medium">{exp.company}</p>
          <p className="text-sm text-default-500 mb-4">{exp.location}</p>
          <p className="text-sm text-default-500 mb-4">
            {format(new Date(exp.startDate), "dd MMM yyyy")} -{" "}
            {exp.endDate
              ? format(new Date(exp.endDate), "dd MMM yyyy")
              : "Present"}
          </p>
          <p className="text-default-700 mb-4 text-start">{exp.description}</p>
          <div className="flex flex-wrap items-start gap-3">
            {exp.technologies.map((tech) => (
              <div
                key={tech._id}
                className="flex items-center gap-2 border border-default-200 rounded px-3 py-1"
              >
                <Image
                  alt={tech.name}
                  className="rounded-full size-6 bg-cover object-cover"
                  height={500}
                  src={tech.icon}
                  width={500}
                />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientExperience;
