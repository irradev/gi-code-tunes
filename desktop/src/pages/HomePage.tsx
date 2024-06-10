import { Grid } from '@mui/material';
import { ArtistList } from '../components/ArtistList';
import { NewArtitst } from '../components/NewArtitst';

export const HomePage = () => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={6}
      >
        <h2>Artist List</h2>
        <ArtistList />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <NewArtitst />
      </Grid>
    </Grid>
  );
};
