import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./serveurApplication.css";
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
  deleteServeurApplication,
  getServeurApplicationsList,
  postServeurApplicationForm,
  updateServeurApplication,
} from "./serveurApplicationSaga";
import { Typography } from "@mui/material";

const ServeurApplication = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [serveurApplicationToDelete, setServeurApplicationToDelete] = useState(null);
  const [serveurApplicationToEdit, setServeurApplicationToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setServeurApplicationToEdit(null);
  };

  const dispatch = useDispatch();
  const { serveurApplications } = useSelector((state) => state.serveurApplication);
  const [formData, setFormData] = useState({
    purpose: "",
    lienAcces: "",
    serveurId: "",
    applicationId: "",
  });

  useEffect(() => {
    if (!serveurApplications) {
      dispatch(getServeurApplicationsList());
    }
  }, [serveurApplications, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServeurApplicationForm({ ...formData }));
    setFormData({ purpose: "", lienAcces: "", serveurId: "", applicationId: "" });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setServeurApplicationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteServeurApplication(serveurApplicationToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const serveurApplication = serveurApplications.find((item) => item.id === id);
    if (serveurApplication) {
      setServeurApplicationToEdit(serveurApplication);
      setIsEditModalOpen(true);
    }
  };

  const handleEditServeurApplication = () => {
    dispatch(updateServeurApplication(serveurApplicationToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    {
      field: "lienAcces",
      headerName: "Lien Acces",
      width: 200,
    },
    {
      field: "serveurId",
      headerName: "Serveur ID",
      width: 150,
    },
    {
      field: "applicationId",
      headerName: "Application ID",
      width: 150,
    },
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
          <Modal open={isDeleteModalOpen}>
            <Box className="modal-box-ServeurApp">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <IconButton
                    onClick={handleCloseDeleteModal}
                    size="large"
                    aria-label="close modal"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography>Are you sure you want to delete this serveur application?</Typography>
                  <Button
                    onClick={handleDeleteConfirmed}
                    className="confirmer-button"
                    variant="contained"
                    color="success"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleCloseDeleteModal}
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
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
          />
          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
            <Box className="modal-box-ServeurApp">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Serveur Application</h2>
                  <IconButton
                    onClick={handleCloseEditModal}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Purpose"
                      id="purpose"
                      value={serveurApplicationToEdit?.purpose}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          purpose: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Lien Acces"
                      id="lienAcces"
                      value={serveurApplicationToEdit?.lienAcces}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          lienAcces: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Serveur ID"
                      id="serveurId"
                      value={serveurApplicationToEdit?.serveurId}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          serveurId: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Application ID"
                      id="applicationId"
                      value={serveurApplicationToEdit?.applicationId}
                      onChange={(event) =>
                        setServeurApplicationToEdit({
                          ...serveurApplicationToEdit,
                          applicationId: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      onClick={handleEditServeurApplication}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={handleCloseEditModal}
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
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-ServeurApp-box"
    >
      <Card variant="outlined" className="custom-ServeurApp-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Serveur Applications</h2>
            <Button variant="contained" onClick={handleOpen} className="add-button">
              Add Serveur Application
            </Button>
          </Box>
          <Modal open={open}>
            <Box className="modal-box-ServeurApp">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add New Serveur Application</h2>
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
                      label="Purpose"
                      id="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Lien Acces"
                      id="lienAcces"
                      value={formData.lienAcces}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Serveur ID"
                      id="serveurId"
                      value={formData.serveurId}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Application ID"
                      id="applicationId"
                      value={formData.applicationId}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Add
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
          <div className="custom-ServeurApp-data-grid">
            <DataGrid
              rows={serveurApplications || []}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight
            />
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default ServeurApplication;
