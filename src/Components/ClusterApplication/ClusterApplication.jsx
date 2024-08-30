import "./clusterApplication.css";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
    getClusterApplicationList,
    postClusterApplicationForm,
    deleteClusterApplication,
    updateClusterApplication
} from "./clusterApplicationSaga";
import { Typography } from "@mui/material";

const ClusterApplication = () => {
  const dispatch = useDispatch();
  
  // Ensure correct access to the state
  const clusters = useSelector((state) => state.clusterApplication.clusterApplications || []); 
  
  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({ status: '' });
  const [selectedClusterId, setSelectedClusterId] = useState(null);
  const [clusterToDelete, setClusterToDelete] = useState(null);

  useEffect(() => {
    dispatch(getClusterApplicationList());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ status: '' });
    setSelectedClusterId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClusterId) {
      dispatch(updateClusterApplication({ id: selectedClusterId, ...formData }));
    } else {
      dispatch(postClusterApplicationForm(formData));
    }
    handleClose();
  };

  const handleOpenDeleteModal = (id) => {
    setClusterToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteClusterApplication(clusterToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (cluster) => {
    setFormData({ status: cluster.status });
    setSelectedClusterId(cluster.id);
    handleOpen();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <DeleteIcon
            color="warning"
            style={{ cursor: 'pointer', marginRight: 8 }}
            onClick={() => handleOpenDeleteModal(params.row.id)}
            data-testid="DeleteIcon"
          />
          <Modal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <Box className="modal-box-Cluster">
              <Card>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setIsDeleteModalOpen(false)}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography>Are you sure you want to delete this cluster?</Typography>
                  <Button
                    onClick={handleDeleteConfirmed}
                    className="confirmer-button"
                    variant="contained"
                    color="success"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="confirmer-button"
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    No
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Modal>
          <EditIcon
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => handleEdit(params.row)}
            data-testid="EditIcon"
          />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className="custom-Cluster-box">
      <Card variant="outlined" className="custom-Cluster-card">
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className="h2-style">List of Clusters</h2>
            <Button variant="contained" onClick={handleOpen} className="add-button">
              Add Cluster
            </Button>
          </Box>
          <Modal open={open} onClose={handleClose}>
            <Box className="modal-box-Cluster">
              <Card>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1,
                  }}
                >
                  <h2>Add Cluster</h2>
                  <IconButton
                    onClick={handleClose}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Cluster Status"
                      id="status"
                      sx={{ m: 1, width: '35ch' }}
                      value={formData.status}
                      onChange={handleChange}
                    />
                    <Button
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </Box>
        <div className="div-Cluster">
          <DataGrid
            className="datagrid-style"
            rows={clusters}
            columns={columns}
            sx={{
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: '#efeeff',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#F8F8FF',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </div>
      </Card>
    </Box>
  );
};

export default ClusterApplication;
