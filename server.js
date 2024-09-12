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


app.get( "/posts", (req, res) => {
    res.json(posts)

})

app.get('/login', (req, res) => {
   //Authenticate User
})

app.listen(3000)