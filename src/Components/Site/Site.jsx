import React, { useEffect, useState } from "react";
import "./site.css"; // Updated CSS file
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
import { getsitesList, postSitesForm, deleteSite, updateSite } from './siteSaga';
import { Typography } from "@mui/material";

const Site = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState(null);
  const [siteToEdit, setSiteToEdit] = useState(null);
  const dispatch = useDispatch();
  const { sites } = useSelector((state) => state.site);
  const [formData, setFormData] = useState({
    designation: "",
  });

  useEffect(() => {
    if (!sites) {
      dispatch(getsitesList()); // Adjusted to match the saga export
    }
  }, [sites, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSiteToEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSitesForm({ ...formData }));
    setFormData({ designation: "" }); // Reset form data
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setSiteToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteSite(siteToDelete)); // Call delete action
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const site = sites.find((site) => site.id === id);
    if (site) {
      setSiteToEdit(site);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSite = () => {
    dispatch(updateSite(siteToEdit)); // Call update action
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "designation", headerName: "Site Designation", width: 150 },
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
    <Box sx={{ display: "flex", flexWrap: "wrap" }} className="custom-Site-box">
      <Card variant="outlined" className="custom-Site-card">
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="h2-style">List of Sites</h2>
            <Button variant="contained" onClick={handleOpen}>
              Add Site
            </Button>
          </Box>
          <Modal open={open} onClose={handleClose}>
            <Box className="modal-box-site">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Add Site</h2>
                  <IconButton onClick={handleClose} size="large" color="inherit">
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>

                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Site Designation"
                      id="designation"
                      sx={{ m: 1, width: "35ch" }}
                      value={formData.designation}
                      onChange={handleChange}
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

        <div className="div-site">
          <DataGrid
            rows={sites}
            columns={columns}
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
            disableRowSelectionOnClick
          />
        </div>

        {/* Delete Confirmation Modal */}
        <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box className="modal-box-site">
            <Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <h2>Delete Site</h2>
                <IconButton onClick={handleCloseDeleteModal} size="large" color="inherit">
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography>
                  Are you sure you want to delete this site?
                </Typography>
                <Button onClick={handleDeleteConfirmed} variant="contained" color="success">
                  Yes
                </Button>
                <Button onClick={handleCloseDeleteModal} variant="contained" color="error" sx={{ ml: 2 }}>
                  No
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Modal>

        {/* Edit Site Modal */}
        <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
          <Box className="modal-box-site">
            <Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <h2>Edit Site</h2>
                <IconButton onClick={handleCloseEditModal} size="large" color="inherit">
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleEditSite(); }}>
                  <TextField
                    label="Site Designation"
                    id="designation"
                    value={siteToEdit?.designation}
                    onChange={(event) => setSiteToEdit({ ...siteToEdit, designation: event.target.value })}
                    sx={{ m: 1, width: "35ch" }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleEditSite}
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={handleCloseEditModal}
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
      </Card>
    </Box>
  );
};

export default Site;
