import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsList, removeProduct } from '../redux/Productsslice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';



export function List(){

    const dispatch = useDispatch()
    const { allProductsResponse } = useSelector(state => state.products)

    const {isPending} = useQuery({
        queryKey: ['fetchProducts'],
        queryFn: () => dispatch(fetchProductsList())
    })

    const deleteProduct = (id) => {
        removeProduct(id)
        setTimeout(() => {
            dispatch(fetchProductsList())
        }, 1000);
    }

    if(isPending) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProductsResponse?.data?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/edit/${row._id}`} style={{marginRight: '5px', marginBottom: '5px'}}><Button variant='contained' color='success'>Edit</Button></Link>
                                    <Button variant='contained' color='error' onClick={() => { deleteProduct(row._id)}}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}