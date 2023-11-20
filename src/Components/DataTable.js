import React, { useState } from 'react';

import { useDataContext } from './DataProvider';
import EditBox from './EditBox';
import DeleteBox from './DeleteBox';

import editIcon from '../Assets/edit-round-line-icon.png';
import deleteIcon from '../Assets/close-line-icon.png';

import '../Styles/table.css';

export default function DataTable() {
	//using the data from the context API
	const { data } = useDataContext();

	//creating some states for triggering Edit and Delete dialog box
	const [openEditBox, setOpenEditBox] = useState(false);
	const [openDeleteBox, setOpenDeleteBox] = useState(false);
	const [animationCSS, setAnimationCSS] = useState('');

	//state to manage current row
	const [row, setRow] = useState(-1);

	//handleClick function takes in 2 parameters, if box = 0, it indicates the trigger for edit dialog box
	//and box = 1 indicates trigger for delete dialog box
	const handleClick = (box, index) => {
		box === 0 ? setOpenEditBox(true) : setOpenDeleteBox(true);
		setAnimationCSS('animate-dialogBox');
		setRow(index);
	};
	return (
		<>
			{/* General navbar, at this point it does not hold any links. */}
			<div className='navbar'>
				<span>Home</span>
				<span>Alippo Assignment</span>
			</div>
			<div className='tableComponent'>
				<table>
					<thead>
						<tr>
							<th>S.No</th>
							<th>Name</th>
							<th>Age</th>
							<th>City</th>
							<th>Pin Code</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{/* Mapping all the data to populate it on the screen */}
						{data.map((item, index) => (
							<tr
								key={index}
								className='fade-in-row'
								style={{ animationDelay: `${index * 50}ms` }}>
								<td>{index + 1}</td>
								<td>{item.name !== null ? item.name : ''}</td>
								<td>{item.age !== null ? item.age : ''}</td>
								<td>{item.city !== null ? item.city : ''}</td>
								<td>{item.pinCode !== null ? item.pinCode : ''}</td>
								<td>
									<button
										onClick={() => {
											handleClick(0, index);
										}}>
										<img src={editIcon} alt=''></img>
									</button>
									<button
										onClick={() => {
											handleClick(1, index);
										}}>
										<img src={deleteIcon} alt=''></img>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* The EditBox appears when the edit button is clicked */}
			{openEditBox ? (
				<EditBox
					setOpenEditBox={setOpenEditBox}
					animationCSS={animationCSS}
					rowNumber={row}></EditBox>
			) : (
				''
			)}
			{/* Similar to EditBox, DeleteBox appears when the edit button is clicked */}
			{openDeleteBox ? (
				<DeleteBox
					setOpenDeleteBox={setOpenDeleteBox}
					animationCSS={animationCSS}
					rowNumber={row}></DeleteBox>
			) : (
				''
			)}
		</>
	);
}
