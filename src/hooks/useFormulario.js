export const useFormulario = () => {

  //coge TODOS los campos del formulario
  const serialize = (formElement) => {
    if (!formElement) return {};

    const data = {};
    for (const el of formElement.elements) {
      if (el.name) {
        data[el.name] = el.value;
      }
    }
    return data;
  };

  //coge SOLO los campos editados
  const getDirty = (formElement) => {
    if (!formElement) return {};

    const data = {};
    for (const el of formElement.elements) {
      if (el.name && el.value !== el.defaultValue) {
        data[el.name] = el.value;
      }
    }
    return data;
  };

  return { serialize, getDirty };
};
