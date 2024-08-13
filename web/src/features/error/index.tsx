import { Alert, Box, Container, Stack, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const ErrorPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack direction="row" spacing=".5em">
        <AccountBalanceIcon fontSize="large" />
        <Typography variant="h4">Sorry the page is unavailable.</Typography>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
