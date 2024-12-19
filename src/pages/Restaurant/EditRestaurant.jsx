import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";

const EditRestaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const isEdit = Boolean(data);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call logic
    console.log(formData);
    navigate("/restaurants");
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 "
        >
          <FormControl margin="normal">
            <TextField
              size="small"
              label="Restaurant Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              size="small"
              label="Cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              size="small"
              name="status"
              select
              label="Status"
              value={formData.status}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </TextField>
            
          </FormControl>
          <FormControl margin="normal">
            <div className="mt-2">
              <Button size="small" variant="contained" type="submit">
                {isEdit ? "Update" : "Add Restaurant"}
              </Button>
            </div>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditRestaurant;
