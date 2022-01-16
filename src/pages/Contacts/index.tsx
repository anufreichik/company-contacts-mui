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
import {IUser} from "../../types/types";
import AppPagination from "../Pagination";

const ITEMS_PER_PAGE = 2;

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
const sortDefaultValues = {
    fieldName: 'fullname',
    direction: 'ASC'
}
const Contacts: React.FC = () => {

    const {data, isLoading, isError} = useContacts();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    const [filters, setFilters] = useState(filtersDefaultValues);
    const [sort, setSort] = useState(sortDefaultValues);
    const [page, setPage] = useState(1);

    const updatePage = (page: number) => {
        setPage(page);
    }

    const sortContacts = (user1: IUser, user2: IUser, sort: { fieldName: string, direction: string }) => {
        const fullname1 = `${user1.name.first} ${user1.name.last}`;
        const fullname2 = `${user2.name.first} ${user2.name.last}`;
        switch (sort.fieldName) {
            case 'fullname':
                if (sort.direction === 'ASC') return fullname1 > fullname2 ? 1 : fullname1 < fullname2 ? -1 : 0;
                else if (sort.direction === 'DESC') return fullname1 < fullname2 ? 1 : fullname1 > fullname2 ? -1 : 0;
                else return 0;
                break;
            case 'nat':
                if (sort.direction === 'ASC') return user1.nat > user2.nat ? 1 : user1.nat < user2.nat ? -1 : 0;
                else if (sort.direction === 'DESC') return user1.nat < user2.nat ? 1 : user1.nat > user2.nat ? -1 : 0;
                else return 0;
            default:
                return 0;
        }
    }
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
        setPage(1);
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }))
    }, []);

    const clearFilters = useCallback(() => {
        setFilters(filtersDefaultValues)
    }, []);

    const updateSort = (sortField: string) => {
        setSort(prevSort => ({
            ...prevSort,
            fieldName: sortField, direction: prevSort.direction === 'ASC' ? 'DESC' : 'ASC'
        }))
    }
    const sortedContacts = data
        ?.sort((user1, user2) => {
            return sortContacts(user1, user2, sort)
        })

    const filteredContacts = sortedContacts
        ?.filter(c => filterByFullName(c.name, filters.fullname))
        .filter(g => filterByGender(g.gender, filters.gender))
        .filter(n => filterByNationality(n.nat, filters.nationality))
    const pagedContacts = filteredContacts.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

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
                        <ContactsTable data={pagedContacts} updateSort={updateSort}/>
                    }
                    {dataViewMode === DATA_VIEW_MODE.GRID &&
                        // <div data-testid={'contacts-grid-container'}>GRID</div>
                        <ContactsGrid data={pagedContacts} updateSort={updateSort}/>
                    }

                </Grid>
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='end' marginTop={2}>
                        <AppPagination currentPage={page} pageCount={Number(filteredContacts.length / ITEMS_PER_PAGE)}
                                       updatePage={updatePage}/>
                    </Box>
                </Grid>
            </Grid>

        </ContactsContainer>);
};

export default Contacts;
