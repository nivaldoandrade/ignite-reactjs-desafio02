import { useEffect, useState } from "react";

import { GenresProps } from './SideBar';
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

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

interface ContentProps {
	genre: GenresProps
}

export default function Content({ genre }: ContentProps) {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		fetch('http://localhost:3333/movies')
			.then((response) => response.json())
			.then((data: Movie[]) => {
				const filteredMovies = data.filter((movie) => (
					(movie.Genre.toLocaleLowerCase().includes(genre.name)) && movie
				))

				setMovies(filteredMovies);
			})
	}, [genre]);


	return (
		<div className="container">
			<header>
				<span className="category">Caterogria: <strong>{genre.title}</strong></span>
			</header>

			<main>
				<div className="movies-list">
					{movies.map(movie => (
						<MovieCard
							key={movie.Title}
							title={movie.Title}
							poster={movie.Poster}
							rating={movie.Ratings[0].Value}
							runtime={movie.Runtime}
						/>
					))}
				</div>
			</main>
		</div>
	)
}
