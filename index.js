const server = require('./data/api/server');
const PORT = 4444;
server.listen(PORT, ()=>{
    console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`)
})