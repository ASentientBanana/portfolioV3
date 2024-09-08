import { Button } from "@/components/ui/button";
import { GitBranch, Linkedin } from "lucide-react";
import me from "../assets/me.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { httpInstance } from "@/main";
import { DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const stack = [
    "Javascript",
    "TypeScript",
    "Golang",
    "React",
    "ReactNative",
    "NextJS",
    "Flutter",
    "NodeJS",
    "Nest",
    "Unity3D",
  ];

  const handleButtonClick = async () => {
    try {
      const response = await httpInstance.get("resume", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Petar_Kocic_Resume.pdf";
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100% - 4rem)] overflow-auto">
      <Card
        className={`flex flex-col gap-4 relative sm:h-[48rem] bg-customBG sm:shadow-[35px_30px_0px_0px] sm:shadow-primary rounded-none h-full w-full sm:w-[600px]  sm:bg-[#f7f6e4] border-none`}
      >
        <CardHeader className="flex flex-row justify-between">
          <div className="flex gap-4 items-center">
            <img className="h-24 w-24 m-4 rounded-sm" src={me} />
            <div>
              <CardTitle className="text-white sm:text-secondary-foreground">
                Petar Kocić
              </CardTitle>
              <a className="text-customText" href="mailto: mail@petarkocic.net">
                mail@petarkocic.net
              </a>
            </div>
          </div>
          <div className="flex gap-4 text-customText sm:text-muted-foreground">
            <a target="#" href="https://linkedin.com/in/petar-kocic-74a987190">
              <Linkedin />
            </a>
            <a target="#" href="https://github.com/AsentientBanana">
              <GitBranch />
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-white sm:text-muted-foreground text-lg">
            My name is Petar Kocic, and I am a developer with a fervent passion
            for innovation and technology. I find immense joy in the process of
            creating, building, and experimenting with various technologies. My
            journey in the tech realm has been one of continuous growth and
            learning.
          </CardDescription>
          <br />
          <CardDescription className="text-white sm:text-muted-foreground text-lg">
            I started out as a freelancer front end developer, went to game dev
            and unity than back to web/mobile dev. During my career i had the
            opportunity to be in a position of a dev, project manager and CTO.
            Along with programming i also love learning about, tinkering with
            and using linux (and yes i do use Arch Btw).
          </CardDescription>
        </CardContent>
        <CardFooter className="relative sm:absolute sm:bottom-36  h-14 flex items-start flex-col text-white sm:text-muted-foreground">
          <hr className="w-full sm:w-[90%] border-customText/30 sm:border-primary/30 mb-5" />
          <h4 className="font-bold">Stack:</h4>
          <div>
            {stack.map((tech, i) => (
              <span key={tech} className="text-sm">
                {tech}
                {i < stack.length - 1 && ","}{" "}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center w-full pt-4">
            <Button
              className="text-white sm:text-muted-foreground pl-0"
              variant="link"
              onClick={handleButtonClick}
            >
              <span className="pr-3">Resume/CV</span>
              <DownloadIcon />
            </Button>
            <Link className="pr-3" to="/projects">
              Project list
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutPage;
