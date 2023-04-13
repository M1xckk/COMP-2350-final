const database = require('./databaseConnection');

const select = async() => {
	const sqlQuery = `
		SELECT *
		FROM purchase_item
	`;

	try {
		const results = await database.query(sqlQuery);
		return results[0];
	} catch (err) {
		console.log("Error selecting from <table_name>");
		console.log(err);
		return null;
	}
}

const increment = async(postData) => {
	const sqlQuery = `
	UPDATE purchase_item
	SET quantity = quantity + 1
	WHERE purchase_item_id = :quantity;
	`;

	params = {
		quantity: postData.id
	}

	try {
		const results = await database.query(sqlQuery, params);
		return results[0];
	} catch (err) {
		console.log("Error selecting from <table_name>");
		console.log(err);
		return null;
	}
}

const decrement = async(postData) => {
	const sqlQuery = `
	UPDATE purchase_item
	SET quantity = quantity - 1
	WHERE purchase_item_id = :quantity;
	`;

	params = {
		quantity: postData.id
	}

	try {
		const results = await database.query(sqlQuery, params);
		return results[0];
	} catch (err) {
		console.log("Error selecting from <table_name>");
		console.log(err);
		return null;
	}
}

const addItem = async(postData) => {
	const sqlQuery = `
		INSERT INTO purchase_item (item_name, item_description, cost, quantity)
		VALUES (:item_name, :item_description, :cost, :quantity);
	`;

	const params = {
		item_name: postData.item_name,
		item_description: postData.item_description,
		cost: postData.cost,
		quantity: postData.quantity
	};

	try {   
		const results = await database.query(sqlQuery, params);  
		return results;  
	}  catch (err) {   
		console.log(err);    
		return false;  
	} 
};

const deleteItem = async(id) => {     
	const sqlQuery = `DELETE FROM purchase_item WHERE purchase_item_id = :id`;      
	
	const params = {         
		id: id.id,
	};   

	try {   
		await database.query(sqlQuery, params);
		return true;  
	}  catch (err) {   
		console.log(err);   
		return false;  
	}         
};

module.exports = { 
	select,
	increment,
	decrement,
	deleteItem,
	addItem
};
