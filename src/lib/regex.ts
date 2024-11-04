export const checkEmailSyntax = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const checkPasswordSyntax = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

export const checkUsernameSyntax = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
    return usernameRegex.test(username);
}

export const checkFirstNameSyntax = (firstName: string) => {
    const firstNameRegex = /^[a-zA-Z]{1,30}$/;
    return firstNameRegex.test(firstName);
}

export const checkLastNameSyntax = (lastName: string) => {
    const lastNameRegex = /^[a-zA-Z]{1,30}$/;
    return lastNameRegex.test(lastName);
}