import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography, TextField, Grid, IconButton, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Composant Parametrage pour la configuration de l'environnement.
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.showModal - Indique si le modal est visible.
 * @param {function} props.onClose - Fonction pour fermer le modal.
 */
const Parametrage = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState({
    depth: '',
    diameter: '',
    material: '',
    branched: '',
    looped: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.depth || !formData.diameter || !formData.material || (!formData.branched && !formData.looped)) {
      return "Tous les champs doivent être remplis.";
    }
    if (isNaN(formData.depth) || isNaN(formData.diameter)) {
      return "La profondeur et le diamètre doivent être des nombres.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8087/api/env/SaveEnvSetup', {
        depth: parseInt(formData.depth),
        diameter: parseInt(formData.diameter),
        material: formData.material,
        branched: formData.branched === 'branched',
        looped: formData.looped === 'looped',
      });
      console.log('Données envoyées avec succès:', response.data);
      setSuccessMessage('Données envoyées avec succès');
      setError('');
      setFormData({
        depth: '',
        diameter: '',
        material: '',
        branched: '',
        looped: '',
      });
      onClose();
    } catch (error) {
      setError('Erreur lors de l\'envoi des données: ' + error.message);
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
          Configuration de l'environnement
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Profondeur"
                name="depth"
                type="number"
                value={formData.depth}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Diamètre du tuyau"
                name="diameter"
                type="number"
                value={formData.diameter}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Matériau du tuyau"
                name="material"
                value={formData.material}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                name="branched"
                value={formData.branched}
                onChange={handleChange}
              >
                <FormControlLabel value="branched" control={<Radio />} label="Branché" />
                <FormControlLabel value="looped" control={<Radio />} label="Bouclé" />
              </RadioGroup>
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

export default Parametrage;
