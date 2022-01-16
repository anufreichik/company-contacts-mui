import React from 'react';
import {IUser} from "../../types/types";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {format} from "date-fns";
import parseISO from "date-fns/parseISO";
import {CopyToClipboard} from "../../components/CopyToClipboard";
import Chip from "@mui/material/Chip";
import {NATIONALITIES_HUMAN_NAME} from "../../constants/nationalities";
import ContactsSort from "../Contacts/ContactsSort";

interface IProps {
    data: IUser[];
    updateSort: (fieldName: string) => void;
}

const ContactsGrid: React.FC<IProps> = ({data, updateSort}) => {
    return (
        <>
            <Box display='flex' justifyContent='start' marginBottom={2} gap={3}>
                <div>Sort By Full Name
                    <ContactsSort sortField={'fullname'} updateSort={updateSort}/>
                </div>
                <div>Sort By Nationality
                    <ContactsSort sortField={'nat'} updateSort={updateSort}/>
                </div>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {data.map(row =>
                    <Box gridColumn="span 1">

                        <Paper sx={{p: 2, margin: 'auto', maxWidth: 500, minHeight: 230, flexGrow: 1}}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        alt={`${row.name.first} ${row.name.last}`}
                                        src={row.picture.thumbnail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div"
                                                        style={{fontWeight: 600}}>
                                                {`${row.name.title} ${row.name.first} ${row.name.last}`}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {format(parseISO(String(row.dob.date)), "MM/dd/yyy")}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {`${row.dob.age} years`}
                                            </Typography>
                                            <CopyToClipboard text={row.email}/>
                                            <CopyToClipboard text={row.phone}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{row.location.country}</Typography>
                                            <Typography>
                                                {row.location.city}, {row.location.street.name}{" "}
                                                {row.location.street.number}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Chip
                                            label={NATIONALITIES_HUMAN_NAME[row.nat]}
                                            color='primary'
                                            size="small"
                                            sx={{
                                                borderRadius: 0,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}

            </Box>
        </>
    );
}

export default ContactsGrid;
