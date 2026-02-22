export interface Resume {
  id: number;
  name: string;
  content: {
    title: string;
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    skills: {
      languages: string[];
      frontend: string[];
      backend: string[];
      databases: string[];
      devtools: string[];
    };
    projects: string[];
    achievements: string[];
  };
}