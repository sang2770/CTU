import * as React from 'react';
import { IconX } from '@tabler/icons-react';
import { Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogProps {
  title: string,
  open: boolean,
  handleOpen: (e) => void,
  body: any,
  actions?: any
}
export default function CustomizedDialogs({ title, open, handleOpen, body,actions }: DialogProps) {

  return (
    <React.Fragment>
      <BootstrapDialog
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IconX />
        </IconButton>
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
