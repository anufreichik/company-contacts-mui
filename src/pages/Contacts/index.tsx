import React, {ChangeEvent, useState} from "react";
import {useContacts} from "../../hooks/useContacts";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {ContactsTable} from "../ContactsTable";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import ToggleDataViewMode from "../ToggleDataViewMode";
import TextField from '@mui/material/TextField';
import {DATA_VIEW_MODE} from "../../constants";
import {useDataViewMode} from "../../hooks/useDataViewMode";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ContactsContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(4),
}));

const HeadGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));

const filtersDefaultValues = {
    fullname: '',
    gender:'all'
}
const Contacts: React.FC = () => {

    const {data, isLoading, isError} = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(filtersDefaultValues);

    const filterByFullName = ({first, last}:{first:string, last:string}, fullname:string)=>
        first?.toLowerCase().includes(fullname.toLowerCase()) ||
        last?.toLowerCase().includes(fullname.toLowerCase())

    const filterByGender = (gender:string, filterGender:string)=>{
        if(filterGender==='all') return true;
        return gender===filterGender;
    }
    const handleChangeFilter = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [e.target.name]: e.target.value
        }))
    }

    const filteredContacts = data.filter(c => filterByFullName(c.name, filters.fullname))
        .filter(g=>filterByGender(g.gender, filters.gender));

    if (isLoading) return <CircularProgress data-testid={'contacts-loader'}/>;
    if (isError) return <div data-testid={'contacts-error'}>Error...</div>;

    return (
        <ContactsContainer maxWidth="lg">
            <Grid container>
                <HeadGrid item xs={12}>
                    <Box component='div' display='flex' justifyContent='space-between'>
                        <Typography variant="h4" component="h1">Contacts</Typography>
                        <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode}
                        />
                    </Box>
                </HeadGrid>
                <Grid item xs={12}>
                    <Box component='form' display='flex' gap={2} marginBottom={2}
                         noValidate
                         autoComplete="off">
                        <TextField name='fullname'
                                   label="Full Name"
                                   variant="outlined"
                                   size='small'
                                   value={filters.fullname}
                                   onChange={(e) => handleChangeFilter(e)}
                        />

                        <FormControl  size={'small'} sx={{minWidth:'150px'}}>
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

                    </Box>
                </Grid>

                <Grid item xs={12}>
                    {dataViewMode === DATA_VIEW_MODE.TABLE &&
                        <ContactsTable data={filteredContacts}/>
                    }
                    {dataViewMode === DATA_VIEW_MODE.GRID &&
                        <div data-testid={'contacts-grid-container'}>GRID</div>
                    }

                </Grid>
            </Grid>

        </ContactsContainer>);
};

export default Contacts;
