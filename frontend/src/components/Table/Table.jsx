import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize:"1.1vmax",
    borderRight:"solid 2px black"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor:"white",
    color:"black",
    borderRight:"solid 2px black"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const createRow = (details)=>{
    const row = details.map(detail=><StyledTableCell component="th" scope="row" align="center">{detail}</StyledTableCell>)
    return row
}

const DataTable = ({headings,data=[]}) => {
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 ,borderRadius : '1%'}} aria-label="customized table">
        <TableHead >
          <TableRow>
              {
                  headings.map(heading=><StyledTableCell align="center">{heading}</StyledTableCell>)
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {
              data.map((d,i)=>{
                  const details = Object.values(d)
                  return(
                      <StyledTableRow key={i}>
                          {createRow(details)}
                      </StyledTableRow>
                  )
              })
          }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default DataTable