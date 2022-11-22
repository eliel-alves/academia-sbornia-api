const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const users = [{
    _id: 1, 
    username: 'adm',
    password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
    email: 'elielalves.cc@gmail.com'
}]

module.exports = function(passport) {

    // funcoes que podem ser adaptadas de acordo com o banco de dados
    function findUser(username) {
        return users.find(item => item.username === username);
    }

    function findUserById(id) {
        return users.find(item => item._id === id);
    }

    // configura o passport
    // passport salva um cookie no front e uma session no backend   
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch(err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        try {
            const user = findUser(username);
            // tenta encontrar o usuario
            if(!user) return done(null, false);

            // verifica a senha
            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false);

            // caso autenticou com sucesso
            return done(null, user);
        } catch(err) {
            console.log(err);
            return done(err, false);
        }
    }));
}