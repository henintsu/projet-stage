function validationLog(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Email Validation
    if (values.email === "") {
        error.email = "Le champ email ne doit pas être vide";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email invalide";
    } else {
        error.email = "";
    }

    // Password Validation
    if (values.password === "") {
        error.password = "Le champ mot de passe ne doit pas être vide";
    }
     else {
        error.password = "";
    }

    return error;
}

export default validationLog;
