let myContainer;
let information;
let menu;
let createAccountElement;

const isPrivateKeyStored = localStorage.getItem("privateKey") || false

const EC = elliptic.ec;
const ec = new EC("secp256k1");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.onload = async () => {

    myContainer = document.querySelector(".my-container")
    information = document.querySelector(".information")
    menu = document.querySelector(".menu")
    createAccountElement = document.querySelector(".create-account")

    if (!isPrivateKeyStored) {
        await createAccountAnimation()
    }


}

const createAccountAnimation = async () => {

    // Revertemos as configurações
    information.classList.add("d-none")
    menu.classList.add("d-none")

    myContainer.classList.add("align-items-center")
    myContainer.classList.add("justify-content-center")

    createAccountElement.classList.remove("d-none")
    createAccountElement.classList.add("d-flex")

    createAccount()

    await delay(5000)

    // Retornamos as confiurações padrão
    createAccountElement.classList.add("d-none")
    createAccountElement.classList.remove("d-flex")

    myContainer.classList.remove("align-items-center")
    myContainer.classList.remove("justify-content-center")

    information.classList.remove("d-none")
    menu.classList.remove("d-none")
}

const createAccount = () => {
    const myKey = ec.genKeyPair();
    const private = myKey.getPrivate("hex");
    const public = myKey.getPublic("hex");

    localStorage.setItem("privatekey", private)
}