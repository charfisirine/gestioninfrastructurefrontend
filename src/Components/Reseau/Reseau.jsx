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
import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { getsitesList } from "../Site/siteSaga";
import { getSousReseauxList } from "../SousReseau/sousReseauSaga";

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
  const { sites } = useSelector((state) => state.site);
  const { sousReseaux } = useSelector((state) => state.sousReseau);
  const [formData, setFormData] = useState({
    name: "",
    ipRange: "",
    typeReseau: "",
    site: {},
    sousReseaux: [],
  });

  useEffect(() => {
    if (!sites) {
      dispatch(getsitesList());
    }
  }, [sites, dispatch]);

  useEffect(() => {
    if (!sousReseaux) {
      dispatch(getSousReseauxList());
    }
  }, [sousReseaux, dispatch]);

  useEffect(() => {
    if (!reseaux) {
      dispatch(getReseauxList());
    }
  }, [reseaux, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReseauForm({ ...formData }));
    setFormData({
      name: "",
      ipRange: "",
      typeReseau: "",
      site: "",
      sousReseaux: [],
    });
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
  console.log({ reseauToEdit });
  console.log({ rr: reseauToEdit?.site?.designation });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "ipRange", headerName: "IP Range", width: 150 },
    { field: "typeReseau", headerName: "Type", width: 150 },
    {
      field: "site",
      headerName: "Site Name",
      width: 150,
      renderCell: (params) => <div>{params.row?.site?.designation}</div>,
    },
    {
      field: "subnet",
      headerName: "Subnets",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.row?.sousReseaux
            .map((item) => `${item.cidrnotation}`)
            .join(", ")}
        </div>
      ),
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
                  <Typography>
                    Are you sure you want to delete this Reseau?
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
                    <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                      <InputLabel id="edit-site-select">Site</InputLabel>
                      <Select
                        labelId="edit-site-select"
                        id="site"
                        value={reseauToEdit?.site?.id}
                        renderValue={(selected) => {
                          if (selected) return reseauToEdit?.site?.designation;
                        }}
                        label="Site"
                        placeholder="Site"
                        onChange={(event) =>
                          setReseauToEdit({
                            ...reseauToEdit,
                            site: event.target.value,
                          })
                        }
                      >
                        {sites?.map((site) => (
                          <MenuItem key={site.id} value={site}>
                            <em>{site.designation}</em>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "72ch" }}>
                      <InputLabel id="subnet-multiple-select">
                        Subnet
                      </InputLabel>
                      <Select
                        labelId="subnet-multiple-select"
                        id="subnet-select"
                        multiple
                        value={reseauToEdit?.sousReseaux}
                        onChange={(event) =>
                          setReseauToEdit({
                            ...reseauToEdit,
                            sousReseaux: event.target.value,
                          })
                        }
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Subnet"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip
                                key={value.idSousReseau}
                                label={value.cidrnotation}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {sousReseaux?.map((item) => (
                          <MenuItem key={item.idSousReseau} value={item}>
                            <Checkbox
                              checked={reseauToEdit?.sousReseaux.some(
                                (elt) => elt.idSousReseau === item.idSousReseau
                              )}
                            />
                            <ListItemText primary={item.cidrnotation} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="custom-Category-box"
    >
      <Card variant="outlined" className="custom-Category-card">
        <Box
          sx={{
            padding: "2CH",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "2CH",
            }}
          >
            <h2 className="h2-style">Reseau</h2>

            <Button
              variant="contained"
              className="add-button"
              onClick={handleOpen}
            >
              Add Reseau
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
                  <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
                    <InputLabel id="create-site-select">Site</InputLabel>
                    <Select
                      labelId="create-site-select"
                      id="site"
                      value={formData.site?.id}
                      label="Site"
                      placeholder="Site"
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          site: event.target.value,
                        });
                      }}
                    >
                      {sites?.map((site) => (
                        <MenuItem key={site.id} value={site}>
                          <em>{site.designation}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "72ch" }}>
                    <InputLabel id="create-subnet-multiple-select">
                      Subnet
                    </InputLabel>
                    <Select
                      labelId="create-subnet-multiple-select"
                      id="subnet-select"
                      multiple
                      value={formData.sousReseaux}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          sousReseaux: event.target.value,
                        });
                      }}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Subnet"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip
                              key={value.idSousReseau}
                              label={value.cidrnotation}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {sousReseaux?.map((item) => (
                        <MenuItem key={item.idSousReseau} value={item}>
                          <Checkbox
                            checked={formData.sousReseaux.some(
                              (elt) => elt.idSousReseau === item.idSousReseau
                            )}
                          />
                          <ListItemText primary={item.cidrnotation} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
        </Box>
      </Card>
    </Box>
  );
};

export default Reseau;
