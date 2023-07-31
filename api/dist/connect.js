import mysql from "mysql";
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "social"
});
// db.on('error', (err) => {
//   console.error('MySQL Connection Error:', err);
// });
// db.on('connect', () => {
//   console.log('Connected to MySQL server');
// });
// db.on('end', () => {
//   console.log('MySQL connection ended');
// });
//# sourceMappingURL=connect.js.map