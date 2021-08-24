import { MovieCard } from "./MovieCard";

import { useMovies } from "../context/useMovies";
import { useGenres } from "../context/useGenres";

import '../styles/content.scss';


export default function Content() {
	const { filteredMovies: movies, selectedGenre, isLoading } = useMovies();

	if (isLoading) {
		return <div className="containerLoading">Carregando...</div>
	}

	return (
		<div className="container">
			<header>
				<span className="category">
					Categoria:<strong>{selectedGenre.title}</strong>
				</span>
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
