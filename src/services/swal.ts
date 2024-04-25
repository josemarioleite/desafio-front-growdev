import swal from 'sweetalert2'

export function Swal (title: string, message: string) {
  return swal.fire({
    title,
    text: message,
  })
}