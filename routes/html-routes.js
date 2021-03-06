var path = require("path");
var db = require("../models")

module.exports = function(app) {

	app.get("/home", function(req, res) {

		res.render("home");
	});

	app.get("/error", function(req, res) {

		res.render("loginError", {layout: "empty"});
	});

	app.get("/team", function(req, res) {

		db.Admin.findAll({}).then(function(dbAdmin) {
			
			var data = [];

			for (i = 0; i < dbAdmin.length; i++) {

				if(dbAdmin[i].dataValues.category === "admin") {

					var input = dbAdmin[i].dataValues;

					data.push(input);
				}
			}

			var hbsObject = {
				admins: data
			}

			res.render("team", hbsObject);

		});
	});

	app.get("/profile/:id", function(req, res) {

		db.Admin.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbAdmin) {

			var hbsObject = {
				id: dbAdmin.dataValues.id,
				first_name: dbAdmin.dataValues.first_name,
				last_name: dbAdmin.dataValues.last_name,
				email: dbAdmin.dataValues.email
			};

			res.render("profile", hbsObject)
		})
	});

	app.get("/employer", function(req, res) {

		db.Employer.findAll({}).then(function(dbEmployer) {

			var data = [];

			for (i = 0; i < dbEmployer.length; i++) {

				var input = dbEmployer[i].dataValues;

				data.push(input);
			}

			var hbsObject = {
				employers: data
			}

			res.render("empTable", hbsObject);
		})
	})

	app.get("/employer/:id", function(req, res) {
		
		var jobArray = [];
		var empArray = [];

		var cid = req.params.id

		db.Employer.findOne({

			where: {
				companyId: cid,				
			},

		}).then(function(dbEmployer){

			var dataEmp = dbEmployer.dataValues;

			empArray.push(dataEmp);

			db.Job.findAll({

				where: {
					companyId: cid
				}
			}).then(function(dbJob) {

				for (i = 0; i < dbJob.length; i ++) {

					var input = dbJob[i].dataValues;

					jobArray.push(input);
				}

				var dataJob = jobArray

				console.log(dataJob);

				var hbsObject = {
					jobs: dataJob,
					employers: [dataEmp]
				}

				console.log(hbsObject);

				res.render("employer", hbsObject);
			})

			// console.log(hbsObject);
		})
	});

	app.get("/Veteran/:id", function(req, res) {
		
		// console.log("ID:", req.params.id);

		db.Veteran.findOne({

			where: {
				id: req.params.id
			}

		}).then(function(dbVeterans){

			var values = dbVeterans.dataValues;

			var hbsObject = values

			// console.log(hbsObject);
			res.render("veteran", hbsObject);
		})
	});

	app.get("/veteran", function(req, res) {

		db.Veteran.findAll({}).then(function(dbVeterans){

			var data = [];

				for (var i = 0; i < dbVeterans.length; i++) {
					var input = dbVeterans[i].dataValues;
					data.push(input);
				}

				var hbsObject = {
					veterans: data
				}

				res.render("vetTable", hbsObject);
			});
	});

	app.get("/jobsTable", function(req, res) {

		db.Job.findAll({}).then(function(dbJob){
			
			var data = [];

			for (var i = 0; i < dbJob.length; i++) {

				var input = dbJob[i].dataValues;

				data.push(input);
			}
			var hbsObject = {
				jobs: data
			}

			res.render("jobs", hbsObject);
		});
	});

	app.get("/user/veteran/:user", function(req, res) {

		console.log(req.params.user);

		db.Veteran.findOne({
			where: {
				username: req.params.user
			}
		}).then(function(dbVeteran) {

			var values = dbVeteran.dataValues;
			var hbsObject = values;

			hbsObject.layout = "veteranUser";

			res.render("veteran", hbsObject);
		})
	});

	app.get("/user/veteran/setting/:user", function(req, res) {

		db.Veteran.findOne({
			where: {
				username: req.params.user
			}
		}).then(function(dbVeteran) {

			var hbsObject = dbVeteran.dataValues;

			hbsObject.layout = "veteranUser";

			res.render("vetSettings", hbsObject);
		});
	});

	app.get("/user/employer/:user", function(req, res) {

		db.Employer.findOne({
			where: {
				username: req.params.user
			}
		}).then(function(dbEmployer) {

			var values = dbEmployer.dataValues;
			var hbsObject = values;

			hbsObject.layout = "employerUser";

			res.render("employer", hbsObject);
		});
	});

	app.get("/user/employer/setting/:user", function(req, res) {

		db.Employer.findOne({
			where: {
				username: req.params.user
			}
		}).then(function(dbEmployer) {

			var hbsObject = dbEmployer.dataValues;

			hbsObject.layout = "employerUser";

			res.render("empSettings", hbsObject);
		})
	})
};
