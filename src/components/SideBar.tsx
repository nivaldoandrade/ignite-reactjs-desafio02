import { useEffect, useState } from 'react';
import { Button } from './Button';
import Content from './Content';


import '../styles/sidebar.scss';

export interface GenresProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}


export default function SideBar() {
	const [selectedGenre, setSelectedGenre] = useState({} as GenresProps);
	const [selectedGenreId, setSelectedGenreId] = useState(1);
	const [genres, setGenres] = useState<GenresProps[]>([]);

	useEffect(() => {
		fetch('http://localhost:3333/genres')
			.then((response) => response.json())
			.then((data: GenresProps[]) => {
				setGenres(data)
				setSelectedGenre(data[0]);
			})
	}, [])

	function handleSelectedGenre(genre: GenresProps) {
		setSelectedGenreId(genre.id);
		setSelectedGenre(genre);
	}

	console.log(selectedGenre);

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
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
			<Content genre={selectedGenre} />
		</div >
	)
}
