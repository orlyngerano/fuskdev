import { Alert, Box, Button, Container, Snackbar, Stack } from '@mui/material';
import {
  DataGrid,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridColDef,
  GridRowModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridToolbarContainer,
  MuiEvent,
} from '@mui/x-data-grid';
import ConfirmDialog from '../../components/ConfirmDialog';
import UserFormDialog from './UserFormDialog';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../api';
import { Gender, User } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ToolbarProps {
  isDeleteVisible: boolean;
  onDeleteClicked: () => void;
  onCreateClicked: () => void;
}

const Toolbar = ({
  isDeleteVisible,
  onDeleteClicked,
  onCreateClicked,
}: ToolbarProps) => (
  <GridToolbarContainer>
    {isDeleteVisible && (
      <Button
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDeleteClicked}
      >
        Delete
      </Button>
    )}
    <Box sx={{ flexGrow: 1 }} />
    <Button startIcon={<AddIcon />} onClick={onCreateClicked}>
      Create
    </Button>
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'Firstname',
    flex: 1,
    editable: true,
    type: 'string',
    cellClassName: 'Edit-cell',
  },
  {
    field: 'lastName',
    headerName: 'Lastmame',
    flex: 1,
    editable: true,
    type: 'string',
    cellClassName: 'Edit-cell',
  },
  {
    field: 'birthDate',
    headerName: 'Birthdate',
    editable: true,
    type: 'date',
    cellClassName: 'Edit-cell',
  },
  {
    field: 'gender',
    headerName: 'Gender',
    editable: true,
    type: 'singleSelect',
    valueOptions: Object.keys(Gender),
    cellClassName: 'Edit-cell',
  },
];

const Users = () => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [isConfirmVisible, showConfirm] = useState(false);
  const [isFormVisible, showForm] = useState(false);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isNotifyVisible, showNotify] = useState(false);
  const [notifyConfig, setNotifyConfig] = useState({
    isSuccess: true,
    message: '',
  });

  const getUser = useQuery({
    queryKey: ['Users'],
    queryFn: api.getUsers,
  });

  const deleteUser = useMutation({
    mutationFn: (id: string | number) => api.deleteUser(id),
  });

  const createUser = useMutation({
    mutationFn: (data: User) => api.createUser(data),
  });

  useEffect(() => {
    if (getUser.isSuccess) {
      setRows(
        getUser.data?.map((record) => ({
          id: record.id,
          firstName: record.firstName,
          lastName: record.lastName,
          birthDate: new Date(record.birthDate),
          gender: record.gender,
        })) || []
      );
    }
  }, [getUser.data, getUser.isSuccess]);

  useEffect(() => {
    if (deleteUser.isSuccess) {
      getUser.refetch();
      setNotifyConfig({
        isSuccess: true,
        message: 'Successfully deleted User',
      });
      showNotify(true);
    }
    if (deleteUser.isError) {
      setNotifyConfig({ isSuccess: false, message: 'Failed delete User' });
      showNotify(true);
    }
  }, [deleteUser.isSuccess, deleteUser.isError]);

  useEffect(() => {
    if (createUser.isSuccess) {
      getUser.refetch();
      setNotifyConfig({
        isSuccess: true,
        message: 'Successfully created User',
      });
      showNotify(true);
    }
    if (createUser.isError) {
      setNotifyConfig({ isSuccess: false, message: 'Failed create User' });
      showNotify(true);
    }
  }, [createUser.isSuccess, createUser.isError]);

  const showDelete = selectionModel.length > 0;
  return (
    <>
      <Container fixed sx={{ p: '2em' }}>
        <DataGrid
          slots={{
            toolbar: () => (
              <Toolbar
                isDeleteVisible={showDelete}
                onDeleteClicked={() => showConfirm(true)}
                onCreateClicked={() => showForm(true)}
              />
            ),
          }}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          checkboxSelection
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          hideFooter
          processRowUpdate={async (
            newRow: GridRowModel,
            oldRow: GridRowModel
          ) => {
            const ok = await api.updateUser(newRow.id, newRow as User);
            setNotifyConfig({
              isSuccess: true,
              message: 'Successfully update User',
            });
            showNotify(true);
            return newRow;
          }}
          onProcessRowUpdateError={(error) => {
            setNotifyConfig({
              isSuccess: false,
              message: 'Failed update User',
            });
            showNotify(true);
          }}
        />
      </Container>
      <ConfirmDialog
        text="Delete user. Are you sure?"
        open={isConfirmVisible}
        handleAction={(confirm) => {
          if (confirm) {
            if (selectionModel.length) {
              selectionModel.forEach((model) => {
                deleteUser.mutate(model);
              });
            }
          }
          showConfirm(false);
        }}
      />
      <UserFormDialog
        open={isFormVisible}
        handleAction={(user) => {
          if (user) {
            createUser.mutate(user);
          }
          showForm(false);
        }}
      />
      <Snackbar
        open={isNotifyVisible}
        autoHideDuration={2000}
        onClose={() => {
          showNotify(false);
        }}
      >
        <Alert
          severity={notifyConfig.isSuccess ? 'success' : 'error'}
          variant="outlined"
          sx={{ width: '100%' }}
        >
          {notifyConfig.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Users;
