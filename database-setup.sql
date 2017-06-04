/*
	DB Schema for SP

	cd /SP-db
	in terminal:
		mysql -u root -p < database-setup.sql
*/

/* CREATES USER for SP and GRANT privileges */
DROP USER IF EXISTS 'farmaide'@'localhost';
CREATE USER 'farmaide'@'localhost' IDENTIFIED BY 'farmaide';

/* CREATES Database newsDB */
DROP DATABASE IF EXISTS FarmAide;
CREATE DATABASE FarmAide;
USE FarmAide;

GRANT ALL PRIVILEGES ON FarmAide.* TO 'farmaide'@'localhost';

CREATE TABLE IF NOT EXISTS FARM (
	farm_id INT(4) NOT NULL AUTO_INCREMENT,
	farm_name varchar (64) NOT NULL,
	password varchar(20) NOT NULL,
	contact_no varchar(11) NOT NULL,
	PRIMARY KEY (farm_id)
);

CREATE TABLE IF NOT EXISTS USER (
	user_id INT(4) NOT NULL AUTO_INCREMENT,
	farm_id INT(4) NOT NULL,
	user_type varchar(64) NOT NULL,
	username varchar(64) NOT NULL,
	password varchar(64) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS RECIPE (
	recipe_id INT(4) NOT NULL AUTO_INCREMENT,
	farm_id INT(4) NOT NULL,
	recipe_name varchar(64) NOT NULL,
	animal varchar(64) NOT NULL,
	animal_type varchar(64) NOT NULL,
	dm_req REAL(7,4) NOT NULL,
	cp_req REAL(7,4) NOT NULL,
	me_req REAL(7,2) NOT NULL,
	ca_req REAL(7,4) NOT NULL,
	p_req REAL(7,4) NOT NULL,
	animal_weight REAL(7,4) NOT NULL,
	PRIMARY KEY (recipe_id)
);

CREATE TABLE IF NOT EXISTS FEED (
	feed_id INT(4) NOT NULL AUTO_INCREMENT,
	farm_id INT(4) NOT NULL,
	feed_type varchar(64) NOT NULL,
	feed_name varchar(64) NOT NULL,
	dry_matter REAL(7,4) NOT NULL,
	total_digestible_nutrient REAL(7,4) NOT NULL,
	feed_price REAL(7,4) NOT NULL,
	supply_amount REAL(7,2) NOT NULL,
	crude_protein REAL(7,4) NOT NULL,
	met_energy REAL(7,2) NOT NULL,
	calcium REAL(7,4) NOT NULL,
	phosphorus REAL(7,4) NOT NULL,
	pic_ref varchar(256) NOT NULL,
	PRIMARY KEY (feed_id)
);

CREATE TABLE IF NOT EXISTS TRANSACTIONS (
	transaction_id INT(4) NOT NULL AUTO_INCREMENT,
	user_id INT(4) NOT NULL,
	farm_id INT(4) NOT NULL,
	time_stamp varchar(256) NOT NULL,
	note varchar(256) NOT NULL,
	PRIMARY KEY (transaction_id)
);

CREATE TABLE IF NOT EXISTS COW (
	cow_id INT(4) NOT NULL AUTO_INCREMENT,
	farm_id INT(4) NOT NULL,
	cow_name varchar(256) NOT NULL,
	PRIMARY KEY (cow_id)
);

CREATE TABLE IF NOT EXISTS MILK_YIELD (
	milk_yield_id INT(4) NOT NULL AUTO_INCREMENT,
	cow_id INT(4) NOT NULL,
	farm_id INT(4) NOT NULL,
	milk_yield REAL(7,4) NOT NULL,
	days INT(4) NOT NULL,
	fats_yield REAL(7,4) NOT NULL,
	protein_yield REAL(7,4) NOT NULL,
	total_solids_yield REAL(7,4) NOT NULL,
	time_stamp varchar(256) NOT NULL,
	PRIMARY KEY (milk_yield_id)
);

/*	POPULATE TABLES	*/
/*	Insert initial admin users	*/
INSERT INTO FARM (farm_name, password, contact_no)
	VALUES
	('Farm A', 'farm1', '09123456789'),
	('Farm B', 'farm2', '09999999999');

INSERT INTO USER (farm_id, user_type, username, password)
	VALUES
	(1, 'admin', 'admin', 'admin'),
	(1, 'user', 'user', 'user123'),
	(2, 'admin', 'admin1', 'admin'),
	(2, 'user', 'user2', 'useruser');

INSERT INTO RECIPE (farm_id, recipe_name, animal, animal_type, dm_req, cp_req, me_req, ca_req, p_req, animal_weight)
	VALUES
	(1, 'Starter', 'Swine', 'Meat Type', 0, 17.2, 3150, .85, .52, 31),
	(1, 'Grower', 'Swine', 'Meat Type', 0, 15.8, 3000, .75, .5, 50),
	(1, 'Finisher', 'Swine', 'Meat Type', 0, 13.6, 3000, .75, .45, 72.5),
	(1, 'Gestating or Pregnant', 'Swine', 'Meat Type', 0, 14, 2850, .9, .5, 170),
	(1, 'Lactating', 'Swine', 'Meat Type', 0, 16, 3100, 1, .5, 170),
	(1, 'Booster', 'Poultry', 'Broiler', 0, 22.3, 2900, .87, .46, 2),
	(1, 'Starter', 'Poultry', 'Broiler', 0, 20, 2800, .84, .42, 2),
	(1, 'Finisher', 'Poultry', 'Broiler', 0, 18.7, 2800, .78, .39, 2),
	(1, 'Breeder', 'Poultry', 'Broiler', 0, 16, 2750, .9, .45, 2),
	(1, 'Starter', 'Poultry', 'Egg-type', 0, 19.6, 2800, .98, .48, 2),
	(1, 'Grower', 'Poultry', 'Egg-type', 0, 16, 2750, 1, .46, 2),
	(1, 'Developer', 'Poultry', 'Egg-type', 0, 14.3, 2700, .95, .44, 2),
	(1, 'Calves', 'Ruminants', 'Dairy Type', 0, 18, 3110, .6, .4, 150),
	(1, 'Lactating', 'Ruminants', 'Dairy Type', 0, 18, 2800, 1.5, .8, 300),
	(2, 'Starter', 'Swine', 'Meat Type', 0, 17.2, 3150, .85, .52, 31),
	(2, 'Grower', 'Swine', 'Meat Type', 0, 15.8, 3000, .75, .5, 50),
	(2, 'Finisher', 'Swine', 'Meat Type', 0, 13.6, 3000, .75, .45, 72.5),
	(2, 'Gestating or Pregnant', 'Swine', 'Meat Type', 0, 14, 2850, .9, .5, 170),
	(2, 'Lactating', 'Swine', 'Meat Type', 0, 16, 3100, 1, .5, 170),
	(2, 'Booster', 'Poultry', 'Broiler', 0, 22.3, 2900, .87, .46, 2),
	(2, 'Starter', 'Poultry', 'Broiler', 0, 20, 2800, .84, .42, 2),
	(2, 'Finisher', 'Poultry', 'Broiler', 0, 18.7, 2800, .78, .39, 2),
	(2, 'Breeder', 'Poultry', 'Broiler', 0, 16, 2750, .9, .45, 2),
	(2, 'Starter', 'Poultry', 'Egg-type', 0, 19.6, 2800, .98, .48, 2),
	(2, 'Grower', 'Poultry', 'Egg-type', 0, 16, 2750, 1, .46, 2),
	(2, 'Developer', 'Poultry', 'Egg-type', 0, 14.3, 2700, .95, .44, 2),
	(2, 'Calves', 'Ruminants', 'Dairy Type', 0, 18, 3110, .6, .4, 150),
	(2, 'Lactating', 'Ruminants', 'Dairy Type', 0, 18, 2800, 1.5, .8, 300);

INSERT INTO FEED (farm_id, feed_type, feed_name, dry_matter, total_digestible_nutrient, feed_price, supply_amount, crude_protein, met_energy, calcium, phosphorus, pic_ref)
	VALUES
	(1, 'Concentrate', 'Yellow Corn', 87, 75.2, 16, 23, 7.8, 3350, .07, .25, '/images/concentrate_yellowcorn.jpg'),
	(1, 'Concentrate', 'Rice Bran', 89, 77.7, 10, 25, 12.5, 3000, .08, 1.6, '/images/concentrate_ricebran.jpg'),
	(1, 'Concentrate', 'Cassava Meal', 86, 84, 8, 33.56, 1.8, 2800, .12, .1, '/images/concentrate_cassavameal.jpg'),
	(1, 'Roughage', 'Napier Grass', 22, 55, 0, 500.64, 63, 10.31, .3, .25, '/images/roughage_napier.jpg'),
	(1, 'Additive', 'L-Lysine', 0, 0, 20, 200, 78.8, 0, 0, 0, '/images/additive_l_lysine.jpg'),
	(1, 'Additive', 'Dicalcium Phosphate', 0, 0, 25, 250, 0, 0, 24.26, 19.89, '/images/additive_dicalcium_phosphate.jpg'),
	(1, 'Additive', 'Limestone', 0, 0, 1.5, 200, 0, 0, 38, .16, '/images/additive_limestone.jpg');

INSERT INTO COW (farm_id, cow_name)
	VALUES
	(1, 'Cow 1'),
	(1, 'Cow 2'),
	(1, 'Cow 3');

INSERT INTO MILK_YIELD (cow_id, farm_id, milk_yield, days, fats_yield, protein_yield, total_solids_yield, time_stamp)
	VALUES
	(1, 1, 10.2, 35, 0.407, 0.35394, 0.99144, "Aug-24-2016"),
	(1, 1, 12.4, 27, 0.3275, 0.33728, 1.22016, "Sep-20-2016"),
	(1, 1, 9.4, 33, 0.4343, 0.33276, 1.26806, "Oct-23-2016"),
	(1, 1, 7.4, 28, 0.205, 0.27232, 0.9287, "Nov-20-2016"),
	(1, 1, 8.5, 21, 0.2397, 0.3094, 1.06505, "Dec-11-2016"),
	(1, 1, 9.9, 43, 0.4574, 0.35244, 1.39095, "Jan-23-2017"),
	(1, 1, 9.8, 30, 0.5331, 0.3724, 1.51802, "Feb-22-2017"),
	(1, 1, 9.6, 25, 0.4378, 0.33312, 1.31904, "Mar-19-2017"),

	(2, 1, 7.8, 31, 0.3221, 0.28314, 0.79092, "Aug-24-2016"),
	(2, 1, 9.3, 27, 0.2641, 0.2325, 1.07973, "Sep-20-2016"),
	(2, 1, 7.9, 33, 0.2781, 0.2844, 1.0981, "Oct-23-2016"),
	(2, 1, 6.9, 28, 0.2415, 0.20424, 0.8832, "Nov-20-2016"),
	(2, 1, 5.9, 21, 0.2584, 0.21358, 0.82423, "Dec-11-2016"),
	(2, 1, 7.0, 43, 0.364, 0.2681, 1.0745, "Jan-23-2017"),
	(2, 1, 6.9, 30, 0.4368, 0.25944, 1.12194, "Feb-22-2017"),
	(2, 1, 8.3, 25, 0.3984, 0.28718, 1.15868, "Mar-19-2017"),

	(3, 1, 5.1, 29, 0.1831, 0.17544, 0.47379, "Aug-24-2016"),
	(3, 1, 9.8, 32, 0.4665, 0.34006, 1.3622, "Sep-20-2016"),
	(3, 1, 9.7, 28, 0.4811, 0.33756, 1.37158, "Oct-23-2016"),
	(3, 1, 6.6, 28, 0.2482, 0.2145, 0.9141, "Nov-20-2016"),
	(3, 1, 7.7, 21, 0.288, 0.2233, 0.98714, "Dec-11-2016"),
	(3, 1, 8.1, 43, 0.3629, 0.28998, 1.13157, "Jan-23-2017"),
	(3, 1, 7.7, 30, 0.385, 0.27412, 1.11188, "Feb-22-2017"),
	(3, 1, 8.8, 25, 0.4022, 0.3124, 1.23024, "Mar-19-2017");
