import { useEffect, useState } from 'react';
import Artist from '../models/Artist';
import ArtistsService from '../services/ArtitstService';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSub } from '../hooks/pubSubHook';

export const ArtistList = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  useSub('artist:created', (data: Artist) => {
    // setArtists([...artists, data]);
    console.log(data);
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await new ArtistsService().getAll();
      if (response.status === 200) {
        setArtists(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack gap="16px">
      {artists.map((artist) => (
        <Card
          key={artist.id}
          elevation={3}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {artist.name}
            </Typography>
            <Typography variant="body2">{artist.bio}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/artists/${artist.id}`}>
              <Button size="small">Ver más</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};
