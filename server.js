import app from './app.js';
import connectDB from './config/connectDB.js';

const PORT = 3000;

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
    }
    next(err);
});

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server is running at ${PORT}`);  
});