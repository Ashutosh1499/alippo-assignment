import React, { useState } from 'react';
import { useDataContext } from './DataProvider';

import '../Styles/dialogBox.css';

export default function EditBox({ setOpenEditBox, rowNumber, animationCSS }) {
	const { data, updateData } = useDataContext();

	//creating multiple states to handle input fields
	const [nameValue, setNameValue] = useState(
		data[rowNumber].name !== null ? data[rowNumber].name : '',
	);
	const [ageValue, setAgeValue] = useState(
		data[rowNumber].age !== null ? data[rowNumber].age : '',
	);
	const [cityValue, setCityValue] = useState(
		data[rowNumber].city !== null ? data[rowNumber].city : '',
	);
	const [pinCodeValue, setPincodeValue] = useState(
		data[rowNumber].pinCode !== null ? data[rowNumber].pinCode : '',
	);
	//storing old data for comparing the changes
	const oldData = {
		name: data[rowNumber].name,
		age: data[rowNumber].age,
		city: data[rowNumber].city,
		pinCode: data[rowNumber].pinCode,
	};
	//checkDataChange checks if the data is changed, if no changes found, it do not trigger any state update
	const checkDataChange = newData => {
		// Get the keys of both objects
		const keys1 = Object.keys(oldData);
		const keys2 = Object.keys(newData);

		// Check if the number of keys is the same
		if (keys1.length !== keys2.length) {
			return false;
		}

		// Iterate through the keys and compare values
		for (let key of keys1) {
			// Check if the key exists in both objects
			if (!newData.hasOwnProperty(key)) {
				return false;
			}

			// Compare the values for the current key
			if (oldData[key] !== newData[key]) {
				return false;
			}
		}

		// If all key-value pairs are the same, return true
		return true;
	};
	//the saveData funtion handles the submit of the form or click to the submit button
	const saveData = e => {
		e.preventDefault();
		//creating new data from the input form submitted
		const newData = {
			name: nameValue,
			age: ageValue,
			city: cityValue,
			pinCode: pinCodeValue,
		};
		//comparing if there is any change in data
		if (!checkDataChange(newData)) {
			data[rowNumber] = newData;
			updateData(data);
		}
		setOpenEditBox(false);
	};
	return (
		<div className='dialogBoxWrapper'>
			<div className={`dialogBox ${animationCSS}`}>
				<form onSubmit={saveData}>
					<label htmlFor='name'>Name</label>
					<input
						name='name'
						value={nameValue}
						onChange={e => setNameValue(e.target.value)}
					/>

					<label htmlFor='age'>Age</label>
					<input
						name='age'
						value={ageValue}
						onChange={e => setAgeValue(e.target.value)}
					/>

					<label htmlFor='city'>City</label>
					<input
						name='city'
						value={cityValue}
						onChange={e => setCityValue(e.target.value)}
					/>

					<label htmlFor='pinCode'>Pin Code</label>
					<input
						name='pinCode'
						value={pinCodeValue}
						onChange={e => setPincodeValue(e.target.value)}
					/>
					<button type='submit'></button>
				</form>
				<div className='dialogBoxButtons'>
					<button onClick={() => setOpenEditBox(false)}>Cancel</button>
					<button onClick={saveData}>Save</button>
				</div>
			</div>
		</div>
	);
}
