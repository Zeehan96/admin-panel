import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchBar from './CustomerSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditCustomerForm from './EditCustomer';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'industry_type', label: 'Industry Type', minWidth: 170 },
  { id: 'account_status', label: 'Account Status', minWidth: 170 },
  { id: 'customer_type', label: 'Customer Type', minWidth: 170 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl,"-------api")
  
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customers, setCustomers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [openEditDialog, setOpenEditDialog] = useState(false); 
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);
// handle one edit function
  const handleOpenEdit = (customerId) => {
    const selectedCustomer = customers.find(customer => customer.user._id === customerId);
    if(selectedCustomer){
      setOpenEditDialog(true);
      setCustomerData(selectedCustomer); 
      console.log(selectedCustomer,"data--")
    }
    else {
      console.log("Customer not found")
    }
  };
  
  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedCustomerId(null);
  };
const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'x-sh-auth': token,
    };

    const response = await axios.post(
      `http://146.190.164.174:4000/api/customer/get_customers`, 
      {},
      { headers: headers }
    );
    setCustomers(response.data.customer);
    setLoading(false); 
  } catch (error) {
    console.error('Error fetching customers:', error.response);
    setLoading(false);
  }
};

  const handleAddCustomer = async () => {
    try {
      navigate('/addCustomer');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'x-sh-auth': token,
      };

      const response = await axios.delete(
        `http://146.190.164.174:4000/api/customer/delete_customer/${selectedCustomerId}`,
        { headers: headers }
      );

      if (response.status === 200) {
        fetchCustomers();
        setDeleteSuccess(true);
      } else {
        console.error('Failed to delete customer:', response.data);
      }
    } catch (error) {
      console.error('Error deleting customer:', error.response);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmDelete = (customerId) => {
    setSelectedCustomerId(customerId);
    setOpenDeleteDialog(true);
  };

  const handleCloseSnackbar = () => {
    setDeleteSuccess(false);
  };

  return (
    <>
    <div className="manage-buttons">
    <div className='d-flex justify-content-end' style={{  marginBottom: '20px' }}>
        <Button
          onClick={handleAddCustomer}
          sx={{
            backgroundColor: '#00A95A',
            color:'white',
            '&:hover': {
            backgroundColor: '#00753e',
            },
            }}
            >
            Add Customer
            </Button>
            </div>
            <div className="d-flex align-item-center justify-content-between" style={{ marginBottom: '30px' }}>
    <h1>Customer</h1>
    <SearchBar />
  </div>
    </div>
  

  {loading ? ( 
    <CircularProgress className='d-flex align-item-center' style={{ margin: 'auto', color:"#00A95A"}} />
  ) : (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'email' ? row.user.email : row[column.id]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                  
                     
                     
                      <DeleteIcon 
                      onClick={() => handleConfirmDelete(row.user._id)}
                      color="error"
                      />
                      <EditIcon
                        color="primary"
                        onClick={() => handleOpenEdit(row.user._id)}
                      />
                   
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )}

  <Dialog
    open={openDeleteDialog}
    onClose={() => setOpenDeleteDialog(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{ color: '#00A95A' }}>{"Confirm Deletion"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this customer?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        sx={{
          backgroundColor: "#dc3545",
          color: "white",
          '&:hover': {
            backgroundColor: "#ae0c1c",
          },
        }}
        onClick={() => setOpenDeleteDialog(false)}
        color="primary"
      >
        Cancel
      </Button>
      <Button
        sx={{
          backgroundColor: "#00A95A",
          color: "white",
          '&:hover': {
            backgroundColor: "#00753e",
          },
        }}
        onClick={handleDeleteCustomer}
        autoFocus
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>

  <Snackbar open={deleteSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
    <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
      Customer deleted successfully.
    </MuiAlert>
  </Snackbar>

  <Dialog
  open={openEditDialog}
  onClose={handleCloseEdit}
  aria-labelledby="edit-customer-dialog-title"
>
  <EditCustomerForm customerData={customerData} handleClose={handleCloseEdit} />
</Dialog>
</>

  )}