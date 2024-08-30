import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./reseau.css";
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
  deleteReseau,
  getReseauxList,
  postReseauForm,
  updateReseau,
} from "./reseauSaga"; // Assurez-vous que ces actions sont définies dans votre saga
import { Typography } from "@mui/material";

const Reseau = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [reseauToDelete, setReseauToDelete] = useState(null);
  const [reseauToEdit, setReseauToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setReseauToEdit(null);
  };

  const dispatch = useDispatch();
  const { reseaux } = useSelector((state) => state.reseau);
  const [formData, setFormData] = useState({
    name: "",
    ipRange: "",
    typeReseau: "",
    site_id: "", // Ajout du champ site_id
  });

  useEffect(() => {
    if (!reseaux) {
      dispatch(getReseauxList());
    }
  }, [reseaux, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReseauForm({ ...formData }));
    setFormData({ name: "", ipRange: "", typeReseau: "", site_id: "" });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setReseauToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteReseau(reseauToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const reseau = reseaux.find((reseau) => reseau.id === id);
    if (reseau) {
      setReseauToEdit(reseau);
      setIsEditModalOpen(true);
    }
  };

  const handleEditReseau = () => {
    dispatch(updateReseau(reseauToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "ipRange", headerName: "IP Range", width: 150 },
    { field: "typeReseau", headerName: "Type", width: 150 },
    { field: "site_id", headerName: "Site ID", width: 150 }, // Colonne pour site_id
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
            <Box className="modal-box-reseau">
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
                  <Typography>Are you sure you want to delete this Reseau?</Typography>
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
            <Box className="modal-box-reseau">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Reseau</h2>
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
                      label="Name"
                      id="name"
                      value={reseauToEdit?.name}
                      onChange={(event) =>
                        setReseauToEdit({
                          ...reseauToEdit,
                          name: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="IP Range"
                      id="ipRange"
                      value={reseauToEdit?.ipRange}
                      onChange={(event) =>
                        setReseauToEdit({
                          ...reseauToEdit,
                          ipRange: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Type"
                      id="typeReseau"
                      value={reseauToEdit?.typeReseau}
                      onChange={(event) =>
                        setReseauToEdit({
                          ...reseauToEdit,
                          typeReseau: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Site ID"
                      id="site_id"
                      value={reseauToEdit?.site_id}
                      onChange={(event) =>
                        setReseauToEdit({
                          ...reseauToEdit,
                          site_id: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      onClick={handleEditReseau}
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
    <div className="custom-Reseau-box">
      <Card className="custom-Reseau-card">
        <h2 className="h2-style">Reseau</h2>
        <CardContent>
          <div className="datagrid-style">
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="success"
                className="add-button"
                onClick={handleOpen}
              >
                Add a Reseau
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box className="modal-box-reseau">
                  <h2>Add a Reseau</h2>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="IP Range"
                      id="ipRange"
                      value={formData.ipRange}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Type"
                      id="typeReseau"
                      value={formData.typeReseau}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Site ID"
                      id="site_id"
                      value={formData.site_id}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      type="submit"
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
                </Box>
              </Modal>
            </Box>
            <div className="div-reseau">
              <DataGrid
                rows={reseaux || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reseau;
