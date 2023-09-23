const express = require('express');
const nano = require('nano')('http://admin:password@localhost:5984');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const dbName = 'employee-form';
const db = nano.use(dbName);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/addEmployee', (req, res) => {
  const employeeData = req.body;

  db.insert(employeeData, (err, body) => {
    if (err) {
      console.error('Error inserting document:', err);
      res.status(500).json({ message: 'Error inserting document' });
    } else {
      console.log('Document inserted:', body);
      res.status(200).json({ message: 'Document inserted successfully' });
    }
  });
});

app.post('/api/updateEmployees', (req, res) => {
  const { employees } = req.body;

  const updatePromises = employees.map((emp) => {
    return new Promise((resolve, reject) => {
      db.insert(emp, emp._id, (err, body) => {
        if (err) {
          console.error(`Error updating document ${emp._id}:`, err);
          reject(err);
        } else {
          console.log(`Document ${emp._id} updated:`, body);
          resolve(body);
        }
      });
    });
  });

Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: 'Employees updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating employees:', error);
      res.status(500).json({ message: 'Error updating employees' });
    });
});

app.get('/api/getEmployees', (req, res) => {
  db.list({ include_docs: true }, (err, body) => {
    if (err) {
      console.error('Error fetching documents:', err);
      res.status(500).json({ message: 'Error fetching documents' });
    } else {
      const employees = body.rows.map((row) => row.doc);
      res.status(200).json(employees);
    }
  });
});

app.get('/api/diversityCounts', (req, res) => {
  db.view('diversity_per_month', 'diversity', { group_level: 2 }, (err, body) => {
    if (err) {
      console.error('Error fetching diversity counts:', err);
      res.status(500).json({ message: 'Error fetching diversity counts' });
    } else {
      const diversityCounts = body.rows.map((row) => ({
        year: row.key[0],
        month: row.key[1],
        counts: row.value,
      }));
      res.status(200).json(diversityCounts);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});