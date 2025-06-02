// src/pages/UserManagementPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/authService';


interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
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
    getUsers()
    setUsers([
      { id: 1, username: 'lau_32', name: 'Laura',lastname:'Sánchez', email:'laura@example.com', location: 'Sevilla', zone: 'Centro', phone: '600111222', role: 'voluntary' },
      { id: 2, username: 'Carmen_32', name: 'Carmen', lastname:'Pérez', email:'carmen@example.com', location: 'Dos Hermanas', zone: 'Norte', phone: '655888999', role: 'voluntary' },
      { id: 3, username: 'Mai_32', name: 'Admin Maite',lastname:'Garcia', email:'Mai.Admin@example.com', location: 'Sevilla', zone: 'Todos', phone: '644555666', role: 'admin' },
    ]);
  }, []);

  const promoteUser = (id: number) => {
    // Lógica para promover al usuario a admin
    console.log(`Promover usuario con ID ${id}`);
  };

  //No se si la ruta esta bien
  const editUser = (id: number) => {
    navigate(`/admin/users/${id}/edit`);
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
      

      <table className="w-full bg-white rounded-xl shadow-md p-6 text-purple-900">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-3 text-left">Nombre Usuario</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Apellido</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Localidad</th>
            <th className="p-3 text-left">Zona</th>
            <th className="p-3 text-left">Telefono</th>
            <th className="p-3 text-left">Rol</th>
            <th className="p-3 text-left">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.lastname}</td>
              <td className="p-3">{user.email}</td>
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

