import {$instance} from "./instance";

export const authAPI = {
    registration: (email, password) => {
        return $instance.post('auth/registration', {
            email,
            password
        });
    }
}