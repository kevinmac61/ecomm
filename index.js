const express = require(`express`);
const bodyParser = require(`body-parser`);
const res = require("express/lib/response");
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="confirm password" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});



app.post(`/`, async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send(`Email already in use`);
    }

    if (password != passwordConfirmation){
        return res.send(`Passwords don't match!`);
    }
    res.send(`Account Created~`);
});

app.listen(3000, () => {
    console.log(`Listening`);
});