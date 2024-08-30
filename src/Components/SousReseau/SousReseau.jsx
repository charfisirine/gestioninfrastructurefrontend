import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./sousReseau.css";
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
  deleteSousReseau,
  getSousReseauxList,
  postSousReseauForm,
  updateSousReseau,
} from "./sousReseauSaga";
import Typography from "@mui/material/Typography";

const SousReseau = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [sousReseauToDelete, setSousReseauToDelete] = useState(null);
  const [sousReseauToEdit, setSousReseauToEdit] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSousReseauToEdit(null);
  };

  const dispatch = useDispatch();
  const { sousReseaux } = useSelector((state) => state.sousReseau);
  const [formData, setFormData] = useState({
    CIDRnotation: "",
    masqueSousReseau: "",
    ipRange: "",
    gateway: "",
    idReseau: "",
  });

  useEffect(() => {
    if (!sousReseaux) {
      dispatch(getSousReseauxList());
    }
  }, [sousReseaux, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSousReseauForm({ ...formData }));
    setFormData({
      CIDRnotation: "",
      masqueSousReseau: "",
      ipRange: "",
      gateway: "",
      idReseau: "",
    });
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenDeleteModal = (id) => {
    setSousReseauToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteSousReseau(sousReseauToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id) => {
    const sousReseau = sousReseaux.find((item) => item.id === id);
    if (sousReseau) {
      setSousReseauToEdit(sousReseau);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSousReseau = () => {
    dispatch(updateSousReseau(sousReseauToEdit));
    setIsEditModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "CIDRnotation", headerName: "CIDR Notation", width: 150 },
    { field: "masqueSousReseau", headerName: "Sous Reseau", width: 150 },
    { field: "ipRange", headerName: "IP Range", width: 150 },
    { field: "gateway", headerName: "Gateway", width: 150 },
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
            <Box className="modal-box-sous-reseau">
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
                    Are you sure you want to delete this Sous Reseau?
                  </Typography>
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
            <Box className="modal-box-sous-reseau">
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <h2>Edit Sous Reseau</h2>
                  <IconButton
                    onClick={handleCloseEditModal}
                    size="large"
                    color="inherit"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
                <CardContent>
                  <TextField
                    label="CIDR Notation"
                    id="CIDRnotation"
                    value={sousReseauToEdit?.CIDRnotation}
                    onChange={(event) =>
                      setSousReseauToEdit({
                        ...sousReseauToEdit,
                        CIDRnotation: event.target.value,
                      })
                    }
                    sx={{ m: 1, width: "35ch" }}
                  />
                  <TextField
                    label="Sous Reseau"
                    id="masqueSousReseau"
                    value={sousReseauToEdit?.masqueSousReseau}
                    onChange={(event) =>
                      setSousReseauToEdit({
                        ...sousReseauToEdit,
                        masqueSousReseau: event.target.value,
                      })
                    }
                    sx={{ m: 1, width: "35ch" }}
                  />
                  <TextField
                    label="IP Range"
                    id="ipRange"
                    value={sousReseauToEdit?.ipRange}
                    onChange={(event) =>
                      setSousReseauToEdit({
                        ...sousReseauToEdit,
                        ipRange: event.target.value,
                      })
                    }
                    sx={{ m: 1, width: "35ch" }}
                  />
                  <TextField
                    label="Gateway"
                    id="gateway"
                    value={sousReseauToEdit?.gateway}
                    onChange={(event) =>
                      setSousReseauToEdit({
                        ...sousReseauToEdit,
                        gateway: event.target.value,
                      })
                    }
                    sx={{ m: 1, width: "35ch" }}
                  />
                  <Button
                    onClick={handleEditSousReseau}
                    className="confirmer-button"
                    variant="contained"
                    color="success"
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
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </div>
      ),
    },
  ];

  return (
    <div>
   <Button
  onClick={handleOpen}
  className="add-button"
  variant="contained"
  color="primary"
>
  Add Sous Reseau
</Button>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box-sous-reseau">
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
                onClick={handleClose}
                size="large"
                color="inherit"
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <CardContent>
              <TextField
                label="CIDR Notation"
                id="CIDRnotation"
                value={formData.CIDRnotation}
                onChange={handleChange}
                sx={{ m: 1, width: "35ch" }}
              />
              <TextField
                label="Sous Reseau"
                id="masqueSousReseau"
                value={formData.masqueSousReseau}
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
                label="Gateway"
                id="gateway"
                value={formData.gateway}
                onChange={handleChange}
                sx={{ m: 1, width: "35ch" }}
              />
              <Button
                onClick={handleSubmit}
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
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Box sx={{ height: 400, width: "100%", mt: 2 }}>
        <DataGrid
          className="datagrid-style"
          rows={sousReseaux}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default SousReseau;
