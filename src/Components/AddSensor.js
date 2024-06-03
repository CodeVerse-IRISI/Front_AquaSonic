import React, { useState } from 'react';
import axios from 'axios';
import {Button,Modal,Box,Typography,TextField,Grid,IconButton,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddSensor = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState({
    sensor_id: '',
    x: 0,
    y: 0,
    droite_id: '',
    gauche_id: '',
    dateLastFuite: '',
    nb_fuite: 0,
    nb_reparation: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/api/save', formData);
      console.log('Données envoyées avec succès:', response.data);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  return (
    <Modal open={showModal} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#F0F0F0',
          boxShadow: 3,
          p: 4,
          borderRadius: 1,
          width: '600px',
          maxWidth: '90%',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2" color={'#317AC1'} gutterBottom marginLeft={'20%'}>
          Ajouter un nouveau capteur
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nom du capteur"
                name="sensor_id"
                value={formData.sensor_id}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Position X"
                name="x"
                type="number"
                value={formData.x}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Position Y"
                name="y"
                type="number"
                value={formData.y}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Capteur Droite"
                name="droite_id"
                value={formData.droite_id}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Capteur Gauche"
                name="gauche_id"
                value={formData.gauche_id}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Envoyer
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddSensor;