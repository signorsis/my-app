import mongoose from "mongoose";

const DB = process.env.MONGO_URI?.replace(
  "<password>",
  process.env.PASSWORD || ""
);

export async function connect() {
  try {
    mongoose.connect(DB as string);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on('error',(err)=>{console.log('MongoDB connection error, please make sure MongoDb is running.'+err);
    process.exit();    
})
  } catch (error) {
    console.log('something went wrong');
    console.log(error);
    
    
  }
}
