import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { User } from '../../types';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

interface IFormInput {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  birthDate: yup
    .string()
    .required('Birthdate is required')
    .test('birthDate', 'Birthdate is not valid', (value) =>
      moment(value).isValid()
    ),
  gender: yup.string().required('Gender is required'),
});

interface UserFormDialogProps {
  open: boolean;
  handleAction: (user?: User) => void;
}

const UserFormDialog = ({ open, handleAction }: UserFormDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  const handleFormSubmit = (formData: IFormInput) => {
    if (formData) {
      handleAction({
        ...formData,
        birthDate: moment(formData.birthDate).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      });
    }
  };

  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={() => handleAction()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                value={value}
                autoFocus
                required
                margin="dense"
                id="firstName"
                label="Firstname"
                name="firstName"
                type="text"
                fullWidth
                onChange={onChange}
                helperText={error?.message || '"*required'}
                error={!!error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                value={value}
                autoFocus
                required
                margin="dense"
                id="lastName"
                label="Lastname"
                name="lastName"
                type="text"
                fullWidth
                onChange={onChange}
                helperText={error?.message || '"*required'}
                error={!!error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <DatePicker
                name="birthDate"
                label="Birthdate"
                value={moment(value)}
                onChange={onChange}
                slots={{
                  textField: (textFieldProps) => (
                    <TextField
                      {...textFieldProps}
                      id="birthdate"
                      required
                      margin="dense"
                      fullWidth
                      helperText={error?.message || '"*required'}
                      error={!!error?.message}
                    />
                  ),
                }}
              />
            );
          }}
        />
        <FormControl margin="dense" error={!!errors.gender?.message}>
          <FormLabel id="gender-group-label">Gender</FormLabel>

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <RadioGroup
                  row
                  aria-labelledby="gender-group-label"
                  name="gender-radio-group"
                  onChange={onChange}
                  value={value}
                >
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              );
            }}
          />
          {errors.gender?.message && (
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAction()}>Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
