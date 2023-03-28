const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
function initialize (passport,findUserByEmailDB){
    const authenticateUser =  async (email, password, done) => {
        const user =  await (findUserByEmailDB(email))///.info    
        if (user == null){
            return done(null, false, {message: 'No user with that email'})
        }
    try {
        if (await bcrypt.compare(password, user.password)){
            return done(null, user)
        }
        else{
            return done(null, false, {message: 'Password incorrect'})
        }
    } catch (e) {
        return done(e)
    }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.email) )
    passport.deserializeUser(  async(email, done) => {
        const us =  await (findUserByEmailDB(email))   
        if ( us == null){
            return done(null, false)
        }
    return done(null, us) })
}
module.exports = initialize