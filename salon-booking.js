module.exports =function salonBooking(db) {

    
   //selecting all the findAllTreatments


   async function findAllTreatments(treatment_names){
    let hair_treatment = await db.manyOrNone('SELECT treatment_name from treatment where treatment_name =$1',
    [treatment_names]);

    return hair_treatment
   }

   //finding the stylist by phone_number

   async function findStylist (phone_numbers) {

    let stylist_number = await db.manyOrNone('Select phone_number from stylist where phone_number =$1',
    [phone_numbers]);

    return stylist_number
}

//finding all the data for client by phone_number

async function findClient(phoneNumber){
    let client_number = await db.manyOrNone('Select phone_number from client where phone_number =$1',
    [phoneNumber]);

    return client_number

}

// find A treatment by code 
async function findTreatment(phoneNumber){

    let coded = await db.oneOrNone('SELECT code from treatment where code = $1', [phoneNumber]);
    return coded;

}

//Find all the bookings that were made for a given date
async function findAllBookings(date){

    let dated = await db.oneOrNone('select the_date from date_test where the_date =$1',
    [date]);
    return dated

}

//Find all the bookings for a client - use clientId as lookup

async function findClientBookings(clientId){

    let client_id = await db.oneOrNone('Select id from client where firstName=$1',
   [clientId])
   return client_id

}

//Find all the booking made for a specific date & time

async function findAllBookings({date, time}){

    
}

    return {
        findAllTreatments,
        findStylist,
        findClient,
        findTreatment,
        findAllBookings,
        findClientBookings,

    }
}  