// src/pages/UserManagementPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button  from '../components/Button/Button';
import Input  from '../components/Input/Input';


interface User {
  id: number;
  name: string;
  location: string;
  zone: string;
  phone: string;
  role: 'admin' | 'voluntary';
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí deberías hacer la llamada al backend para obtener los usuarios
    // Por ahora usaremos datos de ejemplo
    setUsers([
      { id: 1, name: 'Laura Sánchez', location: 'Sevilla', zone: 'Centro', phone: '600111222', role: 'voluntary' },
      { id: 2, name: 'Carmen Pérez', location: 'Dos Hermanas', zone: 'Norte', phone: '655888999', role: 'voluntary' },
      { id: 3, name: 'Admin Maite', location: 'Sevilla', zone: 'Todos', phone: '644555666', role: 'admin' },
    ]);
  }, []);

  const promoteUser = (id: number) => {
    // Lógica para promover al usuario a admin
    console.log(`Promover usuario con ID ${id}`);
  };

  //No se si la ruta esta bien
  const editUser = (id: number) => {
    navigate(`userManagement/${id}editar`);
  };


  const deleteUser = (id: number) => {
    // Lógica para eliminar usuario
    console.log(`Eliminar usuario con ID ${id}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito ">
      <h1 className="text-4xl font-bold font-poppins text-center mb-6 flex items-center justify-center gap-4">
        <img src="/assets/icons/user-management.svg" alt="Gestion usuarios" className="w-14 h-14" />
        Gestion de usuarios
      </h1>
      <div className="mb-4 flex justify-between items-center ">
        <div className="max-w-sm w-full">
          <Input
            label="Search"
            name=''
            placeholder="Search user by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button label="+ Add Volunteer" onClick={() => console.log('Añadir usuario')} variant="tertiary" />
      </div>

      <table className="w-full bg-white rounded-xl shadow-md p-6 text-purple-900">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Zone</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.location}</td>
              <td className="p-3">{user.zone}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3 space-x-2">
                    <div className="flex gap-1 items-center">
                    <button onClick={() => editUser(user.id)} className="w-8 h-8 flex items-center justify-center rounded-full  bg-purple-600 hover:bg-purple-700 text-white">
                        <img src="/assets/icons/edit.svg" alt="Edit" className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white">
                        <img src="/assets/icons/trash.svg" alt="Delete" className="w-4 h-4" />
                    </button>
                    {user.role !== 'admin' && (
                        <button onClick={() => promoteUser(user.id)} className="w-8 h-8 flex items-center justify-center rounded-md bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                            <img src="/assets/icons/start.svg" alt="Promote" className="w-4 h-4" />
                        </button>
                        )}
                    </div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

