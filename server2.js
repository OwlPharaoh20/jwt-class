
require('dotenv').config()

const express = require('express')
const app = express();

const jwt = require('jsonwebtoken')

app.use(express.json())


const posts = [
    {
        userName: 'Kyle',
        title: 'Post 1'
    },
    {
        userName: 'Jim',
        title: 'Post 2'
    }
]


app.get( "/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))

})

app.post('/login', (req, res) => {
   //Authenticate User
   const username = req.body.username
   const user = {name: username} 

   jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) 
   res.json({accessToken: accessToken})
})

function authenticateToken(req, res, nex) {
    const authHeader = req.headers['authorization']
    const token = authHeader &&authHeader.split('')[1]
    if (token == null ) return res.sendStatus(401)


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
            req.user = user 
        next()
    })
}


app.listen(4000)