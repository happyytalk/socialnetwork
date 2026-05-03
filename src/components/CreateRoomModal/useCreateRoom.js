import { useState } from 'react';
import { createGuestRoom } from '../../utils/guestRoomManager';
import { useRooms } from '../../contexts/RoomsContext';

export const useCreateRoom = ({ isOpen, onClose, onRoomCreated, currentUser, namesByLanguage }) => {
    const { createRoom } = useRooms();
    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [durationHours, setDurationHours] = useState(1);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [language, setLanguage] = useState('English');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [banStatus] = useState({ isBanned: false, remaining: 0 });
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [scheduledAt, setScheduledAt] = useState(null);
    const [level, setLevel] = useState('Beginner (A1)');

    const suggestTitle = () => {
        const customTitles = [
            "🗣 Casual Talk (Any Level)", "🎯 Practice Speaking", "📚 Grammar Practice", 
            "💼 Business English", "🎤 Public Speaking", "🤝 Networking Room", "❤️ Mental Health Talk",
            "Beginner's First Steps", "Newbie Language Lounge", "I'm New Here – Let's Learn!",
            "Absolute Beginner Corner", "Hello World – Language Starters", "Fresh Start Language Room",
            "Zero to Hero Beginners", "Just Started Learning", "New Learner Hub", "Beginner Buddies",
            "First Words Club", "I'm a Beginner Too!", "Super Newbie Zone", "Learning from Scratch",
            "Welcome New Learners", "No Experience Needed", "Beginner Friendly Chat", "My First 100 Words",
            "Midnight Polyglots", "Polyglot Pub", "Language Exchange Buffet", "Worldly Wisdom Chat",
            "Fluent Friends", "Accent Improvement Lab", "Slang & Idioms Workshop", "Culture Swap Cafe",
            "The Grammar Gurus", "Vocabulary Voyagers", "Movie & Music Talk", "The Pronunciation Pros"
        ];
        setTitle(customTitles[Math.floor(Math.random() * customTitles.length)]);
    };

    const resetForm = () => {
        setTitle('');
        setTopic('');
        setIsPrivate(false);
        setDurationHours(1);
        setDurationMinutes(0);
        setLanguage('English');
        setMaxCapacity(0);
        setScheduledAt(null);
        setError(null);
        setLevel('Beginner (A1)');
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (banStatus.isBanned) { setError('You cannot create rooms while banned.'); return; }
        if (!title.trim()) { setError('Room title cannot be empty.'); return; }

        const hours = parseInt(durationHours, 10);
        const minutes = parseInt(durationMinutes, 10);

        if (isNaN(hours) || isNaN(minutes) || (hours === 0 && minutes === 0) || hours < 0 || minutes < 0 || hours > 24 || minutes >= 60) {
            setError('Invalid room duration. Hours (0-24), Minutes (0-59). Total must be > 0.');
            return;
        }
        if ((hours * 60 + minutes) < 5) { setError('Minimum room duration is 5 minutes.'); return; }

        setIsLoading(true);
        setError(null);

        try {
            if (!currentUser) {
                // Guest room — local only
                const newRoom = createGuestRoom({
                    title: title.trim(),
                    topic: language,
                    language,
                    max_capacity: parseInt(maxCapacity, 10) || 0,
                    scheduled_start_time: scheduledAt ? scheduledAt.toISOString() : null,
                    level,
                    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${title.trim()}`
                }, namesByLanguage);
                onRoomCreated(newRoom);
                resetForm();
                onClose();
                return;
            }

            // Use RoomsContext.createRoom → handles Supabase + broadcast
            // Creator is NOT auto-added to participants (people: [])
            const roomData = {
                title: title.trim(),
                topic: language || null,
                is_private: isPrivate,
                language,
                max_capacity: parseInt(maxCapacity, 10) || 0,
                scheduled_start_time: scheduledAt ? scheduledAt.toISOString() : null,
                level,
            };

            const newRoom = await createRoom(roomData, currentUser);
            onRoomCreated(newRoom);
            resetForm();
            onClose();
        } catch (err) {
            console.error("Create room error:", err);
            setError(err.message || 'Failed to create room. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        title, setTitle,
        topic, setTopic,
        isPrivate, setIsPrivate,
        durationHours, setDurationHours,
        durationMinutes, setDurationMinutes,
        language, setLanguage,
        maxCapacity, setMaxCapacity,
        scheduledAt, setScheduledAt,
        error, isLoading,
        isSuggesting,
        suggestTitle,
        handleSubmit,
        level, setLevel
    };
};
