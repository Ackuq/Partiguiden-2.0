import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // Vote results
    vote: {
      display: 'flex',
      '& .box': {
        padding: '0.25rem',
      },
    },
    parties: {
      display: 'flex',
      justifyContent: 'center',
      '& h6': {
        padding: '0.25rem',
      },
      '& img': {
        height: '30px',
      },
    },

    // Vote card
    titel: {
      marginBottom: '2rem',
      transition: 'color 0.3s ease-in-out',
      '&:hover': {
        color: '#34495e',
      },
    },
    title: {
      fontSize: '1.125rem',
      lineHeight: 1.3,
      color: theme.palette.primary.dark,
    },
    subtitle: {
      fontSize: '1rem',
      lineHeight: 1.25,
    },
    headerTitle: {
      fontSize: '1.15rem',
      color: '#ffffff',
    },
    headerRoot: {
      width: '100%',
      textAlign: 'left',
      padding: '0.25rem 1rem',
    },
  });

export default makeStyles(styles);