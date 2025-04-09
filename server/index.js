const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const OpenAI = require('openai'); // Add OpenAI dependency
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  interpretationCredits: { type: Number, default: 1 }, // 1 free interpretation
});

const User = mongoose.model('User', userSchema);

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})/;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store in .env
});

const SYSTEM_PROMPT = `You are a skilled dream interpreter with deep knowledge of psychology, symbolism, and cultural interpretations of dreams. 
Analyze the dream and provide an insightful interpretation that considers:
1. The symbolic meaning of key elements
2. Possible emotional significance
3. Cultural context if relevant
4. Potential connections to the dreamer's life
Keep the interpretation concise but meaningful, around 2-3 paragraphs.`;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character (e.g., !@#$%^&*.)',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Signin Route
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Profile Route
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ email: user.email, createdAt: user.createdAt, interpretationCredits: user.interpretationCredits });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Subscription Route (Mock - Add real payment integration)
app.post('/api/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    const plans = [
      { id: 'single', interpretations: 1, price: 20 },
      { id: 'pack10', interpretations: 10, price: 100 },
      { id: 'pack20', interpretations: 20, price: 200 },
    ];
    const plan = plans.find(p => p.id === planId);
    if (!plan) return res.status(400).json({ error: 'Invalid plan' });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.interpretationCredits += plan.interpretations;
    await user.save();

    // TODO: Integrate payment gateway (e.g., Stripe) here
    console.log(`User ${user.email} subscribed to ${planId} for ₺${plan.price}`);
    res.json({ message: 'Subscription successful', credits: user.interpretationCredits });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dream Interpretation Route
app.post('/api/interpret', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.interpretationCredits <= 0) {
      return res.status(403).json({ error: 'No interpretation credits remaining. Please subscribe.' });
    }

    const { dreamText, language } = req.body;
    if (!dreamText || !language) {
      return res.status(400).json({ error: 'Dream text and language are required' });
    }

    const languageInstruction = {
      en: `Please interpret this dream in English: ${dreamText}`,
      fr: `Veuillez interpréter ce rêve en français: ${dreamText}`,
      tr: `Lütfen bu rüyayı Türkçe olarak yorumlayın: ${dreamText}`,
      de: `Bitte interpretieren Sie diesen Traum auf Deutsch: ${dreamText}`,
      ar: `يرجى تفسير هذا الحلم بالعربية: ${dreamText}`,
    }[language] || `Please interpret this dream in ${language}: ${dreamText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: languageInstruction },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const interpretation = completion.choices[0].message.content || 'No interpretation available';
    user.interpretationCredits -= 1;
    await user.save();

    res.json({ interpretation, credits: user.interpretationCredits });
  } catch (error) {
    console.error('Error interpreting dream:', error);
    res.status(500).json({ error: 'Failed to interpret dream' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));