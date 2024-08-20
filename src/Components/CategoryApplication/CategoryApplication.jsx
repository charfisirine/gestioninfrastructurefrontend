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
} from "./categoryApplicationSaga";
import { Navigate, Redirect, useNavigate } from "react-router-dom";

const CategoryApplication = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
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
    handleClose(); // Fermer le modal
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (id) => {
    console.log("Edit Category with ID:", id);
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
            onClick={() => handleDelete(params.row.id)}
            data-testid="DeleteIcon"
          />
          <EditIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id)}
            data-testid="EditIcon"
          />
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
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </Card>
    </Box>
  );
};

export default CategoryApplication;
