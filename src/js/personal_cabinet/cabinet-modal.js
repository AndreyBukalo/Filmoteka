export default function modalFill(emailFirst, email) {
    const cabinet = document.querySelector(".cabinet-modal")

    const emblem = document.createElement('div')
    emblem.classList.add('cabinet-modal__emblem')

    const symb = document.createElement('p')
    symb.classList.add('cabinet-modal__symb')
    symb.innerHTML = `${emailFirst}`

    emblem.appendChild(symb)

    const emailp = document.createElement('p')
    emailp.classList.add('cabinet-modal__email')
    emailp.innerHTML = `${email}`

    const signOut = document.createElement('button')
    signOut.classList.add('cabinet-modal__out')
    //signOut.setAttribute('type','submit')
    signOut.innerHTML = 'SIGN OUT'

    cabinet.appendChild(emblem)
    cabinet.appendChild(emailp)
    cabinet.appendChild(signOut)
}