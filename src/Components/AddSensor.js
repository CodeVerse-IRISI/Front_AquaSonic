import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography, TextField, Grid, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Composant AddSensor pour ajouter un nouveau capteur.
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.showModal - Indique si le modal est visible.
 * @param {function} props.onClose - Fonction pour fermer le modal.
 */
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

  const [xValue, setXValue] = useState(0); // Variable d'état pour stocker la valeur de x
  const [sensors, setSensors] = useState([]); // Variable d'état pour stocker les capteurs existants
  const [matchingSensorsDroite, setMatchingSensorsDroite] = useState([]); // Variable d'état pour stocker les capteurs correspondant à droite
  const [matchingSensorsGauche, setMatchingSensorsGauche] = useState([]); // Variable d'état pour stocker les capteurs correspondant à gauche

  useEffect(() => {
    // Appel à l'API pour obtenir les capteurs existants
    const fetchSensors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8087/api/capteurs');
        setSensors(response.data); // Supposons que l'API renvoie un tableau d'objets capteurs
      } catch (error) {
        console.error('Erreur lors de la récupération des capteurs:', error);
      }
    };

    fetchSensors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'x') {
      const xVal = parseFloat(value);
      setXValue(xVal); // Mettre à jour la valeur de x dans l'état local


      // Filtrer les capteurs dont la coordonnée x est supérieure à la valeur x saisie
      const matchingDroite = sensors.filter(sensor => sensor.x > xVal);
      setMatchingSensorsDroite(matchingDroite);

      // Filtrer les capteurs dont la coordonnée x est inférieure à la valeur x saisie
      const matchingGauche = sensors.filter(sensor => sensor.x < xVal);
      setMatchingSensorsGauche(matchingGauche);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8087/api/SaveInfoSensor', formData);
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>Capteur Droite</InputLabel>
                <Select
                  name="droite_id"
                  value={formData.droite_id}
                  onChange={handleChange}
                  label="Capteur Droite"
                >
                  {matchingSensorsDroite.map(sensor => (
                    <MenuItem key={sensor.sensor_id} value={sensor.sensor_id}>
                      {sensor.sensor_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Capteur Gauche</InputLabel>
                <Select
                  name="gauche_id"
                  value={formData.gauche_id}
                  onChange={handleChange}
                  label="Capteur Gauche"
                >
                  {matchingSensorsGauche.map(sensor => (
                    <MenuItem key={sensor.sensor_id} value={sensor.sensor_id}>
                      {sensor.sensor_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
