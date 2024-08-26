import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./categoryServeur.css";
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
  deleteCategoryServeur,
  getCategoryServeursList,
  postCategoryServeurForm,
  updateCategoryServeur,
} from "./categoryServeurSaga";
import { Typography } from "@mui/material";

const CategoryServeur = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const dispatch = useDispatch();
  const { categoryServeurs } = useSelector((state) => state.categoryServeur);
  const [formData, setFormData] = useState({
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
    dispatch(postCategoryServeurForm({ ...formData }));
    setFormData({ name: "", description: "" });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteCategoryServeur(categoryToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const category = categoryServeurs.find((category) => category.id === id);
    if (category) {
      setCategoryToEdit(category);
      setIsEditModalOpen(true);
    }
  };

  const handleEditCategory = () => {
    dispatch(updateCategoryServeur(categoryToEdit));
    setIsEditModalOpen(false);
  };

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
          />
          <Modal open={isDeleteModalOpen}>
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
                  <Typography>Are you sure you want to delete this category!</Typography>
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
                  <h2>Edit Server's Category</h2>
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
                      onChange={(event) =>
                        setCategoryToEdit({
                          ...categoryToEdit,
                          name: event.target.value,
                        })
                      }
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Category Description"
                      id="description"
                      value={categoryToEdit?.description}
                      onChange={(event) =>
                        setCategoryToEdit({
                          ...categoryToEdit,
                          description: event.target.value,
                        })
                      }
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
            <h2 className="h2-style">List of Server's Categories</h2>
            <Button variant="contained" onClick={handleOpen} className="add-button">
              Add Category
            </Button>
          </Box>
          <Modal open={open}>
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
                  <h2>Add Server's Category</h2>
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
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <TextField
                      label="Category Description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      sx={{ m: 1, width: "35ch" }}
                    />
                    <Button
                      className="confirmer-button"
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </Box>
        <div className="datagrid-style">
          <div className="div-category">
            <DataGrid
              rows={categoryServeurs || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default CategoryServeur;
