import { useQuery, gql, useMutation } from '@apollo/client';
import { Alert, Box, Button, Container, Snackbar } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Gender, User } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UserFormDialog from './UserFormDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import moment from 'moment';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      birthDate
      gender
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $birthDate: String!
    $gender: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      birthDate: $birthDate
      gender: $gender
    ) {
      id
      firstName
      lastName
      birthDate
      gender
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [String]!) {
    deleteUsersById(ids: $ids) {
      id
      firstName
      lastName
      birthDate
      gender
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $birthDate: String!
    $gender: String!
  ) {
    updateUserById(
      id: $id
      firstName: $firstName
      lastName: $lastName
      birthDate: $birthDate
      gender: $gender
    ) {
      id
      firstName
      lastName
      birthDate
      gender
    }
  }
`;

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
  const [isConfirmVisible, showConfirm] = useState(false);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isFormVisible, showForm] = useState(false);

  const usersGetSvc = useQuery(GET_USERS);
  const [userAdd, userAddSvc] = useMutation(ADD_USER);
  const [userUpdate, userUpdateSvc] = useMutation(UPDATE_USER);
  const [deleteUsers, deleteUsersSvc] = useMutation(DELETE_USERS);
  const [isNotifyVisible, showNotify] = useState(false);
  const [notifyConfig, setNotifyConfig] = useState({
    isSuccess: true,
    message: '',
  });

  // Update User
  useEffect(() => {
    if (
      userUpdateSvc.called &&
      !userUpdateSvc.loading &&
      !userUpdateSvc.error
    ) {
      setNotifyConfig({
        isSuccess: true,
        message: 'Successfully updated User',
      });
      showNotify(true);
      userUpdateSvc.reset();
    }
  }, [userUpdateSvc.called, userUpdateSvc.loading, userUpdateSvc.error]);

  // delete User and reload getting Users
  useEffect(() => {
    if (
      deleteUsersSvc.called &&
      !deleteUsersSvc.loading &&
      !deleteUsersSvc.error
    ) {
      setNotifyConfig({
        isSuccess: true,
        message: 'Successfully deleted Users',
      });
      showNotify(true);
      usersGetSvc.refetch();
      deleteUsersSvc.reset();
    }
  }, [deleteUsersSvc.called, deleteUsersSvc.loading, deleteUsersSvc.error]);

  // Add User and reload getting Users
  useEffect(() => {
    if (userAddSvc.called && !userAddSvc.loading && !userAddSvc.error) {
      setNotifyConfig({
        isSuccess: true,
        message: 'Successfully added User',
      });
      showNotify(true);
      usersGetSvc.refetch();
      userAddSvc.reset();
    }
  }, [userAddSvc.called, userAddSvc.loading, userAddSvc.error]);

  // Get Users
  useEffect(() => {
    setRows(
      usersGetSvc.data?.users?.map((record: User) => ({
        id: record.id,
        firstName: record.firstName,
        lastName: record.lastName,
        birthDate: new Date(record.birthDate),
        gender: record.gender,
      })) || []
    );
  }, [usersGetSvc.data?.users]);

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
            const updateRow = {
              ...newRow,
              birthDate: moment(newRow.birthDate).format('YYYY-MM-DDTHH:mm:ss'),
            };
            userUpdate({ variables: updateRow });
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
          if (confirm && selectionModel.length) {
            deleteUsers({ variables: { ids: selectionModel } });
          }
          showConfirm(false);
        }}
      />
      <UserFormDialog
        open={isFormVisible}
        handleAction={(user) => {
          if (user) {
            userAdd({ variables: user });
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
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notifyConfig.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Users;
