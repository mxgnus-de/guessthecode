export interface FormattedHighscores {
   id: string;
   score: number;
   user: {
      id: string;
      name: string;
      image: string;
   };
}
