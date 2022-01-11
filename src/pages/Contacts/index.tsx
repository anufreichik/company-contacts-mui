import React from "react";
import {useContacts} from "../../hooks/useContacts";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {ContactsTable} from "../ContactsTable";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import ToggleDataViewMode from "../ToggleDataViewMode";
import { DATA_VIEW_MODE } from "../../constants";
import {useDataViewMode} from "../../hooks/useDataViewMode";

const ContactsContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(4),
}));

const HeadGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));


const Contacts: React.FC = () => {

    const {data, isLoading, isError} = useContacts();
    const [dataViewMode, setDataViewMode]= useDataViewMode();

    if (isLoading) return <CircularProgress data-testid={'contacts-loader'}/>;
    if (isError) return <div data-testid={'contacts-error'}>Error...</div>;

    return (
        <ContactsContainer maxWidth="lg">
            <Grid container>
                <HeadGrid item xs={12}>
                    <Box component='div' display='flex' justifyContent='space-between'>
                        <Typography variant="h4" component="h1">Contacts</Typography>
                        <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode}/>
                    </Box>


                </HeadGrid>

                <Grid item xs={12}>
                    {dataViewMode === DATA_VIEW_MODE.TABLE &&
                        <ContactsTable data={data}/>
                    }
                    {dataViewMode === DATA_VIEW_MODE.GRID &&
                        <div>GRID</div>
                    }

                </Grid>
            </Grid>

        </ContactsContainer>);
};

export default Contacts;
