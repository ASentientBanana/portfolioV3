export type Auth = {
  data: string | null;
  login: (token: string) => void;
  logout: () => void;
};
