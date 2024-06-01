import mongoose, { connect } from 'mongoose';

const Connect = async () => {
    try {
        await connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('SuccessFully Connected to the Database.')
        })

        connection.on('error', (error) => {
            console.log('Error Connecting to the Database: ', error);
            process.exit();
        })

    } catch (error) {
        console.log('Error in Connecting with the Database: ', error)
    };
};

export default Connect;