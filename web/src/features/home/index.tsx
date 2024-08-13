import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container fixed sx={{ p: '2em' }}>
      <Box display="inline-block" textAlign="center">
        <Link to="/user" style={{ textDecoration: 'none' }}>
          <Card>
            <CardContent>
              <PeopleAltIcon sx={{ fontSize: '5em' }} />
              <Typography fontWeight="bold">User Management</Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
