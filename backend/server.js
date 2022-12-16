const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/database");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

db.connect((err) => {
	if (err) throw err;
	console.log("database is connected");
});

app.get("/list", (req, res) => {
	const sql = "SELECT * FROM user";

	db.query(sql, (error, result) => {
		if (error) throw error;
		res.send(result);
	});
});

app.post("/list", (req, res) => {
	const player = req.body.player;
	if (!player) {
		res.status(400);
		return;
	}
	const sql = `INSERT INTO user(name, lastname, location, age, distance) VALUES('${player.name}', '${player.lastname}', '${player.location}', '${player.age}', '${player.distance}')`;

	console.log(player);

	db.query(sql, (error, result) => {
		if (error) throw error;
		res.send(result);
	});
});

app.delete("/list/:id", (req, res) => {
	const id = req.params.id;

	const sql = `DELETE FROM user WHERE id=${id}`;

	db.query(sql, (error, result) => {
		if (error) throw error;
		res.send(result);
	});
});

app.put("/list/:id", (req, res) => {
	const player = req.body.player;
	const id = req.params.id;

	const sql = `UPDATE user SET name='${player.name}', lastname='${player.lastname}', location='${player.location}', age='${player.age}', distance='${player.distance}' WHERE id=${id}`;

	db.query(sql, (error, result) => {
		if (error) throw error;
		res.send(result);
	});
});

app.get("/competition", (req, res) => {
	const sql = "SELECT * FROM competition";

	db.query(sql, (error, result) => {
		let finalCompetition = [];
		if (error) throw error;
		result.forEach((competition) => {
			const competitionSql = `SELECT * FROM user_competition WHERE id=${competition.id}`;
			db.query(competitionSql, (err, rslt) => {
				if (err) throw err;
			});
		});
	});
});

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`app is running on ${port}`);
});
