import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, billingAddress, mailingAddress, username, password, shopName } = req.body;
    
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        user = new User({
            firstName,
            lastName,
            email,
            billingAddress,
            mailingAddress,
            username,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            shopName,
        });

        await user.save();
        const token = generateToken(user);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, { session: false }, (err) => {
            if (err) return next(err);
            const token = generateToken(user);
            res.json({ message: 'Login successful', token });
        });
    })(req, res, next);
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = generateToken(req.user);
        res.redirect(`/?token=${token}`);
    }
);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
