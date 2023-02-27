import axios from 'axios';
import { Gist } from 'types/Gist';
import { shuffle } from './array';

const gistCache = new Map<string, Gist[]>();

export function getRandomPublicGistPage(): string {
   return `https://api.github.com/gists/public?page=${Math.floor(
      Math.random() * 100,
   )}`;
}

export async function getRandomPublicGists(
   publicgisturl: string,
): Promise<Gist[] | null> {
   const cachedGit = gistCache.get(publicgisturl);
   if (cachedGit) return cachedGit;

   try {
      const { data } = await axios.get<Gist[]>(publicgisturl);
      gistCache.set(publicgisturl, data);
      return data;
   } catch (err) {
      return null;
   }
}

export function getRandomGist(gists: Gist[]): Gist {
   return gists[Math.floor(Math.random() * gists.length)];
}

export function getRandomLanguages(notinclude: string): string[] {
   const languages = getLanguages();
   const randomLanguages: string[] = [];

   while (randomLanguages.length < 3) {
      const lang = languages[Math.floor(Math.random() * languages.length)];
      if (lang.toLowerCase() !== notinclude.toLowerCase()) {
         if (!randomLanguages.includes(lang)) {
            randomLanguages.push(lang);
         }
      }
   }
   return shuffle(randomLanguages);
}

export function getLanguages(): string[] {
   return [
      'javascript',
      'typescript',
      'python',
      'java',
      'c',
      'c++',
      'c#',
      'go',
      'rust',
      'php',
      'ruby',
      'swift',
      'scala',
      'kotlin',
      'elm',
      'erlang',
      'haskell',
      'clojure',
      'perl',
      'lua',
      'elixir',
      'lisp',
      'erlang',
      'fsharp',
      'ocaml',
      'crystal',
      'dart',
      'r',
      'racket',
      'coffeescript',
      'julia',
      'nim',
   ];
}

export async function getBestGist(gists: Gist[]): Promise<Gist | null> {
   const goodGists: Gist[] = [];
   for (const gist of gists) {
      const firstFile = Object.keys(gist.files)[0];
      if (!firstFile) continue;

      const firstFileLanguage = gist.files[firstFile].language;
      if (!firstFileLanguage) continue;

      if (isValidLanguage(firstFileLanguage)) goodGists.push(gist);
   }

   if (goodGists.length === 0) return null;
   const bestGist = getRandomGist(goodGists);
   return bestGist;
}

export async function getRandomFinalGist(): Promise<{
   gist: Gist;
   languages: string[];
} | null> {
   let gists = await getRandomPublicGists(getRandomPublicGistPage());
   if (!gists) return null;
   let bestGist = await getBestGist(gists);

   while (bestGist === null) {
      gists = await getRandomPublicGists(getRandomPublicGistPage());
      if (!gists) return null;
      if (bestGist !== null) bestGist = await getBestGist(gists);
   }

   if (bestGist === null) return null;
   const languages = getRandomLanguages(
      bestGist.files[Object.keys(bestGist.files)[0]].language || '',
   );

   return { gist: bestGist, languages };
}

export function isValidLanguage(language: string): boolean {
   return getLanguages().includes(language.toLowerCase());
}
