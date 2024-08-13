import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  handleAction: (confirm: Boolean) => void;
  title?: string;
  text?: string;
  cancelButtonText?: string;
  okButtonText?: string;
}

const ConfirmDialog = ({
  open,
  handleAction,
  title,
  text = 'Please confirm',
  cancelButtonText = 'Cancel',
  okButtonText = 'Ok',
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleAction(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction(false)}>{cancelButtonText}</Button>
        <Button onClick={() => handleAction(true)} autoFocus>
          {okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
