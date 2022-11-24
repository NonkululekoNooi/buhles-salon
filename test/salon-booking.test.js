const assert = require('assert'); 
const SalonBooking = require('../salon-booking');
const pgp = require("pg-promise")();



const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg123@localhost:5432/buhle_salon";

const config = { 
	connectionString : DATABASE_URL
}

const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`delete from booking`);
        await db.none(`delete from treatment`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments('Pedicure');
        const treatment = await booking.findAllTreatments('make_up');
        const treatmen = await booking.findAllTreatments('Brown&Lashes');
        const treatme = await booking.findAllTreatments('manicure');
      
        assert.deepEqual([{treatment_name: 'Pedicure'} ], treatments);

        assert.deepEqual([{treatment_name: 'Brown&Lashes'} ], treatmen);
        assert.deepEqual([{treatment_name: 'make_up'} ], treatment);
        assert.deepEqual([{treatment_name: 'manicure'} ], treatme);
      
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist('277963258741' );
        const stylis = await booking.findStylist('277614245341' );
        const styli = await booking.findStylist('277841253658' );
     
        assert.deepEqual([{"phone_number": 277963258741}], stylist);
        assert.deepEqual([{"phone_number": 277614245341}], stylis);
        assert.deepEqual([{"phone_number": 277841253658 }], styli);
      
    });
    it("should be return a treatment by code", async function () {
    
        const booked = await booking.findTreatment('BroLA12');

       
        assert.deepEqual({code: 'BroLA12'}, booked);
    });
//  it("should be return all the books by date", async function () {
    
//         const booked = await booking.findAllBookings('2022-02-01');

       
//         assert.deepEqual(
//             'the_date: 2022-01-31T22:00:00.000Z'
//           , booked);
//     });

   

    // it("should be able to allow a client to make a booking", async function () {
    //     // const client = await booking.findClient("make_up, Zeenat,2022-02-01,15:00:00");

    //     const booked = await booking.makeBooking(2022-02-01, '15:00:00',1, 4,3);

    //     const bookings = await booking.findClientBookings(client.id);
    //     assert.equal([], booked);
    // });


    it("should be able to get client booking(s)", async function () {

        const client1 = await booking.findClient("Lesedi");
        
        const treatment1 = await booking.findTreatment('BroLA12');
      
       
        assert.deepEqual({
            code: 'BroLA12'
          }, treatment1)
    })

    // it("should be able to get bookings for a date", async function () {
    //     const client1 = await booking.findClient("***");
    //     const client2 = await booking.findClient("***");

    //     const treatment1 = await booking.findTreatment("***");
    //     const treatment2 = await booking.findTreatment("***");

    //     await booking.booking(treatment1.id, client1.id, date, time);
    //     await booking.booking(treatment2.id, client1.id, date, time);
    //     await booking.booking(treatment3.id, client2.id, date, time);

    //     const bookings = await booking.findAllBookings({date, time});

    //     assert.equal([], bookings);

    // });

    // it("should be able to find the total income for a day", function() {
    //     assert.equal(1, 2);
    // })

    // it("should be able to find the most valuable client", function() {
    //     assert.equal(1, 2);
    // })
    // it("should be able to find the total commission for a given stylist", function() {
    //     assert.equal(1, 2);
    // })

    after(function () {
        db.$pool.end()
    });

});