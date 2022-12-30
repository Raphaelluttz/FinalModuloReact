import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/modules/UserSlice';
import NoteFormProps from '../types/NoteFormProps';

const NoteForm: React.FC<NoteFormProps> = ({ action }) => {
    const [description, setDescription] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [id, setId] = useState<number>(Math.floor(Date.now() / 1000));
    const userRedux = useAppSelector(selectUser);
    const userLogged = userRedux.find(item => item.logged);

    const handleClear = () => {
        setDescription('');
        setDetail('');
    };

    const handleSubmit = () => {
        if (description.length <= 3) {
            alert(`Assunto: "${description}" e invalido, minimo 4 caracteres.`);
        } else if (detail.length <= 3) {
            alert(`Conteudo: "${detail}" e invalido, minimo 4 caracteres.`);
        } else {
            alert('As notas foram adicionada com sucesso!');
            setId(Math.floor(Date.now() / 1000));
            action({ userName: userLogged?.userName as string, description, detail, id });
            handleClear();
        }
    };

    return (
        <Grid container alignItems={'center'} direction={'row'} marginTop={4} justifyContent={'center'}>
            <Grid item xs={6} sm={3} margin={3}>
                <TextField
                    inputProps={{ maxLength: 20 }}
                    id="outlined-basic"
                    onChange={ev => setDescription(ev.target.value)}
                    label="Assunto"
                    value={description || ''}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={6} sm={3} margin={3}>
                <TextField
                    inputProps={{ maxLength: 20 }}
                    id="outlined-basic"
                    onChange={ev => setDetail(ev.target.value)}
                    label="Conteudo"
                    value={detail || ''}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                    <Grid item>
                        <Button
                            sx={{
                                margin: '10px'
                            }}
                            color="error"
                            onClick={handleClear}
                            variant="outlined"
                        >
                            Limpar
                        </Button>
                        <Button color="success" onClick={handleSubmit} variant="contained">
                            Cadastrar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NoteForm;
