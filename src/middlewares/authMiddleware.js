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
                    const userProfile = (({displayName, email, imageUrl, phoneNumber, photoUrl, uid}) => {
                        return {
                            displayName: displayName || '',
                            email: email || '',
                            imageUrl: imageUrl || '',
                            phoneNumber: phoneNumber || '',
                            photoUrl: photoUrl || '',
                            uid: uid || '',
                        }
                    })(profile)
                    console.log(profile)
                    user.update(u => userProfile)
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