import React from 'react';
import connectDB from '../../middleware/mongoose';
import User from '../../models/userModel'; 
import bcryptjs from 'bcryptjs';
import { sendEmail } from '../../healper/mailer';

export default async function handler(req, res) {
    await connectDB();
  try {

    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    res.status(201).json({
      message: 'Email sent successfully',
      success: true,
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}