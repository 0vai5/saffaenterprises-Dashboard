import mongoose from 'mongoose';

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {};

const Connect = async (): Promise<void> => {
    if(connection.isConnected){
        console.log('Already Connected to the Database');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to the Database');
    } catch (error) {
        console.log('Error in connecting to the Database', error);
        process.exit(1);
    }
}

export default Connect;