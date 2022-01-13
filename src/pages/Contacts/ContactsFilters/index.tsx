import React, {ChangeEvent} from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {NATIONALITIES_HUMAN_NAME} from "../../../constants/nationalities";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
    filters: {
        fullname: string,
        gender: string,
        nationality: string
    };
    updateFilter: (name: string, value: string) => void;
    clearFilters: () => void;
}

export const ContactsFilters: React.FC<IProps> = ({filters, updateFilter, clearFilters}) => {
    const handleChangeFilter = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
        updateFilter(e.target.name, e.target.value);
    }

    return (
        <Box component='form' display='flex' gap={2} marginBottom={2}
             justifyContent={'space-between'}
             noValidate
             autoComplete="off">
            <Box component='div' display='flex' gap={2} >
                <TextField name='fullname'
                           label="Search by fullname"
                           variant="outlined"
                           size='small'
                           value={filters.fullname}
                           onChange={(e) => handleChangeFilter(e)}
                />

                <FormControl size={'small'} sx={{minWidth: '150px'}}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select name='gender'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.gender}
                            label="Gender"
                            onChange={handleChangeFilter}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>


                <FormControl size={'small'} sx={{minWidth: '160px'}}>
                    <InputLabel id="nat-label">Nationality</InputLabel>
                    <Select name='nationality'
                            labelId="nat-label"
                            id="nat"
                            value={filters.nationality}
                            label="Nationality"
                            onChange={handleChangeFilter}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {
                            Object.entries(NATIONALITIES_HUMAN_NAME).map(([value, label]) => (
                                <MenuItem value={value} key={value}>{label}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Box>
            <Box component={'div'}>
                <Button variant="text"
                        onClick={clearFilters}
                        startIcon={<ClearIcon color={'disabled'} fontSize={'small'}/>}>
                    Clear
                </Button>
            </Box>
        </Box>
    )
}
