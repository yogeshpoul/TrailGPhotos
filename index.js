const express = require('express')
const cors = require('cors');
const app = express();
const zod = require("zod");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const router = require('./rootRouter')
const port =  3000
app.use(cors());
const { User, userPhotos } = require('./models');

app.use(express.json())
// app.use('/api/v1', router)

app.get('/',(request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const signupBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(3, 'Password must be at least 3 characters long')
  })
app.post('/signup',async (request,response)=>{
    const { name, email, password } = request.body;
  try {
    signupBody.parse(request.body);
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("name",newUser);

    const token = jwt.sign({ userId: newUser.email }, "myJWT");
    response.status(201).json({
      message: "User created successfully",
      token: token
    });

  } catch (e) {
    if (e instanceof zod.ZodError) {
      const errorMessages = e.errors.map(err => err.message);
      response.status(500).json({ error: errorMessages });
    } else {
      response.status(500).json({ error: e.errors });
    }
  }
})

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3, 'Password must be at least 3 characters long')
})
app.post('/signin', async (request, response) => {
    const { email, password } = request.body;
    try {
      signinBody.parse(request.body);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return response.status(401).json({ error: "User does'nt exists Please create account" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return response.status(401).json({ error: "Enter correct Password" });
      }
      const token = jwt.sign({ userId: user.email }, "myJWT");
      response.status(200).json({
        message: 'Sign-in successful',
        token: token,
      })
    } catch (e) {
      if (e instanceof zod.ZodError) {
        const errorMessages = e.errors.map(err => err.message);
        response.status(500).json({ error: errorMessages });
      } else {
        response.status(500).json({ error: e });
      }
    }
  });

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})