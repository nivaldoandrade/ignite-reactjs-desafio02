import Content from './components/Content';
import SideBar from './components/SideBar';
import { GenresProvider } from './context/useGenres';

import './styles/global.scss';

export function App() {
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<GenresProvider>
				<SideBar />
				<Content />
			</GenresProvider >
		</div >
	)
}


