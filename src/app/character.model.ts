export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}
export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterDetails extends Character {
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
  created: string;
}
