import { Project } from "@/types/projects"



export const CreateEmptyProject = (pos: number = -1): Project => {
  return {
    id: -1,
    position: pos,
    description: '',
    github: '',
    image: '',
    live: '',
    name: '',
    stack: '',
  }
}


