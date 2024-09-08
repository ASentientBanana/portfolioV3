import { httpInstance } from "@/main";
import { Project } from "@/types/projects";

// <Card className="w-80  bg-customSecondary border-none text-customText">
const ProjectCard = ({ project }: { project: Project }) => {
  const stack = project.stack.split(",");
  return (
    <div className="relative">
      <div className="hover:shadow-[#f7f6e4] hover:scale-110 md:hover:scale-100  md:hover:shadow-[35px_30px_0px_0px] bg-customBG transition duration-300 md:hover:-translate-y-8 md:hover:-translate-x-8  relative p-4 flex flex-col items-center sm:jsutify-start sm:flex-row gap-2  md:h-48 w-full border border-customPrimary ">
        {/* left */}
        <div className="flex flex-col h-full  w-[50%] sm:w-[30%]">
          {project.image && (
            <a
              className="aspect-video h-[100%]"
              href={project.live ?? project.github ?? ""}
            >
              <img
                alt="project image"
                className="h-full w-full"
                src={`${httpInstance.defaults.baseURL}/${project.image}`}
              />
            </a>
          )}
        </div>
        {/* right */}
        <div className="relative h-full w-full flex flex-col pl-4 pb-2 pt-4 justify-between ">
          <p className=" max-h-[80%] text-wrap text-elipsies ">
            {project.description}
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
              {project.live && (
                <a className="hover:underline" href={project.live}>
                  Live
                </a>
              )}
              {project.github && (
                <a className="hover:underline" href={project.github}>
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
