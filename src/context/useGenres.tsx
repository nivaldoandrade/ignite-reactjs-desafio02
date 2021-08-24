import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from '../services/api';


export interface GenresProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface GenresProviderProps {
	children: React.ReactNode;
}

interface GenresContextType {
	genres: GenresProps[];
	selectedGenre: GenresProps;
	selectedGenreId: number | undefined;
	handleSelectedGenre: (genre: GenresProps) => void;
}

const GenresContext = createContext<GenresContextType>({} as GenresContextType);

export function GenresProvider({ children }: GenresProviderProps) {
	const [selectedGenre, setSelectedGenre] = useState({} as GenresProps);
	const [selectedGenreId, setSelectedGenreId] = useState<number>(1);
	const [genres, setGenres] = useState<GenresProps[]>([]);

	useEffect(() => {
		fetch('http://localhost:3333/genres')
			.then((response) => response.json())
			.then((data: GenresProps[]) => {
				setGenres(data)
				setSelectedGenre(data[0]);
			})
	}, [])

	const handleSelectedGenre = useCallback((genre: GenresProps) => {
		setSelectedGenreId(genre.id);
		setSelectedGenre(genre);
	}, [selectedGenre, selectedGenreId]);

	return (
		<GenresContext.Provider
			value={{
				genres,
				selectedGenreId,
				selectedGenre,
				handleSelectedGenre,
			}}
		>
			{children}
		</GenresContext.Provider>
	)
}

export function useGenres() {
	return useContext(GenresContext);
}