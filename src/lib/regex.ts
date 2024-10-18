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