import mongoose from 'mongoose';


const connect = async()=>{
    try{
        const URI = process.env.MONGO_URI as string;
        const connection = await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log(`Database connected to connection host ${connection.connection.host}`)
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connect;