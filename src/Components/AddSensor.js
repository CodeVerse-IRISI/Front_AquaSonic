import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography, TextField, Grid, IconButton,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddSensor = () => {
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

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/api/save', formData);
      console.log('Données envoyées avec succès:', response.data);
      // Vous pouvez ajouter une logique supplémentaire ici, comme la fermeture de la fenêtre modale après la soumission réussie
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleModal}>
        Ajouter un capteur
      </Button>
      <Modal open={showModal} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={toggleModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Ajouter un nouveau capteur
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nom de capteur"
                  name="sensor_id"
                  value={formData.sensor_id}
                  onChange={handleChange}
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Capteur Droite"
                  name="droite_id"
                  value={formData.droite_id}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Capteur Gauche"
                  name="gauche_id"
                  value={formData.gauche_id}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Envoyer
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddSensor;