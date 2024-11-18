import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetails = (props) => {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
};

export async function getStaticPaths() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db('meetups');
        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

        client.close();

        return {
            fallback: 'blocking',
            paths: meetups.map((meetup) => ({
                params: { meetupId: meetup._id.toString() },
            })),
        };
    } catch (error) {
        console.error('Error fetching paths:', error);
        return { fallback: false, paths: [] };
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db('meetups');
        const meetupsCollection = db.collection('meetups');

        const selectMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

        client.close();

        return {
            props: {
                meetupData: {
                    id: selectMeetup._id.toString(),
                    title: selectMeetup.title,
                    address: selectMeetup.address,
                    image: selectMeetup.image,
                    description: selectMeetup.description,
                },
            },
        };
    } catch (error) {
        console.error('Error fetching meetup data:', error);
        return {
            notFound: true,
        };
    }
}

export default MeetupDetails;
