import React, { useState, useEffect, createContext, useContext } from 'react';

// Creating a context
const DataContext = createContext();

// Custom hook to use the data context
export const useDataContext = () => {
	return useContext(DataContext);
};

const DataProvider = ({ children }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://assets.alippo.com/catalog/static/data.json',
				);
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		// Calling the fetch function
		fetchData();
	}, []);

	// Providing the data to the context
	const contextValue = {
		data,
		updateData: newData => setData(newData),
	};

	return (
		<DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
	);
};

export default DataProvider;
