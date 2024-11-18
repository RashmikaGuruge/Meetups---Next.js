import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI); // Ensure this connection is correct
            const db = client.db('meetups'); // Verify your database name
            const meetupsCollection = db.collection('meetups'); // Verify your collection name

            const result = await meetupsCollection.insertOne(data);
            client.close();

            res.status(201).json({ message: 'Meetup inserted!', result });
        } catch (error) {
            console.error('Server Error:', error);
            res.status(500).json({ message: 'Inserting data failed!' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed!' });
    }
}

export default handler;
