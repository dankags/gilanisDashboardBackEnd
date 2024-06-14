import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, image, password } = req.body;
    try {
     
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
          data: {
            name:name.toLowerCase(),
            image,
            password: hashedPassword,
            role:"COMPANY"
          },
        });

       

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"failed to create the user"});
        
    }
}

export const login = async (req, res) => {
  const { username, password } = req.body;
   
   
  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { name:username.toLowerCase() },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER which expire after 7 days

    
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        image:user.image
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};