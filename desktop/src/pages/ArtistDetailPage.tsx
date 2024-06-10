import { useEffect, useState } from 'react';
import Artist from '../models/Artist';
import { useParams } from 'react-router-dom';
import ArtistsService from '../services/ArtitstService';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { SongList } from '../components/SongList';
import { NewSong } from '../components/NewSong';
import { useSub } from '../hooks/pubSubHook';

export const ArtistDetailPage = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [deletedSongIds, setDeletedSongIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (!params.artistId) return;

      const response = await new ArtistsService().getById(params.artistId);
      if (response.status === 200) {
        setArtist(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, [params.artistId]);

  // Event Subscriptions
  useSub('song:created', fetchData);
  useSub('song:deleted', (songId: number) =>
    setDeletedSongIds([...deletedSongIds, songId])
  );

  if (isLoading) {
    return (
      <Stack gap={'16px'}>
        <CircularProgress />
        <Typography variant="h3">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      {artist ? (
        <>
          <Stack gap="4px">
            <Typography variant="h2">{artist?.name}</Typography>
            <Typography paragraph={true}>Género: {artist?.genre}</Typography>
            <Divider sx={{ margin: '40px 0' }} />
            <Typography paragraph={true}>{artist?.bio}</Typography>
          </Stack>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <SongList
                songs={artist.songs.filter(
                  (song) => !deletedSongIds.includes(song.id)
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <NewSong artistId={artist.id} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h3">Artist not found</Typography>
      )}
    </Box>
  );
};
