import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import "./CrearEvento.css";

export const CrearEvento = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const initialValues = {
        nombre: "",
        cliente: "",
        tipo: "",
        assistentes: "",
        ciudad: "",
        fecha: "",
        presupuesto: "",
        objetivo: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState("");
    const [shouldSend, setShouldSend] = useState(false);

    const { data, loading, error, setData, setError } = useFetch(
        shouldSend ? `${API_URL}/api/v1/eventos` : null,
        "POST",
        shouldSend ? formValues : null
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            setShouldSend(true);
        }
    };

    if (data) {
        setSubmitMessage("Evento Creado!");
        setFormValues(initialValues);
        setFormErrors({});
        setShouldSend(false);
        setData(null);
    }

    if (error) {
        setSubmitMessage(`Error: ${error}`);
        setShouldSend(false);
        setError(null);
    }

    const validate = (values) => {
        const errors = {};
        
        if (!values.nombre?.trim()) {
            errors.nombre = "El nombre del evento es obligatorio";
        }
        
        if (!values.cliente?.trim()) {
            errors.cliente = "El cliente es obligatorio";
        }
        
        if (!values.ciudad?.trim()) {
            errors.ciudad = "La ciudad es obligatoria";
        }
        
        if (!values.fecha) {
            errors.fecha = "La fecha es obligatoria";
        }
        
        if (!values.assistentes || parseInt(values.assistentes) <= 0) {
            errors.assistentes = "El número de asistentes debe ser mayor a 0";
        }

        return errors;
    };

    return (
        <div className="form-container">
            {submitMessage && (
                <div className={`submit-message ${submitMessage.includes("Error") ? "error" : "success"}`}>
                    {submitMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Crear Nuevo Evento</h1>

                <div className="form-group">
                    <label>Nombre del Evento *</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formValues.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese el nombre del evento"
                        disabled={loading}
                    />
                    {formErrors.nombre && <p className="error-text">{formErrors.nombre}</p>}
                </div>

                <div className="form-group">
                    <label>Cliente *</label>
                    <input
                        type="text"
                        name="cliente"
                        value={formValues.cliente}
                        onChange={handleChange}
                        placeholder="Nombre del cliente"
                        disabled={loading}
                    />
                    {formErrors.cliente && <p className="error-text">{formErrors.cliente}</p>}
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        name="tipo"
                        value={formValues.tipo}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value="">Seleccionar tipo</option>
                        <option value="conferencia">Conferencia</option>
                        <option value="taller">Taller</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Asistentes *</label>
                    <input
                        type="number"
                        name="assistentes"
                        value={formValues.assistentes}
                        onChange={handleChange}
                        placeholder="Cantidad de asistentes"
                        min="1"
                        disabled={loading}
                    />
                    {formErrors.assistentes && <p className="error-text">{formErrors.assistentes}</p>}
                </div>

                <div className="form-group">
                    <label>Ciudad *</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={formValues.ciudad}
                        onChange={handleChange}
                        placeholder="Ciudad del evento"
                        disabled={loading}
                    />
                    {formErrors.ciudad && <p className="error-text">{formErrors.ciudad}</p>}
                </div>

                <div className="form-group">
                    <label>Fecha *</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formValues.fecha}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {formErrors.fecha && <p className="error-text">{formErrors.fecha}</p>}
                </div>

                <div className="form-group">
                    <label>Presupuesto</label>
                    <input
                        type="number"
                        name="presupuesto"
                        value={formValues.presupuesto}
                        onChange={handleChange}
                        placeholder="Presupuesto del evento"
                        min="0"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Objetivo</label>
                    <textarea
                        name="objetivo"
                        value={formValues.objetivo}
                        onChange={handleChange}
                        placeholder="Objetivo del evento"
                        rows="3"
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear Evento"}
                </button>
            </form>
        </div>
    );
};