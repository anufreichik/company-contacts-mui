import React, {useCallback, useState} from "react";
import {useContacts} from "../../hooks/useContacts";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {ContactsTable} from "../ContactsTable";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import ToggleDataViewMode from "../ToggleDataViewMode";
import {DATA_VIEW_MODE} from "../../constants";
import {useDataViewMode} from "../../hooks/useDataViewMode";
import {ContactsFilters} from "./ContactsFilters";
import ContactsGrid from "../ContactsGrid";

const ContactsContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(4),
}));

const HeadGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));

const filtersDefaultValues = {
    fullname: '',
    gender: 'all',
    nationality: 'all'
}
const Contacts: React.FC = () => {

    const {data, isLoading, isError} = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(filtersDefaultValues);

    const filterByFullName = ({first, last}: { first: string, last: string }, fullname: string) =>
        first?.toLowerCase().includes(fullname.toLowerCase()) ||
        last?.toLowerCase().includes(fullname.toLowerCase())

    const filterByGender = (gender: string, filterGender: string) => {
        if (filterGender === 'all') return true;
        return gender === filterGender;
    }
    const filterByNationality = (nationality: string, filterNationality: string) => {
        if (filterNationality === 'all') return true;
        return nationality === filterNationality;
    }
    const updateFilter = useCallback((name: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }))
    }, []);

    const clearFilters = useCallback(() => {
        setFilters(filtersDefaultValues)
    }, []);

    const filteredContacts = data
        .filter(c => filterByFullName(c.name, filters.fullname))
        .filter(g => filterByGender(g.gender, filters.gender))
        .filter(n => filterByNationality(n.nat, filters.nationality));

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
                    <ContactsFilters filters={filters} updateFilter={updateFilter} clearFilters={clearFilters}/>
                </Grid>

                <Grid item xs={12}>
                    {dataViewMode === DATA_VIEW_MODE.TABLE &&
                        <ContactsTable data={filteredContacts}/>
                    }
                    {dataViewMode === DATA_VIEW_MODE.GRID &&
                        // <div data-testid={'contacts-grid-container'}>GRID</div>
                        <ContactsGrid data={filteredContacts}/>
                    }

                </Grid>
            </Grid>

        </ContactsContainer>);
};

export default Contacts;
