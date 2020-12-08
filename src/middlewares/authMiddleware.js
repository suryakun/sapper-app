import { loading } from '../stores/app.store'
import { user } from '../stores/user.store'

export default class AuthMiddleware {
    static beforeChange(from, to, redirect, params, query) {
        const routes = {
            "/pos": { authenticated: true },
            "/about": { authenticated: true },
        }
        if (routes[to] && routes[to].authenticated) {
            firebase.auth().onAuthStateChanged((profile) => {
                if (profile) {
                    console.log(profile)
                    user.update(u => profile)
                    loading.update(load => false)
                } else {
                    redirect("/login")
                }
            });
        } else {
            loading.update(load => false)
        }
    }

}