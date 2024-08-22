import React, { useEffect, useState } from "react";
import "./categoryApplication.css";
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
  deleteCategory,
  getappcategoriesList,
  postAppCategoriesForm,
  updateCategory,
} from "./categoryApplicationSaga";
import { Typography } from "@mui/material";

const CategoryApplication = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
    setCategoryToEdit(null); // Reset the edit data after closing the modal
  };
  const dispatch = useDispatch();
  const { appcategories } = useSelector((state) => state.appcategorie);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!appcategories) {
      dispatch(getappcategoriesList());
    }
  }, [appcategories, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postAppCategoriesForm({ ...formData }));
    setFormData({ name: "", description: "" }); // Réinitialiser les données du formulaire
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setCategoryToDelete(id); // Met à jour l'ID de la catégorie à supprimer
    setIsDeleteModalOpen(true); // Ouvre le modal
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteCategory(categoryToDelete)); // Supprime la catégorie avec la fonction  deleteCategory du sagga
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    // Find the category with the given id
    const category = appcategories.find((category) => category.id === id);

    if (category) {
      setCategoryToEdit(category); // Set the selected category for editing
      setIsEditModalOpen(true); // Open the edit modal
    }
  };

  const handleEditCategory =() => {
    dispatch(updateCategory(categoryToEdit))
    setIsEditModalOpen(false);

  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Category Name", width: 150 },
    {
      field: "description",
      headerName: "Category Description",
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
                    Are you sure you want to delete this category!
                  </Typography>

                  <Button
                    onClick={handleDeleteConfirmed}
                    type="submit"
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
                  <h2>Edit Application's Category</h2>
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
                      label="Category Name"
                      id="name"
                      value={categoryToEdit?.name}
                      onChange={(event) => {
                        setCategoryToEdit({...categoryToEdit, name: event.target.value})
                      }}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Category Description"
                      id="description"
                      value={categoryToEdit?.description}
                      onChange={(event) => {
                        setCategoryToEdit({...categoryToEdit, description: event.target.value})
                      }}
                      multiline
                      sx={{ m: 1, width: "35ch" }}
                    />

                    <Button
                      className="confirmer-button"
                      variant="contained"
                      color="success"
                      onClick={handleEditCategory}
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
      className="custom-Category-box"
    >
      <Card variant="outlined" className="custom-Category-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Application's Categories</h2>
            <Button
              variant="contained"
              onClick={handleOpen}
              className="add-button"
            >
              Add Category
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
                  <h2>Add Application's Category </h2>
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
                      label="Category Name"
                      id="name"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Category Description"
                      multiline
                      id="description"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.description}
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

        <div className="div-category">
          <DataGrid
            className="datagrid-style"
            rows={appcategories}
            columns={columns}
            //t7ot les rows des table mlawnin ka3ba bka3ba
            sx={{
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#efeeff",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#F8F8FF",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: " none",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // isRowSelectable={()=> false}
            disableRowSelectionOnClick
          />
        </div>
      </Card>
    </Box>
  );
};

export default CategoryApplication;
