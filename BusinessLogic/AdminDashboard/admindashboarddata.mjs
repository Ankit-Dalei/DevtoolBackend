import mongoose from 'mongoose';
import { User } from '../../Services/userService.mjs';


export const getTotalUsersByRole = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const userCount = await User.countDocuments({ role: 'User' });

        // Respond with the count
        res.status(200).json({ totalUsers: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch user count' });
    }
};

export const getTotalDeveloperByRole = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const userCount = await User.countDocuments({ role: 'Developer' });

        // Respond with the count
        res.status(200).json({ totalUsers: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch user count' });
    }
};
