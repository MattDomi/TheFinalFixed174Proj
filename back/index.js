const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

const port = process.env.PORT || 3000;

 // INSERT statement function
app.use(cors());
app.use(express.json());
app.post('/insert', (req,res) => {
  const acc_no = req.body.acc_no;
  const age = req.body.age;
  const c_first = req.body.c_first;
  const c_last = req.body.c_last;
  const phone = req.body.phone;

  pool.query( 
    'INSERT INTO "CLIENT" ("Account_no", "Age", "Client_First", "Client_Last", "Phone")' 
    + 'VALUES ($1, $2, $3, $4, $5)',
    [acc_no,age,c_first,c_last,phone],
    (err,result) => {
      if (err) {
      console.log(err);
    } else {
      console.log("Values inserted to Client info.");
    }
    }

  );
});

// SELECT statement function
app.get("/select", (req,res) => {
  pool.query("SELECT * FROM CLIENT", (err,result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
})

app.listen(port, () => {
  console.log('Server listening on the port ${port}');
})


// POSTGRES CREDENTIALS


const Pool = require("pg").pool;

const pool = new Pool({
  host: "ec2-54-82-205-3.compute-1.amazonaws.com",
  database: "d3bgqcqvsdgc88",
  port: "5432",
  user: "zrfphcozxudntg",
  password: "927444a82c199deb7a4ce722a25b54ad3b421f7b34ba49a875fc604eca418a76"


});

module.exports = pool;