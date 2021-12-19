import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
DialogTitle, TextField } from '@mui/material';
import SelectComp from './SelectComp';

export default function MiniDiag(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  React.useEffect(() => {
    if (props.imgBuffer && props.nivel != '' && props.jrv != '') {
        setButtonDisabled(false);
    }
  }, [props.imgBuffer, props.nivel, props.jrv])

  const handleClose = () => {
    props.setImgBuffer(null);
    props.setJrv('');
    props.setNivel('');
    props.setDiagOpen(false);
  };

  return (
    <>
      <Dialog
        maxWidth={'sm'}
        fullWidth={true}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Subir Acta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Elija la imagen del acta que desea cargar
          </DialogContentText>
          <form noValidate>
            <div>
                <input
                    type="file"
                    onChange={(e) => props.handleImage(e)}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file" />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="success" component="span" >
                        Seleccionar Imagen
                    </Button>
                </label>
            </div>
            <div style={{marginTop: '15px'}} >
               <TextField value={props.jrv} color='secondary'
                onChange={(e) => props.setJrv(e.target.value)} label={'JRV'} />   
            </div>
            <div style={{marginTop: '15px'}} >
                <SelectComp options={props.options} option={props.nivel} mainLabel='Nivel'
                setOption={props.setNivel} color={'black'}/>
            </div>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onImgSubmit()} disabled={buttonDisabled} >
            Cargar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
