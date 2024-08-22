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
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryServeur,
  getCategoryServeursList,
  postCategoryServeurForm,
  updateCategoryServeur,
} from "./categoryServeurSaga";
import { useNavigate } from "react-router-dom";

const CategoryServeur = () => {
  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryServeurs } = useSelector((state) => state.categoryServeur);
  const [formData, setFormData] = useState({
    id: null, // Ajout du champ id pour l'édition
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!categoryServeurs) {
      dispatch(getCategoryServeursList());
    }
  }, [categoryServeurs, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryToEdit) {
      dispatch(updateCategoryServeur({ ...categoryToEdit }));
      setIsEditModalOpen(false);
    } else {
      dispatch(postCategoryServeurForm({ ...formData }));
      handleClose();
    }
    setFormData({ id: null, name: "", description: "" }); // Réinitialiser les données du formulaire
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setCategoryToDelete(id); // Met à jour l'ID de la catégorie à supprimer
    setIsDeleteModalOpen(true); // Ouvre le modal
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteCategoryServeur(categoryToDelete)); // Supprime la catégorie
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const category = categoryServeurs.find((cat) => cat.id === id);
    if (category) {
      setCategoryToEdit(category);
      setIsEditModalOpen(true);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditModalOpen(false);
    setFormData({ id: null, name: "", description: "" });
  };

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nom de la Catégorie", width: 150 },
    {
      field: "description",
      headerName: "Description de la Catégorie",
      width: 600,
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
            data-testid="DeleteIcon"
          />
          <Modal
            open={isDeleteModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box-category">
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
                  <Typography>
                    Êtes-vous sûr de vouloir supprimer cette catégorie ?
                  </Typography>

                  <Button
                    onClick={handleDeleteConfirmed}
                    type="submit"
                    className="confirmer-button"
                    variant="contained"
                    color="success"
                  >
                    Oui
                  </Button>
                  <Button
                    onClick={handleCloseDeleteModal}
                    className="confirmer-button"
                    variant="contained"
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    Non
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Modal>

          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
            data-testid="EditIcon"
          />
          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
            <Box className="modal-box-category">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>{isEditModalOpen ? "Modifier la Catégorie" : "Ajouter une Catégorie"}</h2>
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
                      label="Nom de la Catégorie"
                      id="name"
                      sx={{ m: 1, width: "35ch" }}
                      value={categoryToEdit ? categoryToEdit.name : formData.name}
                      onChange={(e) =>
                        categoryToEdit
                          ? setCategoryToEdit({
                              ...categoryToEdit,
                              name: e.target.value,
                            })
                          : handleChange(e)
                      }
                    />
                    <TextField
                      label="Description de la Catégorie"
                      multiline
                      id="description"
                      sx={{ m: 1, width: "35ch" }}
                      value={categoryToEdit ? categoryToEdit.description : formData.description}
                      onChange={(e) =>
                        categoryToEdit
                          ? setCategoryToEdit({
                              ...categoryToEdit,
                              description: e.target.value,
                            })
                          : handleChange(e)
                      }
                    />

                    <Button
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Confirmer
                    </Button>
                    <Button
                      onClick={handleCloseEditModal}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Annuler
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
    <Box sx={{ display: "flex", flexWrap: "wrap" }} className="custom-Category-box">
      <Card variant="outlined" className="custom-Category-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">Liste des Catégories de Serveurs</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Ajouter une Catégorie
            </Button>
          </Box>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box-category">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>{isEditModalOpen ? "Modifier la Catégorie" : "Ajouter une Catégorie"}</h2>
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
                      label="Nom de la Catégorie"
                      id="name"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Description de la Catégorie"
                      multiline
                      id="description"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.description}
                      onChange={handleChange}
                    />

                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                    >
                      Confirmer
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="confirmer-button"
                      variant="contained"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Annuler
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </Box>
        <Box
          sx={{
            height: 400,
            width: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <DataGrid
            rows={categoryServeurs ? categoryServeurs : []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      </Card>
    </Box>
  );
};

export default CategoryServeur;
