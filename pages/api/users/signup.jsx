import React from 'react';
import connectDB from '@/middleware/mongoose';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'; 
import {sendEmail} from '@/healper/mailer';

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword // Store the hashed password
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send Verification Email
        await sendEmail({ email, emailType:"VERIFY", userId:savedUser._id })
        return NextResponse.json({
            message:"Email send successfully",
            success:'true',
            savedUser
        })


        return NextResponse.json({ message: 'User created successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
