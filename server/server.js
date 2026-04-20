const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// --- API Endpoints ---

// Get all tasks
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY inspection_date DESC').all();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
app.post('/api/tasks', (req, res) => {
  const { name, category, location, start_date, inspection_date, standards } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO tasks (name, category, location, start_date, inspection_date, standards)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, category, location, start_date, inspection_date, standards);
    res.json({ id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, location, start_date, inspection_date, standards, status } = req.body;
  try {
    db.prepare(`
      UPDATE tasks 
      SET name = ?, category = ?, location = ?, start_date = ?, inspection_date = ?, standards = ?, status = ?
      WHERE id = ?
    `).run(name, category, location, start_date, inspection_date, standards, status, id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Suggest TCVN
app.post('/api/ai/suggest-standards', async (req, res) => {
  const { taskName } = req.body;
  
  // prompt for Gemini (Conceptual)
  // "Hãy liệt kê các tiêu chuẩn Việt Nam (TCVN) áp dụng cho công tác: ${taskName}. Trả về danh sách dạng string, ngăn cách bởi dấu chấm phẩy."
  
  // Simulating a more intelligent response based on keywords
  let suggestions = "TCVN 4453:1995; TCVN 9340:2012"; // Default
  
  if (taskName.toLowerCase().includes('xây') || taskName.toLowerCase().includes('gạch')) {
    suggestions = "TCVN 4085:2011 (Kết cấu gạch đá - Quy phạm thi công và nghiệm thu); TCVN 4314:2003";
  } else if (taskName.toLowerCase().includes('thép')) {
    suggestions = "TCVN 4453:1995 (Kết cấu bê tông và bê tông cốt thép toàn khối); TCVN 1651:2008";
  } else if (taskName.toLowerCase().includes('sơn') || taskName.toLowerCase().includes('bả')) {
    suggestions = "TCVN 6934:2001 (Sơn tường - Kiểm tra và nghiệm thu)";
  }

  // Artificial delay to feel like AI
  setTimeout(() => {
    res.json({ standards: suggestions });
  }, 1000);
});

// Download Word Document
app.post('/api/export/docx', (req, res) => {
  const task = req.body;
  
  try {
    const templatePath = path.join(__dirname, '../templates/template_ntcv.docx');
    
    // For demo purposes, we check if template exists. 
    // If not, we'll return a message or handle it.
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ error: 'Template file not found. Please upload template_ntcv.docx to the templates folder.' });
    }

    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render data to template
    doc.render({
      TenCongViec: task.name,
      HangMuc: task.category,
      ViTri: task.location,
      NgayTN: task.inspection_date,
      TieuChuan: task.standards,
      VatLieu: task.materials || "Theo thiết kế",
      DonVi: "Công ty Xây dựng ABC"
    });

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=BienBan_${task.id}.docx`,
    });
    res.send(buf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Materials & Templates Placeholders ---

app.get('/api/materials', (req, res) => {
  const materials = db.prepare('SELECT * FROM materials').all();
  res.json(materials);
});

app.get('/api/templates', (req, res) => {
  const templates = db.prepare('SELECT * FROM templates').all();
  res.json(templates);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
