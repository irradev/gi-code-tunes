import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import SongsService from '../services/SongsService';
import { useState } from 'react';
import { usePub } from '../hooks/pubSubHook';

interface Props {
  artistId: number;
}

interface FormInputs {
  title: string;
  album: string;
  genre: string;
  releaseDate: string;
  song: FileList;
  coverImg: 'none';
}
export const NewSong = ({ artistId }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const publish = usePub();

  const [isUploadingSong, setIsUploadingSong] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    setIsUploadingSong(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('album', data.album);
    formData.append('genre', data.genre);
    formData.append('releaseDate', data.releaseDate);
    formData.append('song', data.song[0]);
    formData.append('coverImg', 'none');
    formData.append('artistId', artistId.toString());

    try {
      await new SongsService().create(formData);
      reset();
      setIsUploadingSong(false);
      publish('song:created', true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Nueva canción</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          gap="16px"
          sx={{ mt: '24px' }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <TextField
              {...register('title')}
              id="title"
              placeholder="Title"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="album">Album</FormLabel>
            <TextField
              {...register('album')}
              id="album"
              placeholder="Album"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="genre">Genre</FormLabel>
            <TextField
              {...register('genre')}
              id="genre"
              placeholder="Genre"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
            <TextField
              {...register('releaseDate')}
              id="releaseDate"
              placeholder="Release Date"
              fullWidth
              size="small"
              margin="dense"
              type="date"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="song">Song</FormLabel>
            <TextField
              {...register('song')}
              id="song"
              placeholder="Song"
              fullWidth
              size="small"
              margin="dense"
              type="file"
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          disabled={isUploadingSong}
          sx={{ mt: '24px' }}
        >
          Submit {isUploadingSong ? <CircularProgress size={24} /> : ''}
        </Button>
      </form>
    </Box>
  );
};
