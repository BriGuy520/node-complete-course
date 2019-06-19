
const routeHandlers = (req, res) => {

  const url = req.url;
  const method = req.method;

  res.write("<html>");
  res.write("<head><title>Node Practice</title></head><body>");

  if(url === '/'){
    res.write("Welcome to the home route");
    res.write("<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Submit</button></input></form>");
  }

  if(url === '/users'){
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
  }

  if(url === '/create-user' && method === "POST"){
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];

      res.write(username);
    })
  }

  res.write('</body></html>');
  return res.end();

}

module.exports = routeHandlers;