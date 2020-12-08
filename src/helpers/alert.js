
import Swal from 'sweetalert2'
import translation from '../helpers/translation'

export const ErrorModal = async (code) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: translation[code],
        // footer: '<a href>Why do I have this issue?</a>'
    })
} 
