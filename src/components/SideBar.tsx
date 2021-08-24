import { Button } from './Button';
import { useGenres } from '../context/useGenres';

import '../styles/sidebar.scss';


export default function SideBar() {
	const { genres, selectedGenreId, handleSelectedGenre } = useGenres();

	return (
		<nav className="sidebar">
			<span>Watch<p>Me</p></span>

			<div className="buttons-container">
				{genres.map(genre => (
					<Button
						key={genre.title}
						iconName={genre.name}
						title={genre.title}
						selected={genre.id === selectedGenreId}
						onClick={() => handleSelectedGenre(genre)}
					/>
				))}
			</div>
		</nav>
	)
}
