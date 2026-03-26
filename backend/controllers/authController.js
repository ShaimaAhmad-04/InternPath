import prisma from '../prisma/client.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try{
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;
    const existingUser= await prisma.user.findUnique({where: {email}});
    if(existingUser){
      return res.status(400).json({message: "Email is already in use"});
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true
      }
  });

    res.json(user);   // are we sure we return the whole user object? some data like the hashed password are confidential
    // potential solution
    // const {password:_ , ...safeUser}=user; // this right here basically discards the password or the hashed password
    /*                                         out of user data to keep the password confidential for security purposes  */
    // res.status(200).json({safeUser})  // we return all data but the hashed password

  }catch(error){
    res.status(500).json({error: error.message})
  }
};

export const login = async (req,res)=>{
  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },// from authenticate function
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true
        //only selected fields are sent
      }
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
