import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Delete, PhotoCamera } from '@material-ui/icons';
import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { renderField } from '../../operator/components/RenderField';
import { C_FIELD } from '../../../components';
export const RenderResourceItem = ({ resource, index, fields }) => {
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleCapture = ({ target }) => {
    debugger;
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setSelectedImage(e.target.result);
    };
  };
  return (
    <Card style={{ paddingBottom: 5, marginBottom: 15, }}>
      <CardContent>
        <Typography style={{ fontSize: 16, }}>
          Recurso #{index + 1}
        </Typography>
        <img width={100} src={selectedImage}></img>

        <Grid container direction={'row'}>
          <input
            hidden
            name={`${resource}.patch`}
            accept='image/*'
            id={'icon-button-photo' + index}
            onChange={handleCapture}
            type='file'
          />

          <label htmlFor={'icon-button-photo' + index}>
            <Button color='primary' component='span'>
              <PhotoCamera /> Agregar imagen
            </Button>
          </label>
          <C_FIELD name={`${resource}.description`} label='Descripcion' />
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          type='button'
          title='Remover Recurso'
          onClick={() => fields.remove(index)}
          size='small'
        >
          <Delete /> Eliminar Recurso
        </Button>
      </CardActions>
    </Card>
  );
};
