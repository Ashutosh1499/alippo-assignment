import React from 'react';
import { useDataContext } from './DataProvider';

export default function DeleteBox({
	setOpenDeleteBox,
	rowNumber,
	animationCSS,
}) {
	const { data, updateData } = useDataContext();

	//deleteRow function handles the confirm button click.
	const deleteRow = () => {
		data.splice(rowNumber, 1);
		updateData(data);
		setOpenDeleteBox(false);
	};
	return (
		<div className='dialogBoxWrapper'>
			<div className={`dialogBox ${animationCSS}`}>
				<span>
					Do you want to Delete the row - {rowNumber + 1} with Name:{' '}
					{data[rowNumber].name !== null ? data[rowNumber].name : ''}
				</span>
				<div className='dialogBoxButtons'>
					<button onClick={() => setOpenDeleteBox(false)}>Cancel</button>
					<button onClick={deleteRow}>Confirm</button>
				</div>
			</div>
		</div>
	);
}
