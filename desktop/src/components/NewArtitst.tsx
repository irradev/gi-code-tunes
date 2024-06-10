import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ArtistsService from '../services/ArtitstService';
import { usePub } from '../hooks/pubSubHook';

interface FormInputs {
  name: string;
  bio: string;
  genre: string;
  coverImg: string;
}

export const NewArtitst = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const publish = usePub();

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await new ArtistsService().create(data);
      if (response.status === 200) {
        publish('artist:created', response.data);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <h2>New Artist</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginBottom: '10px' }}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              {...register('name')}
              id="name"
              placeholder="Name"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>

          <FormControl sx={{ marginBottom: '10px' }}>
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <TextField
              {...register('bio')}
              id="bio"
              placeholder="Bio"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>

          <FormControl sx={{ marginBottom: '10px' }}>
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

          <FormControl sx={{ marginBottom: '10px' }}>
            <FormLabel htmlFor="coverImg">Cover Img</FormLabel>
            <TextField
              {...register('coverImg')}
              id="coverImg"
              placeholder="Cover Img"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
