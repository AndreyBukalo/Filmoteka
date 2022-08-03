function signOut() {
    if (document.querySelector('.cabinet-modal__out') != null) {
        document.querySelector('.cabinet-modal__out').addEventListener('click', (event) => {
            const settings = JSON.parse(localStorage.getItem('auth'))
            settings.auth = false
            localStorage.setItem('auth', JSON.stringify(settings))
            location.href=location.href;
        })
    }
}

signOut()