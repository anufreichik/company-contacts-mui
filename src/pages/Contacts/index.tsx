import React, {useState, useEffect} from "react";
import {useContacts} from "../../hooks/useContacts";
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {ContactsTable} from "../ContactsTable";
import CircularProgress from '@mui/material/CircularProgress';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from "@mui/material/Box";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ContactsContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(4),
}));

const HeadGrid = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));

const DATA_VIEW_MODE = {
    TABLE: 'table',
    GRID: 'grid'
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    '& .MuiToggleButtonGroup-grouped': {
        marginBottom: theme.spacing(2),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

const Contacts: React.FC = () => {

    const {data, isLoading, isError} = useContacts();
    const [dataViewMode, setDataViewMode] = useState(DATA_VIEW_MODE.TABLE);

    const handleChangeViewMode = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setDataViewMode(nextView);
    };

    if (isLoading) return <CircularProgress/>;
    if (isError) return <div>Error...</div>;


    return (
        <ContactsContainer maxWidth="lg">
            <Grid container>
                <HeadGrid item xs={12}>
                    <Box component='div' display='flex' justifyContent='space-between'>
                        <Typography variant="h4" component="div">Contacts</Typography>
                        <StyledToggleButtonGroup
                            orientation="horizontal"
                            value={dataViewMode}
                            exclusive
                            onChange={handleChangeViewMode}
                        >
                            <ToggleButton value={DATA_VIEW_MODE.TABLE} aria-label={DATA_VIEW_MODE.TABLE}>
                                <ViewListIcon/>
                            </ToggleButton>
                            <ToggleButton value={DATA_VIEW_MODE.GRID} aria-label={DATA_VIEW_MODE.GRID}>
                                <ViewModuleIcon/>
                            </ToggleButton>
                        </StyledToggleButtonGroup>
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
