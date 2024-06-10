import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Song from '../models/Song';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ReactAudioPlayer from 'react-audio-player';
import { useState } from 'react';
import SongsService from '../services/SongsService';
import { usePub } from '../hooks/pubSubHook';

interface Props {
  songs: Song[];
}

export const SongList = ({ songs }: Props) => {
  const publish = usePub();
  const [songIdToDelete, setSongIdToDelete] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickOpenDeleteAlert = (id: number) => {
    setSongIdToDelete(id);
  };

  const handleCloseDeleteAlert = () => {
    setSongIdToDelete(0);
  };

  const handleDeleteSong = async () => {
    handleCloseDeleteAlert();
    if (!songIdToDelete) return;

    setIsDeleting(true);
    try {
      await new SongsService().deleteById(songIdToDelete);
      publish('song:deleted', songIdToDelete);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getSelectedSong = (id: number) => {
    return songs.find((song) => song.id === id);
  };

  return (
    <Box>
      <Typography variant="h3">Canciones</Typography>
      <List>
        <Stack gap="16px">
          {songs.map((song) => (
            <Stack key={song.id}>
              <ListItem
                secondaryAction={
                  <Button
                    onClick={() => handleClickOpenDeleteAlert(song.id)}
                    disabled={isDeleting && songIdToDelete === song.id}
                  >
                    Borrar
                  </Button>
                }
              >
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText
                  primary={song.title}
                  secondary={song.album}
                />
              </ListItem>
              {isDeleting && songIdToDelete === song.id ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={'center'}
                  gap={'8px'}
                >
                  <Typography variant="body1">Borrando canción..</Typography>
                  <CircularProgress />
                </Stack>
              ) : (
                <ReactAudioPlayer
                  src={song.cloudinarySecureUrl}
                  autoPlay={false}
                  controls
                  style={{ width: '100%' }}
                />
              )}
              <Divider sx={{ mt: '16px' }} />
            </Stack>
          ))}
        </Stack>
      </List>

      <Dialog
        open={Boolean(songIdToDelete)}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`¿Borrar esta canción?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {getSelectedSong(songIdToDelete)?.title} -{' '}
            {getSelectedSong(songIdToDelete)?.album}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAlert}>Cancelar</Button>
          <Button
            onClick={handleDeleteSong}
            variant="contained"
            color="error"
            autoFocus
          >
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
