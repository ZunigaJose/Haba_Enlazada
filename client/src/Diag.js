import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import SelectComp from './SelectComp';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Diag(props) {
    const [jrv, setJrv] = React.useState('');
    const [nivel, setNivel] = React.useState('');
    const [displayImg, setDisplayImg] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    

    const handleClose = () => {
        setJrv('');
        setNivel('');
        setDisplayImg(false);
        props.setOpen(false);
    };

    const url = 'https://ipfs.io/ipfs/';
    function handleSearch() {
        if (nivel == '' && jrv == '') {
            if (displayImg) {
                setDisplayImg(false);
            }
            return;
        }
        props.contractInstance.get(jrv, nivel, function (err, result) {
            if (err) {
                console.log('Error: ', err);
                return;
            }
            console.log(result)
            setResponse(result);
        });
    }

    React.useEffect(()=> {
        if(response) {
            setDisplayImg(true);
        }
    }, [response]);

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Buscar Acta
                    </Typography>
                    {props.type == 'upload' &&
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"/>
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="success" component="span">
                                    Seleccionar Imagen
                                </Button>
                            </label>
                        </div>}
                    <TextField sx={{ input: { color: 'white' } }} value={jrv} color='secondary'
                        onChange={(e) => setJrv(e.target.value)} label={'JRV'} size='small' />
                    <SelectComp options={props.options} option={nivel} mainLabel='Nivel'
                        setOption={setNivel} color={'white'}/>
                    <Button autoFocus color="inherit" onClick={handleSearch}>
                        Buscar
                    </Button>
                </Toolbar>
            </AppBar>
            {displayImg ? <img src={url + response.ipfsHash} alt='' /> :
                <h1>Aqui se mostrará la imagen</h1>
            }
            {displayImg && response.sender != '0x0000000000000000000000000000000000000000' ?
            <div>
                <TextField sx={{minWidth: 450}} contentEditable={false} label={'Sender'} value={response.sender}/>
                <TextField sx={{minWidth: 500}} contentEditable={false} label={'Fecha'} value={new Date(response.date * 1000)}/>
            </div> :
            displayImg && <h1>No se encontró el acta para la JRV y Nivel indicados</h1>}
        </Dialog>
    );
}