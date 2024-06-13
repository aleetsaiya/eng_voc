import React, { useState, useEffect } from 'react';
import data from './voc.json';
import Menu from './Menu'
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

// categorize data
const cat_data = {};
for (const row of data) {
    const { category: cat } = row; 
    if (!(cat in cat_data)) 
        cat_data[cat] = [row];
    else 
        cat_data[cat].push(row);
}

// sort raw data by date 
data.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date)
});

const isToday = function(date) {
    const today = new Date();
    const targetDate = new Date(date);
    return today.getFullYear() === targetDate.getFullYear() &&
           today.getMonth() === targetDate.getMonth() - 1 &&
           today.getDate() === targetDate.getDate();
}

function isYesterday(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const targetDate = new Date(date);
    return yesterday.getFullYear() === targetDate.getFullYear() &&
           yesterday.getMonth() === targetDate.getMonth() - 1 &&
           yesterday.getDate() === targetDate.getDate();
}

const filterData = function(data, searchText) {
    searchText = searchText.trim().toLowerCase();
    if (searchText === 'today') {
        return data.filter(row => isToday(row.date));
    }
    else if (searchText === 'yesterday') 
        return data.filter(row => isYesterday(row.date));
    else 
        return data.filter(row => row.voc.toLowerCase().startsWith(searchText));
}

function App() {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setFilteredData(filterData(data, searchText));
        }, 500);
        return () => clearTimeout(timeoutID);
    }, [searchText])

    const handleSearchTextChanged = function(e) {
        setSearchText(e.target.value);
    }

    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Menu searchText={searchText} handleSearchTextChanged={handleSearchTextChanged}/>
        <Container sx={{ maxWidth: 800, marginTop: 5, marginBottom: 5 }}>
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
          {filteredData.map((row, i) => (
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

