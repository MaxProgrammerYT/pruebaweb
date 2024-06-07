document.addEventListener("DOMContentLoaded", function () {
    const nombre = document.getElementById("myname");
    const apellidos = document.getElementById("surname");
    const celular = document.getElementById("mobile");
    const correo = document.getElementById("email");
    const direccion = document.getElementById("address");
    const terminosYcondiciones = document.getElementById("termsAndConditions");
    const form = document.getElementById("form");
    const listInputs = document.querySelectorAll(".form-input");
    const menuOptions = document.querySelector(".menu-options");
    const opcionSeleccionada = document.getElementById("opcionSeleccionada");
    const menuTrigger = document.querySelector(".menu-trigger");
    let menuOpen = false;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let condicion = validacionForm();
        if (condicion) {
            const mensajeWhatsapp = construirMensajeWhatsapp();
            enviarFormulario(mensajeWhatsapp);
            limpiarFormulario();
        }
    });

    menuTrigger.addEventListener("click", function () {
        toggleMenu();
    });

    menuOptions.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            opcionSeleccionada.textContent = e.target.textContent;
            toggleMenu();
        }
    });

    function validacionForm() {
        form.lastElementChild.innerHTML = "";
        let condicion = true;
        listInputs.forEach((element) => {
            element.lastElementChild.innerHTML = "";
        });

        if (nombre.value.length < 1 || nombre.value.trim() == "") {
            mostrarMensajeError("myname", "Nombre no válido*");
            condicion = false;
        }

        if (correo.value.length < 1 || correo.value.trim() == "") {
            mostrarMensajeError("email", "Correo no válido*");
            condicion = false;
        }

        if (direccion.value.length < 1 || direccion.value.trim() == "") {
            mostrarMensajeError("address", "Dirección no válida*");
            condicion = false;
        }

        if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
            mostrarMensajeError("surname", "Apellidos no válidos*");
            condicion = false;
        }

        if (celular.value.length !== 9 || celular.value.trim() == "" || isNaN(celular.value)) {
            mostrarMensajeError("mobile", "Celular no válido*");
            condicion = false;
        }

        if (!terminosYcondiciones.checked) {
            mostrarMensajeError("termsAndConditions", "Acepta los términos y condiciones*");
            condicion = false;
        }

        const opcionSeleccionadaTexto = opcionSeleccionada.textContent.trim();
        if (opcionSeleccionadaTexto !== "WhatsApp Grafito Chama") {
            mostrarMensajeError("opcionSeleccionada", "Selecciona una opción válida*");
            condicion = false;
        }

        return condicion;
    }

    function mostrarMensajeError(claseInput, mensaje) {
        let elemento = document.querySelector(`.${claseInput}`);
        elemento.lastElementChild.innerHTML = mensaje;
    }

    function construirMensajeWhatsapp() {
        const mensaje =
            `Hola, soy ${nombre.value} ${apellidos.value}. ` +
            `Mi correo es ${correo.value} y mi dirección es ${direccion.value}. ` +
            `Mi número de teléfono es ${celular.value}. ` +
            `Estoy interesado/a en obtener más información. ¡Gracias!`;
        return encodeURIComponent(mensaje);
    }

    function toggleMenu() {
        if (menuOptions.style.display === "block") {
            menuOptions.style.display = "none";
        } else {
            menuOptions.style.display = "block";
        }
        menuOpen = !menuOpen;
    }

    function enviarFormulario(mensajeWhatsapp) {
        const urlVentas1 = `https://api.whatsapp.com/send?phone=%2B51937599814&text=${mensajeWhatsapp}`;
        window.location.href = urlVentas1;
    }

    function limpiarFormulario() {
        form.reset();
        opcionSeleccionada.textContent = "";
    }
});
