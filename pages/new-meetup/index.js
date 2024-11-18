import { useRouter } from 'next/router';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();

    async function handleNewMeetup(enteredMeetupData) {
        try {
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(enteredMeetupData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to send meetup data!');
            }

            const data = await response.json();
            console.log(data);

            router.push('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    }

    return (
        <NewMeetupForm onAddMeetup={handleNewMeetup} />
    );
};

export default NewMeetupPage;
