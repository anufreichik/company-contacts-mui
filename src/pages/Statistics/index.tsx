import React from 'react';
import {IUser} from "../../types/types";
import {styled} from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Box, Typography} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";

interface IProps {
    data: IUser[];
}

const StatisticsContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(3),
}));
const HeaderTableCell = styled(TableCell)(({theme}) => ({
    fontSize: 12,
    color: 'lightGray',
    paddingBottom: 0,
    paddingTop: 0,
    borderBottom: 0,
}));
const BodyTableCell = styled(TableCell)(({theme}) => ({
    borderBottom: 0,
}));
const Statistics: React.FC<IProps> = ({data}) => {
    const collectionSize = data.length;
    const males = data.filter(user => user.gender === 'male').length;
    const females = data.filter(user => user.gender === 'female').length;
    const nonbinary = data.filter(user => user.gender !== 'female' && user.gender === 'male').length;
    const nationalities:any={};
    for(let el of data){
        if(!nationalities[el.nat]) nationalities[el.nat]=1;
        else nationalities[el.nat] = nationalities[el.nat] + 1;
    }
    return (
        <StatisticsContainer>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1">Statistics</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Table sx={{width: 'auto'}} aria-label="contacts table">
                        <TableHead>
                            <TableRow>
                                <HeaderTableCell>Collection Size</HeaderTableCell>
                                <HeaderTableCell>Male</HeaderTableCell>
                                <HeaderTableCell>Female</HeaderTableCell>
                                <HeaderTableCell>Intermediate</HeaderTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <BodyTableCell>{collectionSize}</BodyTableCell>
                                <BodyTableCell>{males}</BodyTableCell>
                                <BodyTableCell>{females}</BodyTableCell>
                                <BodyTableCell>{nonbinary}</BodyTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="span">Nationalities</Typography>
                    <Box display='flex' flexDirection='row' flexWrap='wrap' style={{width: 'auto'}}>
                        {
                            Object.entries(nationalities).map(([key,value])=>
                                <Typography  component="span" key={key}>{NATIONALITIES_HUMAN_NAME[key]} {value}</Typography>
                            )
                        }
                    </Box>
                </Grid>

            </Grid>
        </StatisticsContainer>
    );
}

export default Statistics;
