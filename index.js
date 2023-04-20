const express = require('express');

const app = express();

const data = {
  hello : 'world',
  x : {
    y : {
      z : 'hello'
    }
  }
};

// Define the route that accepts the requested path
app.get('/api/*', (req, res) => {
  // Split the requested path into an array of keys
  const keys = req.params[0].split('/');
  if(keys[0] === '' && keys.length === 1) {  // tricky? can be simplified? - this is incase there is nothing afterwards /api/
    res.json(data);
    return;
  }

  // Traverse the nested JSON object to get the requested value - we have url like /api/x/y/z
  let value = data;
  for (const key of keys) {
    value = value[key];
    if (!value) break;
  }

  // Return the value as JSON
  res.json(value);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});