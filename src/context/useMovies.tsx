import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useGenres } from "./useGenres";

interface Movie {
	Title: string;
	Poster: string;
	Genre: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

export function useMovies() {
	const { selectedGenre } = useGenres();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3333/movies')
			.then((response) => response.json())
			.then((data: Movie[]) => {
				console.log('teste');

				setMovies(data);
			}).finally(() => {
				setIsLoading(false);
			})
	}, []);

	const filteredMovies = useMemo(() => {
		return movies.filter((movie) => (
			(movie.Genre.toLocaleLowerCase().includes(selectedGenre.name)) && movie
		))
	}, [selectedGenre, movies]);

	return { filteredMovies, isLoading, selectedGenre };
}
