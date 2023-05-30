const emailValidation = (email) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(email);
};

const validateLogin = (req, res, next) => {
const { email, password } = req.body;

if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
if (!emailValidation(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}

if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}

if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
} 

next();
};

module.exports = validateLogin;