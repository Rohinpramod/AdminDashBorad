import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { axiosInstance } from "../../config/axiosInstance";

const EditRestaurant = () => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const  data  = location?.state?.data;
  const isEdit = Boolean(data); // Check if it's an edit operation
console.log("dataaa",data);
  const [formData, setFormData] = useState({
    name: data?.name || "",
    cuisine: data?.cuisine || "",
    status: data?.status || "open",
    image: data?.image || "",
    contact: {
      phone: data?.contact?.phone || "",
      email: data?.contact?.email || "",
    },
  });

  



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isEdit
        ? `/restaurant/${data._id}`
        : `/restaurant`; 

      const method = isEdit ? "PATCH" : "POST";
      const response = await axiosInstance.request({
        method,
        url: endpoint,
        data: formData,
      });
      console.log(response);
      navigate("/allrestaurants");
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
  <Grid item xs={12} sm={8} md={6} lg={4}>
    <Box
      sx={{
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {isEdit ? "Edit Restaurant" : "Add New Restaurant"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            label="Restaurant Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            label="Cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </TextField>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button
            variant="contained"
            component="label"
            sx={{ textAlign: "left" }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (upload) => {
                    handleChange({
                      target: {
                        name: "image",
                        value: upload.target.result,
                      },
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Button>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            label="Phone"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            label="Email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Box mt={3} textAlign="center">
          <Button variant="contained" type="submit" color="primary">
            {isEdit ? "Update Restaurant" : "Add Restaurant"}
          </Button>
        </Box>
      </form>
    </Box>
  </Grid>
</Grid>
  );
};

export default EditRestaurant;
