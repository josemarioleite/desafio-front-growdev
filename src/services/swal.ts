import swal from 'sweetalert2'
import './sweeAlertStyle.css'

export function Swal (title: string, message: string) {
  return swal.fire({
    title,
    text: message,
  })
}

export function SwalConfirm (title: string, message: string) {
  return swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar'
  })
}