import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./serveur.css";
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
  deleteServeur,
  getServeursList,
  postServeurForm,
  updateServeur,
} from "./serveurSaga";
import { Typography } from "@mui/material";

const Serveur = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [serveurToDelete, setServeurToDelete] = useState(null);
  const [serveurToEdit, setServeurToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setServeurToEdit(null);
  };

  const dispatch = useDispatch();
  const { serveurs } = useSelector((state) => state.serveur);
  const [formData, setFormData] = useState({
    hostName: "",
    addressIp: "",
    status: "",
    specification: "",
    categoryServerId: "", // Added
    clusterId: "", // Added
  });

  useEffect(() => {
    if (!serveurs) {
      dispatch(getServeursList());
    }
  }, [serveurs, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServeurForm({ ...formData }));
    setFormData({ hostName: "", addressIp: "", status: "", specification: "", categoryServerId: "", clusterId: "" });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setServeurToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteServeur(serveurToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const serveur = serveurs.find((serveur) => serveur.serveurId === id);
    if (serveur) {
      setServeurToEdit(serveur);
      setIsEditModalOpen(true);
    }
  };

  const handleEditServeur = () => {
    dispatch(updateServeur(serveurToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "serveurId", headerName: "ID", width: 70 },
    { field: "hostName", headerName: "Host Name", width: 150 },
    { field: "addressIp", headerName: "Address IP", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "specification", headerName: "Specification", width: 200 },
    { field: "categoryServerId", headerName: "Category Server ID", width: 150 }, // New column
    { field: "clusterId", headerName: "Cluster ID", width: 150 }, // New column
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
            onClick={() => handleOpenDeleteModal(params.row.serveurId)}
          />
          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.serveurId)}
          />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} className="custom-Serveur-box">
      <Card variant="outlined" className="custom-Serveur-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Servers</h2>
            <Button variant="contained" onClick={handleOpen} className="add-button">
              Add Server
            </Button>
          </Box>
          <Modal open={open}>
            <Box className="modal-box-Serveur">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add Server</h2>
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
                      label="Host Name"
                      id="hostName"
                      value={formData.hostName}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Address IP"
                      id="addressIp"
                      value={formData.addressIp}
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
                      label="Specification"
                      id="specification"
                      value={formData.specification}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Category Server ID"
                      id="categoryServerId"
                      value={formData.categoryServerId}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Cluster ID"
                      id="clusterId"
                      value={formData.clusterId}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ m: 1 }}
                    >
                      Add Server
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>

          <DataGrid
            rows={serveurs}
            columns={columns}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Card>
      
      {/* Edit Modal */}
      <Modal open={isEditModalOpen}>
        <Box className="modal-box-Serveur">
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
              }}
            >
              <h2>Edit Server</h2>
              <IconButton
                onClick={handleCloseEditModal}
                size="large"
                aria-label="close modal"
                color="inherit"
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <CardContent>
              <form onSubmit={handleEditServeur}>
                <TextField
                  label="Host Name"
                  id="hostName"
                  value={serveurToEdit?.hostName || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      hostName: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Address IP"
                  id="addressIp"
                  value={serveurToEdit?.addressIp || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      addressIp: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Status"
                  id="status"
                  value={serveurToEdit?.status || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      status: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Specification"
                  id="specification"
                  value={serveurToEdit?.specification || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      specification: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Category Server ID"
                  id="categoryServerId"
                  value={serveurToEdit?.categoryServerId || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      categoryServerId: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <TextField
                  label="Cluster ID"
                  id="clusterId"
                  value={serveurToEdit?.clusterId || ""}
                  onChange={(event) =>
                    setServeurToEdit({
                      ...serveurToEdit,
                      clusterId: event.target.value,
                    })
                  }
                  sx={{ m: 1, width: "35ch" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 1 }}
                >
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen}>
        <Box className="modal-box-Serveur">
          <Card>
            <CardContent>
              <Typography variant="h6">Are you sure you want to delete this server?</Typography>
              <Button variant="contained" color="error" onClick={handleDeleteConfirmed}>
                Delete
              </Button>
              <Button variant="contained" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default Serveur;
