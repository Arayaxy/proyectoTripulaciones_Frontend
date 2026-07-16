import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"
import { useFetch } from "../../hooks/useFetch"
import Swal from "sweetalert2"
import '../../components/partials/_adminsPage.scss';

export const AdminsPage = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [editingEmail, setEditingEmail] = useState(null)
  const [editName, setEditName] = useState("")

  const {
    data: adminsData,
    loading,
    error: fetchError,
    setData: setAdminsData,
    setError: setFetchError,
  } = useFetch(`${API_URL}/auth/admins`, "GET")

  const admins = adminsData?.data || []

  const refreshAdmins = async () => {
    try {
      const resp = await fetch(`${API_URL}/auth/admins`, { credentials: "include" })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || "Error al cargar administradores")
      setAdminsData(data)
    } catch (err) {
      setFetchError(err.message)
    }
  }

  const handleEdit = (admin) => {
    setEditingEmail(admin.email)
    setEditName(admin.nombreUsuario)
  }

  const handleSave = async (email) => {
    try {
      const resp = await fetch(`${API_URL}/auth/admins/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName: editName }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || "Error al actualizar")
      setEditingEmail(null)
      await refreshAdmins()
    } catch (err) {
      setFetchError(err.message)
    }
  }

  const handleCancel = () => {
    setEditingEmail(null)
    setEditName("")
  }

const handleDelete = async (email, name) => {
  const result = await Swal.fire({
    title: '¿Eliminar administrador?',
    html: `¿Estás seguro de eliminar a <strong>${name}</strong> (${email})?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!result.isConfirmed) return;

  try {
    const resp = await fetch(`${API_URL}/auth/admins/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || 'Error al eliminar');

if (user?.email === email) {

  await Swal.fire({
    icon: 'success',
    title: 'Cuenta eliminada',
    text: 'Tu cuenta ha sido eliminada. Serás redirigido en 3 segundos.',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  await logOut();
  window.location.reload();
  return;
}

    await refreshAdmins();
  } catch (err) {
    setFetchError(err.message);
  }
};

  return (
    <>
      <header className="titlePage">
        <h1>Administradores</h1>
      </header>
      <section className="container">
        {fetchError && <p className="admins__error">{fetchError}</p>}
        {loading ? (
          <p className="admins__loading">Cargando...</p>
        ) : admins.length === 0 ? (
          <p className="admins__empty">No hay administradores registrados.</p>
        ) : (
          <div className="admins__table-wrapper">
            <table className="admins__table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.email}>
                    <td data-label="Nombre">
                      {editingEmail === admin.email ? (
                        <input
                          className="admins__input"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        admin.nombreUsuario
                      )}
                    </td>
                    <td data-label="Email">{admin.email}</td>
                    <td data-label="Rol">{admin.rol}</td>
                    <td data-label="Acciones">
                      {editingEmail === admin.email ? (
                        <div className="admins__actions">
                          <button className="admins__btn admins__btn--save" onClick={() => handleSave(admin.email)}>
                            Guardar
                          </button>
                          <button className="admins__btn admins__btn--cancel" onClick={handleCancel}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="admins__actions">
                          <button className="admins__btn admins__btn--edit" onClick={() => handleEdit(admin)}>
                            Editar
                          </button>
                          <button className="admins__btn admins__btn--delete" onClick={() => handleDelete(admin.email, admin.nombreUsuario)}>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
