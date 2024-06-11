import React from 'react';
import data from './voc.json';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
    typography: {
        'fontSize': 16 
    }
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ maxWidth: 800 }}>
            <h1>English Vocabulary</h1>
            <TableContainer component={Paper}> 
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vocabulary</TableCell>
            <TableCell align="right">Translated</TableCell>
            <TableCell align="right" sx={{display: {xs: 'none', md: 'block'}}}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
            >
              <TableCell><Link href={`https://dictionary.cambridge.org/dictionary/english/${row.voc}`} underline='none'>{row.voc}</Link></TableCell>
              <TableCell align="right">{row.translated}</TableCell>
              <TableCell align="right" sx={{'fontStyle': 'italic', display: {xs: 'none', md: 'block'}}}>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
        </Container>
        </ThemeProvider>
    );
}

export default App;

