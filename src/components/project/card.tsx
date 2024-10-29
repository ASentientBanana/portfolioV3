import { cn } from "@/lib/utils";
import { httpInstance } from "@/main";
import { Project } from "@/types/projects";

// <Card className="w-80  bg-customSecondary border-none text-customText">
const ProjectCard = ({ project }: { project: Project }) => {
  const stack = project?.stack.split(",");
  return (
    <div className="relative hover:border md:hover:border-none hover:border-customPrimary">
      <div className="flex *:hover:h-full md:hidden ">
        <img
          alt="project image"
          className="h-full w-full"
          src={`${httpInstance.defaults.baseURL}${project?.image}`}
        />
        <div className="absolute ease-in-out transition-all *:hidden *:hover:flex duration-700 w-full min-h-[2rem] h-[20%] bg-customBG/65 hover:bg-customBG z-10 bottom-0 border-t-1  border-customPrimary/40 flex flex-col p-4">
          {project?.name}
          <p className="mt-2">{project?.description}</p>
          <div className="absolute bottom-4 left-4">
            {stack.map((item, index) => (
              <span
                className={cn(index !== stack.length - 1 ? "mr-2" : "")}
                key={index}
              >
                {item}
                {index !== stack.length - 1 && ","}
              </span>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-3">
            {project?.live && (
              <a className="hover:underline" href={project?.live}>
                Live
              </a>
            )}
            {project?.github && (
              <a className="hover:underline" href={project?.github}>
                Github
              </a>
            )}
          </div>
        </div>
      </div>
      {/*  larger card */}
      <div className="hidden md:flex  hover:shadow-[#f7f6e4] hover:scale-110 md:hover:scale-100  md:hover:shadow-[35px_30px_0px_0px] bg-customBG transition duration-300 md:hover:-translate-y-8 md:hover:-translate-x-8  relative p-4 flex-col items-center sm:jsutify-start sm:flex-row gap-2  md:h-48 w-full border border-customPrimary ">
        {/* left */}
        <div className="flex flex-col h-full w-[50%] sm:w-[30%]">
          {project?.image && (
            <a
              className="aspect-video h-[100%] flex items-center "
              href={project?.live ?? project?.github ?? ""}
            >
              <img
                alt="project"
                className="object-fit bg-red-100"
                src={`${httpInstance.defaults.baseURL}${project?.image}`}
              />
            </a>
          )}
        </div>
        {/* right */}
        <div className="relative h-full w-full flex flex-col pl-4 pb-2 pt-4 justify-between ">
          <p className=" max-h-[80%] text-wrap text-elipsies ">
            {project?.description}
          </p>
          <div className="flex justify-between flex-col sm:flex-row gap-5 sm:gap-0">
            <div className=" pt-4 sm:pt-2">
              <span className="pr-2">Stack:</span>
              {stack.map((item, index) => (
                <span key={index}>
                  {item}
                  {index === stack.length - 1 ? "" : ","}
                </span>
              ))}
            </div>
            <div className="pr-4 flex flex-row gap-4 sm:pt-2">
              {project?.live && (
                <a className="hover:underline" href={project?.live}>
                  Live
                </a>
              )}
              {project?.github && (
                <a className="hover:underline" href={project?.github}>
                  Github
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
