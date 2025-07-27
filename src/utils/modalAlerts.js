import Swal from 'sweetalert2';
import './swal-custom.css';
export const showAlert = params => {
  

  const {
    title = '',
    message = '',
    type = 'success',
    cancelButtonText = "Aceptar",
    showConfirmButton = false,
    showCancelButton = true,
    showCloseButton = true,
    onCloseFunction = null,
    callBackFunction = false,
    position = 'top'
  } = params;

  Swal.fire({
    title,
    html: message,
    icon: type,
    cancelButtonText,
    showConfirmButton,
    showCancelButton,
    showCloseButton,
    position
  }).then(result => {
    if (!result.isConfirmed) {
      if (callBackFunction) {
        onCloseFunction();
      }
    }
  });
};

export const showAlertConfirm = async params => {
  
  const {
    title = '',
    message = '',
    type = 'succes',
    showCloseButton = true,
    showConfirmButton = true,
    showCancelButton = true,
    reverseButtons = true,
    confirmButtonText = "Si",
    cancelButtonText = "No",
    position = 'top'
  } = params;

  const confirmation = Swal.fire({
    title,
    html: message,
    icon: type,
    showCloseButton,
    showConfirmButton,
    showCancelButton,
    reverseButtons,
    confirmButtonText,
    cancelButtonText,
    position
  });
  return await confirmation.then(result => !!result.isConfirmed);
};
