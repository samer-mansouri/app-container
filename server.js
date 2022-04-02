const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 

const UserRoutes = require('./routes/UserRoutes');
const VehiculeRoutes = require('./routes/VehiculeRoutes');
const ReservationRoutes = require('./routes/ReservationRoutes');
const TrajetRoutes = require('./routes/TrajetRoutes');


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/',  UserRoutes.router);
app.use('/',  VehiculeRoutes.router);
app.use('/',  ReservationRoutes.router);
app.use('/',  TrajetRoutes.router);
