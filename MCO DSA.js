// List of users with usernames and passwords
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// Buses grouped by category with name, price, and available seats
let buses = {
    luxury: [
        { busName: "Luxury-21", price: 600, availableSeats: 30 },
        { busName: "Luxury-22", price: 600, availableSeats: 30 },
        { busName: "Luxury-23", price: 600, availableSeats: 30 },
        { busName: "Luxury-24", price: 600, availableSeats: 30 }
    ],
    aircon: [
        { busName: "Aircon-31", price: 400, availableSeats: 30 },
        { busName: "Aircon-32", price: 400, availableSeats: 30 },
        { busName: "Aircon-33", price: 400, availableSeats: 30 },
        { busName: "Aircon-34", price: 400, availableSeats: 30 }
    ],
    minibus: [
        { busName: "Mini-41", price: 300, availableSeats: 25 },
        { busName: "Mini-42", price: 300, availableSeats: 25 },
        { busName: "Mini-43", price: 300, availableSeats: 25 },
        { busName: "Mini-44", price: 300, availableSeats: 25 }
    ],
    uvx: [
        { busName: "UVX-51", price: 150, availableSeats: 20 },
        { busName: "UVX-52", price: 150, availableSeats: 20 },
        { busName: "UVX-53", price: 150, availableSeats: 20 },
        { busName: "UVX-54", price: 150, availableSeats: 20 }
    ]
};

// This array stores all seat reservations
let reservations = [];

// Prompts the user for login credentials and checks them
function login() {
    let username = prompt("Enter username:");
    let password = prompt("Enter password:");
    for (let user of users) {
        if (user.username === username && user.password === password) {
            alert("Login successful!");
            return username;
        }
    }
    alert("Invalid credentials.");
    return null;
}

// Lets the user pick a bus category and select a specific bus
function chooseCategory() {
    let category = prompt("Choose category (luxury, aircon, minibus, uvx):").toLowerCase();
    if (!buses[category]) {
        alert("Invalid category.");
        return null;
    }

    // Show available buses in the selected category
    let list = "Available buses:\n";
    buses[category].forEach((bus, i) => {
        list += `${i + 1}. ${bus.busName} - ₱${bus.price} - Seats: ${bus.availableSeats}\n`;
    });
    alert(list);

    // Ask the user to select a bus by number
    let busIndex = parseInt(prompt("Choose a bus number:")) - 1;
    if (busIndex < 0 || busIndex >= buses[category].length) {
        alert("Invalid bus selection.");
        return null;
    }

    return { category, busIndex };
}
// Reserves a seat for the logged-in user
function reserveSeat(name, category, busIndex) {
    let seatNumber = prompt("Enter seat number to reserve:");
    let bus = buses[category][busIndex];

    // Check if the seat is already reserved by the user
    for (let r of reservations) {
        if (r.passenger === name && r.busName === bus.busName && r.seatNumber === seatNumber) {
            alert("Seat already reserved by you.");
            return;
        }
    }

    // Check if there are seats available
    if (bus.availableSeats <= 0) {
        alert("No seats left.");
        return;
    }

    // Save the reservation
    reservations.push({
        passenger: name,
        category,
        busName: bus.busName,
        seatNumber,
        price: bus.price,
        paid: false,
        paymentPhoto: null
    });

    bus.availableSeats--;
    alert("Seat reserved successfully!");
}

// Cancels a reservation based on user's name, bus, and seat number
function cancelSeat(name) {
    let busName = prompt("Enter bus name to cancel:");
    let seatNumber = prompt("Enter seat number to cancel:");

    for (let i = 0; i < reservations.length; i++) {
        let r = reservations[i];
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            reservations.splice(i, 1); // Remove reservation

            // Find the bus and increase its available seats
            for (let cat in buses) {
                for (let j = 0; j < buses[cat].length; j++) {
                    if (buses[cat][j].busName === busName) {
                        buses[cat][j].availableSeats++;
                        alert("Reservation canceled.");
                        return;
                    }
                }
            }
        }
    }

    alert("Reservation not found.");
}

// Updates reservation with payment info and photo
function makePayment(name) {
    let busName = prompt("Enter bus name for payment:");
    let seatNumber = prompt("Enter seat number for payment:");
    let photo = prompt("Enter payment photo filename or URL:");

    for (let r of reservations) {
        if (r.passenger === name && r.busName === busName && r.seatNumber === seatNumber) {
            r.paid = true;
            r.paymentPhoto = photo;
            alert("Payment completed.");
            return;
        }
    }

    alert("Reservation not found.");
}

// Displays all reservations in a readable format
function printReservations() {
    if (reservations.length === 0) {
        alert("No reservations yet.");
        return;
    }

    let result = "";
    reservations.forEach(r => {
        result += `Passenger: ${r.passenger}\nBus: ${r.busName} (${r.category})\nSeat: ${r.seatNumber}\nPrice: ₱${r.price}\nPaid: ${r.paid ? "Yes" : "No"}\nPhoto: ${r.paymentPhoto || "None"}\n-----\n`;
    });

    alert(result);
}

// Controls the program flow and user choices
function main() {
    let user = login(); // Login first
    if (!user) return;

    // Menu loop
    while (true) {
        let choice = prompt(
            "Choose an option:\n1. Reserve Seat\n2. Cancel Seat\n3. Make Payment\n4. View Reservations\n5. Exit"
        );

        if (choice === "1") {
            let info = chooseCategory();
            if (info) reserveSeat(user, info.category, info.busIndex);
        } else if (choice === "2") {
            cancelSeat(user);
        } else if (choice === "3") {
            makePayment(user);
        } else if (choice === "4") {
            printReservations();
        } else if (choice === "5") {
            alert("Goodbye!");
            break;
        } else {
            alert("Invalid option.");
        }
    }
}


main();
