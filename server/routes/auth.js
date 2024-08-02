import express from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Middleware to verify Firebase ID Token
const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Check unique email
router.get('/check-unique-email', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        res.json({ message: 'Email is unique' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check unique username
router.get('/check-unique-username', async (req, res) => {
    const { username } = req.query;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already in use' });
        }
        res.json({ message: 'Username is unique' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check unique shop name
router.get('/check-unique-shopname', async (req, res) => {
    const { shopName } = req.query;
    try {
        const user = await User.findOne({ shopName });
        if (user) {
            return res.status(400).json({ message: 'Shop name already in use' });
        }
        res.json({ message: 'Shop name is unique' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const {
        email, password, firstName, lastName, username,
        billingStreetAddress, billingCity, billingState, billingCountry,
        billingZipcode, mailingStreetAddress, mailingCity, mailingState, mailingCountry,
        mailingZipcode, shopName
    } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
            billingAddress: {
                street: billingStreetAddress,
                city: billingCity,
                state: billingState,
                country: billingCountry,
                zip: billingZipcode,
            },
            mailingAddress: {
                street: mailingStreetAddress,
                city: mailingCity,
                state: mailingState,
                country: mailingCountry,
                zip: mailingZipcode,
            },
            shopName
        });

        await user.save();
        res.json({ user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.post('/firebase-login', async (req, res) => {
    const { token } = req.body;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, email } = decodedToken;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(200).json({ message: 'User profile incomplete', profileIncomplete: true });
      }
  
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/complete-registration', authenticate, async (req, res) => {
    const {
      firstName, lastName, username,
      billingStreetAddress, billingCity, billingState, billingCountry,
      billingZipcode, mailingStreetAddress, mailingCity, mailingState, mailingCountry,
      mailingZipcode, shopName
    } = req.body;
  
    try {
      let user = await User.findOne({ email: req.user.email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      user = new User({
        uid: req.user.uid,
        email: req.user.email,
        firstName,
        lastName,
        username,
        billingAddress: {
          street: billingStreetAddress,
          city: billingCity,
          state: billingState,
          country: billingCountry,
          zip: billingZipcode,
        },
        mailingAddress: {
          street: mailingStreetAddress,
          city: mailingCity,
          state: mailingState,
          country: mailingCountry,
          zip: mailingZipcode,
        },
        shopName
      });
  
      await user.save();
      res.json({ user });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

export { authenticate };
export default router;




















