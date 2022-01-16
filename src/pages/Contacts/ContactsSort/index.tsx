import React, {useCallback} from 'react';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import IconButton from '@mui/material/IconButton';

interface ContactsSortProps{
    sortField:string;
    updateSort: (sortField:string)=>void;
}
const ContactsSort:React.FC<ContactsSortProps>=({sortField, updateSort}) =>{
    const handleSortClick = useCallback(() => {
        updateSort(sortField);
    },[updateSort]);

    return (
        <IconButton color="primary" aria-label="Sort"
                    onClick={handleSortClick} >
        <SortByAlphaIcon/>
        </IconButton>
    );
}

export default ContactsSort;
