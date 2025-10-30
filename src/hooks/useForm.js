import { useState } from 'react';

//"Parametrizamos" las funciones básicas de un formulario
export function useForm(initialState) {
    //Iniciamos State
    const [formData, setFormData] = useState(initialState);
    
    //Detectar cambios del input y actualizamos el State y el value
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };
    
    //Resetear formulario
    const resetForm = () => setFormData(initialState);
    
    //Cambiar el State y el value del campo seleccionado (es como un handleChange personalizado)
    const setFieldForm = (name, value) => {
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const handleToggleArrayField = (fieldName, valueToToggle) => {
        //Recogemos el State del array actual (formData.generos)
        const currentArray = formData[fieldName] || [];

        //Hacemos el toggle
        const newArray = currentArray.includes(valueToToggle)
            ? currentArray.filter(item => item !== valueToToggle) //Lo quita
            : [...currentArray, valueToToggle]; //Lo añade

        //Guardamos el nuevo array en el State
        setFieldForm(fieldName, newArray);
    };
    
    return [formData, handleChangeForm, resetForm, setFieldForm, handleToggleArrayField];
}