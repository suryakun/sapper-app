import { loading } from '../stores/app.store'
import { user } from '../stores/user.store'

export default class AuthMiddleware {
    static async beforeChange(from, to, redirect, params, query) {
        const routes = {
            "/pos": { authenticated: true },
            "/about": { authenticated: true },
        }
        if (routes[to] && routes[to].authenticated) {
            firebase.auth().onAuthStateChanged((profile) => {
                if(!profile) redirect("/login");
                const userProfile = (({displayName, email, imageUrl, phoneNumber, photoURL, uid}) => {
                    return {
                        displayName: displayName || '',
                        email: email || '',
                        imageUrl: imageUrl || '',
                        phoneNumber: phoneNumber || '',
                        photoURL: photoURL || '',
                        uid: uid || '',
                    }
                })(profile)
                user.update(u => userProfile)
                loading.update(load => false)
            });
        } else {
            loading.update(load => false)
        }
    }

}