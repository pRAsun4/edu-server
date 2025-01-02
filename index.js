import dotenv from 'dotenv'
import express, { json } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();
// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(json());

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Edusqure Admin Panel Backend is running');
});

// Start the Server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
