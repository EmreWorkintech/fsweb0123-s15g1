# Sprint 15 Gün 1

## Derste işlediklerimiz:
* Authentication(kimlik doğrulama) vs Authorization(yetkilendirme)
    + api/auth/register [POST]
    + api/auth/login [POST]
    + api/auth/logout [GET]
    + api/auth/password/reset [POST]

* Şifreleri hashlayerek saklama: `bcrypjs`
    + haslemek için `bcrypt.hashSync(password, HASH_ROUNDS)`
    + hash kontrolü için:
        + ilk önce kullanıcı username ile veritabanından çekilir
        + sonra, haslanmiş şifre ile karşılaştırma yapılır `bcrypt.compareSync(password, hashedPasswordInDatabase)`
    
* Session ve Cookie ile requestlerde kullanıcı bilgilerini kalıcı hale getirme: `express-session`
    + server'da middleware olarak session yaratıyoruz.
    ```
    server.use(session({
        name: 'titan',
        secret: 'buraya secret girilecek',
        cookie: {
            maxAge: 1000*60*60,  //ms cinsinden geçerlilik süresi = 1 saat
            secure: false, //https only
            httpOnly: false  //js'den cookie erişimi
        },
        resave: false,
        saveUninitialized: false
    }))
    ```
    + login olduğunda req.session.user ile session yaratıyoruz.
    + ilgili endpointlerde req.session.user kontrolü yaparak authorization kontrolü yapıyoruz.
    + logout'da req.session.destroy(...) ile session'ı yok ediyoruz. (client tarafındaki cookie'yi sildirebilmek için tarihi geçmiş bir cookie dönüyoruz)
* Sessionların kalıcı olmasını sağlama: `connect-express-session`
    + server.js içinde Store isimli bir constructor function yazıyoruz.
    `const Store = require('connect-session-knex')(session);`
    + session configuration içinde store adı ile configuration ayarlarını yapıyoruz.
    ```
    store: new Store({
        knex: require('../data/db-config'),
        tablename: 'sessions',
        sidfieldname:'sid',
        createtable: true,
        clearInterval: 1000*60*60
    })
    ```
