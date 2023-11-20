import './App.css';
import DataProvider from './Components/DataProvider';
import DataTable from './Components/DataTable';

function App() {
	return (
		<>
			<DataProvider>
				<DataTable />
			</DataProvider>
		</>
	);
}

export default App;
