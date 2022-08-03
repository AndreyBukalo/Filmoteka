export default function storeAuth(email) {
    const settings = {
        email: email,
        auth: true
    }
    localStorage.setItem('auth', JSON.stringify(settings))
    console.log(JSON.parse(localStorage.getItem('auth')).auth)
}