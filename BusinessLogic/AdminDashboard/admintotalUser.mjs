import { User } from "../../Services/userService.mjs";
import multer from 'multer';

// Set up multer to handle form-data
const upload = multer();

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users with the role 'User'
        const users = await User.find({ role: 'User' });

        // Respond with the users
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export const getAllDeveloper=async (req, res) => {
    try {
        // Fetch all users with the role 'User'
        const users = await User.find({ role: 'Developer' });

        // Respond with the users
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};


export const deleteUserByEmail = async (req, res) => {
    const { email } = req.params; // Get the user email from request parameters

    try {
        // Find and delete the user by email
        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};



export const updateUserRoleByEmail = [
    upload.none(), // Middleware to parse form-data
    async (req, res) => {
        const { email, newRole } = req.body; // Form data received from Postman

        try {
            console.log(email);
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update role
            user.role = newRole;
            await user.save();

            // Respond with the updated user
            res.status(200).json({ message: 'User role updated successfully', user });
        } catch (error) {
            console.error('Error updating user role:', error);
            res.status(500).json({ message: 'Failed to update user role' });
        }
    }
];
