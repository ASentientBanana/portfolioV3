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
import { DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getResume } from "@/helpers";

const AboutPage = () => {
  const stack = [
    "Javascript",
    "TypeScript",
    "Golang",
    "Python",
    "React",
    "Java",
    "ReactNative",
    "NextJS",
    "Flutter",
    "NodeJS",
    "Nest",
    "PostgreSQL",
  ];

  return (
    <div className="flex justify-center items-center h-full md:h-auto overflow-auto">
      <Card
        className={`flex flex-col gap-4 relative h-[100vh] sm:h-[48rem] bg-customBG sm:shadow-[35px_30px_0px_0px] sm:shadow-primary rounded-none  w-full sm:w-[600px]  sm:bg-[#f7f6e4] border-none`}
      >
        <CardHeader className="flex flex-row justify-between">
          <div className="flex gap-4 items-center">
            <img className="h-24 w-24 m-4 rounded-sm" src={me} />
            {/*<img
              className="h-24 w-24 m-4 rounded-sm"
              src={httpInstance.defaults.baseURL + "download/anime_avatar.png"}
            />*/}
            <div>
              <CardTitle className="text-white sm:text-secondary-foreground">
                Petar Kocić
              </CardTitle>
              <a className="text-[grey]" href="mailto: mail@petarkocic.net">
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
            My name is Petar Kocić, and I'm a software developer. I enjoy
            creating software, experimenting with new technologies, and
            repeatedly discovering that the bug was, in fact, my fault. When I'm
            not building things, I'm usually learning something new so I can
            build even more things that probably didn't need to exist.
          </CardDescription>
          <br />
          <CardDescription className="text-white sm:text-muted-foreground text-lg">
            During my career i had the opportunity to be in a position of a dev,
            team lead and CTO.
          </CardDescription>
          <CardDescription className="text-white sm:text-muted-foreground text-lg">
            Along with programming i also love learning about, tinkering with
            and using linux.
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
              onClick={getResume}
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
