const router = require('express').Router();
const dbModel = require('../database/databaseAccessLayer');

router.get('/', async(req, res) => {
	console.log("page hit");

	try {
		const result = await dbModel.select();

		res.render('index', { 
			items: result,
		});

		console.log(result);
	} catch (err) {
		res.render('error', { message: 'Error reading from MySQL'});
		console.log('Error reading from MySQL');
		console.error(err);
	}
});

router.get('/increase', async(req, res) => {
	console.log("page hit");
	console.log(req.query)

	try {
		const result = await dbModel.increment(req.query);

		res.redirect('/')

		console.log(result);
	} catch (err) {
		res.render('error', { message: 'Error reading from MySQL'});
		console.log('Error reading from MySQL');
		console.error(err);
	}
});

router.get('/decrease', async(req, res) => {
	console.log("page hit");

	try {
		const result = await dbModel.decrement(req.query);

		res.redirect('/')

		console.log(result);
	} catch (err) {
		res.render('error', { message: 'Error reading from MySQL'});
		console.log('Error reading from MySQL');
		console.error(err);
	}
});

router.get('/delete', async (req, res) => {     
	console.log("delete restaurant");    
	console.log(req.query);   

	let entityID = req.query.id;    
	if (entityID) {   
		try {
			const success = await dbModel.deleteItem(req.query);   
			if (success) {    
				res.redirect("back");   
			} else {    
				res.render('error', {message: 'Error writing to MySQL'});    
				console.log("Error writing to MySQL");    
				console.log(err);   
			}  
		} catch (err) {
			res.render('error', {message: "Error writing to MySQL"});
			console.log("Error writing to MySQL");
			console.error(err);
		}
	} 
});

router.post('/addItem', async (req, res) => {
	try {
		success = await dbModel.addItem(req.body);
		console.log(success);
		if(success) {
			res.redirect('/');
		} else {
			res.render('error', { message: "Error writing to MySQL" });
			console.log("Error writing to MySQL");
		}
	} catch (error) {
		res.render('error', { message: "Error writing to MySQL" });
		console.log("Error writing to MySQL");
		console.log(err);
	}
});

module.exports = router;
