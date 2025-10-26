import { useState } from 'react';

//"Parametrizamos" las funciones básicas de un formulario
export function useForm(initialState) {
    //Iniciamos State
    const [formData, setFormData] = useState(initialState);
    
    //Detectar cambios del input y actualizamos el State y el value
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    //Resetear formulario
    const resetForm = () => setFormData(initialState);
    
    //Cambiar el State y el value del campo seleccionado (es como un handleChange personalizado)
    const setFieldForm = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    return [formData, handleChangeForm, resetForm, setFieldForm];
}