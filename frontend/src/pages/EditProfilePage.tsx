import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import FormContainer from "../components/FormContainer";
import { getUserById, updateUser } from "../api/authService";

export default function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario del usuario
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    role: "voluntary",
  });

  const getUserData = async () => {
    const user = await getUserById(id || "");

    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id || "", {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un error al actualizar el usuario.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito flex flex-col items-center">
      <FormContainer>
        <h1 className="text-3xl font-bold font-poppins mb-6 flex justify-center gap-3">
          <img src="/assets/icons/edit.svg" alt="Editar" className="w-8 h-8" />
          Editar Perfil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-fuchsia-300/80 p-6 border border-purple-500 rounded-xl w-full max-w-md space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            <Input
              label="Nombre usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex justify-center gap-6">
            <Button label="Guardar cambios" type="submit" variant="tertiary" />
            <Button
              label="Cancelar"
              variant="secondary"
              onClick={() => navigate("/profile")}
            />
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
