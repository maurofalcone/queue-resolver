import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Warning = ({onClose, show, text, type}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (show) {
      setOpen(true);
    }
  }, [show]);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };
  if (text && type) {
    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type}>
            {text}
          </Alert>
        </Snackbar>
      </div>
    );
  }
  return null;
}

export default Warning;