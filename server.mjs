import app from './index.mjs'

app.listen(process.env.PORT || 5002, function () { console.log('listening on *:5002'); });
