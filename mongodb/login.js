// Assuming you have a MongoDB connection established

// Select or create a database
var db = db.getSiblingDB('your_database_name');

// Create a collection for storing user data
var usersCollection = db.users;

// Function to register a new user
function registerUser(username, password) {
    // Hash the password before storing (you should use a secure hashing algorithm)
    var hashedPassword = sha256(password);
    
    // Insert user data into the collection
    usersCollection.insert({
        username: username,
        password: hashedPassword
    });
}

// Function to check login credentials
function loginUser(username, password) {
    // Hash the provided password for comparison
    var hashedPassword = sha256(password);
    
    // Find the user in the collection
    var user = usersCollection.findOne({
        username: username,
        password: hashedPassword
    });

    return user !== null;
}

// Example usage
registerUser('john_doe', 'password123');
var loginResult = loginUser('john_doe', 'password123');

print(loginResult ? "Login successful" : "Login failed");