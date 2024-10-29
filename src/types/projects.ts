export type Project = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  stack: string;
  description: string;
  live: string;
  github: string;
  image: string;
  position: number;
};
