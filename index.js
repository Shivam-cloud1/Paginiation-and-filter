import express from 'express';
import bodyParser from 'body-parser';
import jsonData from "./fs.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/students', (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedStudents = jsonData.slice(startIndex, endIndex);
    console.log(paginatedStudents)
    res.json({ data: paginatedStudents });
});

app.get('/students/filter', (req, res) => {
    const { gender, maths, physics } = req.query;

    let filteredProducts = jsonData;

    if (gender) {
        filteredProducts = filteredProducts.filter(jsonData => jsonData.gender === gender);
    }

    if (maths) {
        const [minNum, maxNum] = maths.split('-');
        filteredProducts = filteredProducts.filter(jsonData => jsonData.maths >= minNum && jsonData.maths <= maxNum);
    }

    if (physics) {
        const [minNum, maxNum] = physics.split('-');
        filteredProducts = filteredProducts.filter(jsonData => jsonData.physics >= minNum && jsonData.physics <= maxNum);
    }

    res.json(filteredProducts);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
