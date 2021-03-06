import React from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { IUser } from "../../types/types";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { CopyToClipboard } from "../../components/CopyToClipboard";
import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";
import ContactsSort from "../Contacts/ContactsSort";
interface IProps {
  data: IUser[];
  updateSort: (fieldName:string) => void;
}
export const ContactsTable: React.FC<IProps> = ({ data, updateSort }) => {
  return (
    <TableContainer component={Paper} data-testid={'contacts-table-container'}>
      <Table sx={{ minWidth: 700 }} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full Name
            <ContactsSort sortField={'fullname'} updateSort={updateSort}/>
            </TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right" width={120}>Nationality
              <ContactsSort sortField={'nat'} updateSort={updateSort}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.login.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">
                <Avatar
                  alt={`${row.name.first} ${row.name.last}`}
                  src={row.picture.thumbnail}
                />
              </TableCell>
              <TableCell>{`${row.name.title} ${row.name.first} ${row.name.last}`}</TableCell>
              <TableCell>
                <Typography variant="body2" component="div">
                  {" "}
                  {format(parseISO(String(row.dob.date)), "MM/dd/yyy")}
                </Typography>
                <Typography variant="body2" component="div">
                  {" "}
                  {`${row.dob.age} years`}
                </Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboard text={row.email} />
              </TableCell>
              <TableCell>
                <CopyToClipboard text={row.phone} />
              </TableCell>
              <TableCell>
                <Typography>{row.location.country}</Typography>
                <Typography>
                  {row.location.city}, {row.location.street.name}{" "}
                  {row.location.street.number}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={NATIONALITIES_HUMAN_NAME[row.nat]}
                  color='primary'
                  size="small"
                  variant={'outlined'}
                  sx={{
                    borderRadius: 0,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
