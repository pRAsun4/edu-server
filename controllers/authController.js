import pkg from 'bcryptjs';
const { hash, compare } = pkg;
const { sign, verify } = pkg;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// JWT secret and expiration (replace `process.env.JWT_SECRET` with your secret key)
const JWT_SECRET = process.env.JWT_SECRET || "065715acbc0f694b9ded35c78786dd5232bf733d28fddd55e25ebc9cf88aba7f";
const JWT_EXPIRATION = "1h";

// **Register a new user**
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role, // Ensure this is validated before using
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// **Log in a user**
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare password
    const isPasswordValid = await verify(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// export default { register, login };
