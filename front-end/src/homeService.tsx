const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req: any, res: any) => {
  try {
    console.log('File received:', req.file);
    // Aqui você pode processar o arquivo conforme necessário
    res.status(200).send({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error processing file', error);
    res.status(500).send({ message: 'Error processing file' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export {}