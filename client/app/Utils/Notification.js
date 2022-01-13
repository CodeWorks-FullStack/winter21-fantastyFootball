export function toast(title = 'Your player has been removed', icon = 'success') {
  // @ts-ignore
  Swal.fire({
    position: 'top-right',
    icon: icon,
    toast: true,
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}
