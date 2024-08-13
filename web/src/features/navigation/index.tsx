import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const links = [
    { text: 'Home', link: '/' },
    ...paths.map((path, index) => {
      const pathLowerCase = path.toLowerCase();
      return {
        text: `${pathLowerCase.charAt(0).toUpperCase()}${pathLowerCase.slice(
          1
        )}`,
        link: `/${paths.slice(0, index + 1).join('/')}`,
      };
    }),
  ];
  return (
    <Box padding={theme.spacing(2)} marginX={theme.spacing(1)}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link, index) => {
          const isLastItem = index === links.length - 1;
          return (
            <Box key={link.link}>
              {isLastItem ? (
                <Typography fontWeight="bold">{link.text}</Typography>
              ) : (
                <Link underline="hover" color="inherit" href={link.link}>
                  {link.text}
                </Link>
              )}
            </Box>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Navigation;
