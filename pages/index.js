import { MongoClient } from 'mongodb';
import MeetupList from './../components/meetups/MeetupList';
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name = "description"
          content='Browse huge number of meetups throughh this.'
        />
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )
}

export async function getStaticProps(){
  const client = await MongoClient.connect(process.env.MONGODB_URI); // Ensure this connection is correct
  const db = client.db('meetups'); // Verify your database name
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props : {
      meetups : meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}

export default HomePage