// ----------------- USERS & LOGIN ----------------------
// Sample users for login
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// Login function
function login(username, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            return { status: "success", message: "Login successful", user: users[i] };
        }
    }
    return { status: "failed", message: "Invalid credentials" };
}

// ----------------- BUS CATEGORIES ---------------------------
// Bus data organized by category
let buses = {
    luxury: [
        { busName: "Luxury-21", price: 500, availableSeats: 30 },
        { busName: "Luxury-22", price: 500, availableSeats: 30 },
        { busName: "Luxury-23", price: 500, availableSeats: 30 },
        { busName: "Luxury-24", price: 500, availableSeats: 30 }
    ],
    airconditioned: [
        { busName: "Air-Conditioned-31", price: 400, availableSeats: 30 },
        { busName: "Air-Conditioned-32", price: 400, availableSeats: 30 },
        { busName: "Air-Conditioned-33", price: 400, availableSeats: 30 },
        { busName: "Air-Conditioned-34", price: 400, availableSeats: 30 }
    ],
    minibus: [
        { busName: "Mini-41", price: 300, availableSeats: 20 },
        { busName: "Mini-42", price: 300, availableSeats: 20 },
        { busName: "Mini-43", price: 300, availableSeats: 20 },
        { busName: "Mini-44", price: 300, availableSeats: 20 }
    ],
    uux: [
        { busName: "UVX-51", price: 600, availableSeats: 25 },
        { busName: "UVX-52", price: 600, availableSeats: 25 },
        { busName: "UVX-53", price: 600, availableSeats: 25 },
        { busName: "UVX-54", price: 600, availableSeats: 25 }
    ]
};

// ------------------ RESERVATIONS ---------------------------
// List to store reservations
let reservations = [];

// Function to reserve a seat
function reserveSeat(category, busIndex, seatNumber, name) {
    let bus = buses[category][busIndex];

    // Check if user already reserved this seat
    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === bus.busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            return "This seat is already reserved by you.";
        }
    }

    // Check seat availability
    if (bus.availableSeats <= 0) {
        return "No available seats.";
    }

    // Add reservation
    reservations.push({
        passenger: name,
        category: category,
        busName: bus.busName,
        seatNumber: seatNumber,
        price: bus.price,
        paid: false,
        paymentPhoto: null
    });

    bus.availableSeats--;
    return "Seat reserved successfully!";
}

// Function to cancel reservation
function cancelSeat(name, busName, seatNumber) {
    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            // Remove from reservation list
            reservations.splice(i, 1);

            // Find the bus and restore available seat
            for (let cat in buses) {
                for (let j = 0; j < buses[cat].length; j++) {
                    if (buses[cat][j].busName === busName) {
                        buses[cat][j].availableSeats++;
                        break;
                    }
                }
            }
            return "Reservation canceled!";
        }
    }
    return "Reservation not found.";
}

// ------------------ PAYMENT -------------------------
// Function to upload payment photo and mark as paid
function makePayment(name, busName, seatNumber, paymentPhoto) {
    for (let i = 0; i < reservations.length; i++) {
        if (
            reservations[i].passenger === name &&
            reservations[i].busName === busName &&
            reservations[i].seatNumber === seatNumber
        ) {
            reservations[i].paid = true;
            reservations[i].paymentPhoto = paymentPhoto;
            return "Payment completed and photo uploaded!";
        }
    }
    return "Reservation not found for payment.";
}

// -------------------- VIEW ----------------------
// Function to print all reservation details
function printReservations() {
    if (reservations.length === 0) {
        console.log("No reservations yet.");
        return;
    }
    for (let i = 0; i < reservations.length; i++) {
        let r = reservations[i];
        console.log(`Passenger: ${r.passenger}`);
        console.log(`Bus: ${r.busName} (${r.category})`);
        console.log(`Seat Number: ${r.seatNumber}`);
        console.log(`Price: ₱${r.price}`);
        console.log(`Paid: ${r.paid ? "Yes" : "No"}`);
        console.log(`Payment Photo: ${r.paymentPhoto ? r.paymentPhoto : "None"}`);
        console.log("-----");
    }
}
