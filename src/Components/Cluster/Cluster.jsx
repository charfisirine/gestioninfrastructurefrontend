import React, { useEffect, useState } from "react";
import "./cluster.css"; // Create a separate CSS file for clusters
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
  deleteCluster,
  getClustersList,
  postClusterForm,
  updateCluster,
} from "./clusterSaga"; // Adjust the import to your saga file
import { Typography } from "@mui/material";

const Cluster = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [clusterToDelete, setClusterToDelete] = useState(null);
  const [clusterToEdit, setClusterToEdit] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    role: "",
    status: "",
    location: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setClusterToEdit(null);
  };

  const dispatch = useDispatch();
  const { clusters } = useSelector((state) => state.cluster); // Adjust the selector to your state

  useEffect(() => {
    if (!clusters) {
      dispatch(getClustersList());
    }
  }, [clusters, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postClusterForm({ ...formData }));
    setFormData({
      name: "",
      description: "",
      type: "",
      role: "",
      status: "",
      location: "",
    });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setClusterToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteCluster(clusterToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const cluster = clusters.find((cluster) => cluster.id === id);
    if (cluster) {
      setClusterToEdit(cluster);
      setIsEditModalOpen(true);
    }
  };

  const handleEditCluster = () => {
    dispatch(updateCluster(clusterToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Cluster Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <DeleteIcon
            color="warning"
            style={{ cursor: "pointer", marginRight: 8 }}
            onClick={() => handleOpenDeleteModal(params.row.id)}
          />
          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-Cluster-box"
    >
      <Card variant="outlined" className="custom-Cluster-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Clusters</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Cluster
            </Button>
          </Box>

          <Modal open={open}>
            <Box className="modal-box-cluster">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add Cluster</h2>
                  <IconButton onClick={handleClose}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>

                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Cluster Name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Type"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={handleClose}
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

        <div className="div-cluster">
          <DataGrid
            rows={clusters}
            columns={columns}
            sx={{
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#efeeff",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#F8F8FF",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
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

export default Cluster;
