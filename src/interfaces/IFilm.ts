export interface IFilm {
    id: number;
    title: string;
    description: string;
    rate: string;
    metascore: string;
    poster: string;
    releaseDate: string;
    genre: string;
    runtime: string;
    votersCount: string;
    actors: string;
    writer: string;
    userRate: number | undefined;
    rewatchCount: number | undefined;
    userDescription: string | undefined;
    seasonsCount: number | undefined;
    episodesCount: number | undefined;
}