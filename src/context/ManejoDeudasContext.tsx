// import React, { createContext, useState, useContext } from 'react';

// // 1. Define el tipo/forma del contexto (valor inicial)
// const defaultValue = {
//     deudas: [],
//     agregarDeuda: () => { },
//     eliminarDeuda: () => { }
// };

// // 2. Proporciona el valor por defecto al crear el contexto
// const ManejoDeudasContext = createContext(defaultValue);

// export const ManejoDeudasProvider = ({ children }) => {
//     const [deudas, setDeudas] = useState([]);

//     const agregarDeuda = (nuevaDeuda) => {
//         setDeudas([...deudas, nuevaDeuda]);
//     };

//     const eliminarDeuda = (id) => {
//         setDeudas(deudas.filter(deuda => deuda.id !== id));
//     };

//     return (
//         <ManejoDeudasContext.Provider
//             value={{
//                 deudas,
//                 agregarDeuda,
//                 eliminarDeuda
//             }}
//         >
//             {children}
//         </ManejoDeudasContext.Provider>
//     );
// };

// export const useManejoDeudas = () => {
//     const context = useContext(ManejoDeudasContext);
//     if (!context) {
//         throw new Error('useManejoDeudas debe ser usado dentro de un ManejoDeudasProvider');
//     }
//     return context;
// };