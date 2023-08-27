import Swal from "sweetalert2";
import axios from "axios";

export function removeAlert() {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
}

export function editAlert() {
    return Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`
    })
}

export function AddAlert() {
    return Swal.fire({
        title: 'Do you want to double-check before submitting?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Sure, why not',
        confirmButtonText: 'No, it\'s fine'
    });
}

export function submitAlert() {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you!',
        text: 'Your submission has been sent',
        showConfirmButton: false,
        timer: 1500
    })
}

export function errorAlert() {
    return Swal.fire({
        icon: 'info',
        title: 'Requests Limit',
        html: 'You\'ve reached your maximum actions for today...<br><b>Please try again tomorrow</b>'
    })
}

export function emailAlert() {
    return Swal.fire({
        title: 'Enter your email address',
        input: 'text',
        inputAttributes: { autocapitalize: 'off' },
        showCancelButton: true,
        confirmButtonText: 'Reset',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return axios.patch('http://localhost:8000/user', { email: login })
                .then(res => res)
                .catch(error => Swal.showValidationMessage(`Request failed: ${error.response.data}`))
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Your new password is waiting at ${result.value!.data}'`,
                icon: 'success'
            })
        }
    })
}


