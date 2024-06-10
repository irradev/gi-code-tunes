import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import UsersService from '../services/UsersService';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../services/_utils';

interface FormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await new UsersService().login(data);
      saveToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginBottom: '10px' }}>
            <FormLabel htmlFor="name">Email</FormLabel>
            <TextField
              {...register('email')}
              id="email"
              placeholder="Email"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
          <FormControl sx={{ marginBottom: '10px' }}>
            <FormLabel htmlFor="name">Password</FormLabel>
            <TextField
              {...register('password')}
              type="password"
              id="password"
              placeholder="Password"
              fullWidth
              size="small"
              margin="dense"
            />
          </FormControl>
        </Stack>
        <Button
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
