-- Table create scripts here

Create table client(
    id serial primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    phone_number VARCHAR(30) NOT NULL

);


Create table treatment(
 id serial primary key,
 treatment_name VARCHAR(30) NOT NULL,
 Code text NOT NULL,
 price decimal

);


Create table stylist(
     id serial primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    commission_percentage numeric

);


create table booking(
id serial primary key,
booking_date date,
booking_time time,
client_id int NOT NULL,
treatment_id Integer NOT NULL,
stylist_id Integer NOT NULL,
FOREIGN key(client_id) REFERENCES client(id),
FOREIGN KEY(treatment_id) REFERENCES treatment(id),
FOREIGN KEY (stylist_id) REFERENCES stylist(id)
);


create table date_test ( 
    id serial primary key,
    the_date date,  
slot time  
);



