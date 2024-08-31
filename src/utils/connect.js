import mongoose from "mongoose";

export async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to Database");

        mongoose.connection.on("error", (error) => {

            console.error("Database connection error:", error);
            
        });
    } catch (error) {
        console.error("Error occurred while connecting to database:", error);
    }
}
