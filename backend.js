import express from 'express';
import cors from 'cors';

const server = express();
const SERVER_PORT = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());

// Handling POST requests for processing input data
server.post('/bfhl', (req, res) => {
    const { name, dob, data } = req.body;
    
    if (!name || !dob || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Incorrect input format' });
    }
    
    const unique_id = `${name.replace(/\s+/g, '_')}_${dob}`;
    const numericValues = data.filter(value => !isNaN(value));
    const alphabeticValues = data.filter(value => isNaN(value));
    
    res.json({
        is_success: true,
        user_identifier: unique_id,
        university_email: `${name.replace(/\s+/g, '.')}@college.edu`,
        enrollment_number: `CU${dob.replace(/-/g, '')}`,
        numeric_data: numericValues,
        alphabetic_data: alphabeticValues
    });
});

// Handling GET requests to fetch operation code
server.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

server.listen(SERVER_PORT, () => {
    console.log(`Backend service is active on port ${SERVER_PORT}`);
});
