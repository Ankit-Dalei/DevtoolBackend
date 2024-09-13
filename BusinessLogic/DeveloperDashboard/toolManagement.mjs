import { Tool } from "../../Services/toolService.mjs";


export const createTool = async (req, res) => {
    const {
        toolLogo,
        toolName,
        toolMainCatagory,
        toolStatus,
        toolSubCatagory,
        toolSubSubCatagory,
        toolColorCode,
        toolCode,
        toolDeveloperEmail,
        Description,
    } = req.body;

    // Basic validation
    if (!toolName) {
        return res.status(400).json({ message: 'Tool name is required' });
    }
    if (!toolMainCatagory) {
        return res.status(400).json({ message: 'Tool main category is required' });
    }
    if (!toolStatus) {
        return res.status(400).json({ message: 'Tool status is required' });
    }
    if (!toolSubCatagory) {
        return res.status(400).json({ message: 'Tool Sub category  is required' });
    }
    if (!toolSubSubCatagory) {
        return res.status(400).json({ message: 'Tool Sub Sub category is required' });
    }
    if (!toolColorCode) {
        return res.status(400).json({ message: 'Tool Hex Code is required' });
    }
    if (!toolCode) {
        return res.status(400).json({ message: 'Tool code is required' });
    }
    if (!toolDeveloperEmail) {
        return res.status(400).json({ message: 'Developer email is required' });
    }
    if (!Description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    try {
        const tool = new Tool({
            toolLogo,
            toolName,
            toolMainCatagory,
            toolStatus,
            toolSubCatagory,
            toolSubSubCatagory,
            toolColorCode,
            toolCode,
            toolDeveloperEmail,
            Description,
        });

        await tool.save();
        res.status(201).json({ message: 'Tool created successfully', tool });
    } catch (error) {
        console.error('Error creating tool:', error);
        res.status(500).json({ message: 'Failed to create tool' });
    }
};


export const getAllTools = async (req, res) => {
    try {
        const tools = await Tool.find({});
        res.status(200).json({ tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
    }
};

export const getTotaltoolCount = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const ToolCount = await Tool.countDocuments();

        // Respond with the count
        res.status(200).json({ totalTools: ToolCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch tool count' });
    }
};


export const getTotalCalculatorCount = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'MC1' });

        // Respond with the count
        res.status(200).json({ totalTools: ToolCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch tool count' });
    }
};

export const getTotalConverterCount = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'MC2' });

        // Respond with the count
        res.status(200).json({ totalTools: ToolCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch tool count' });
    }
};

export const getTotalGeneratorCount = async (req, res) => {
    try {
        // Query to count users with the role "User"
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'MC3' });

        // Respond with the count
        res.status(200).json({ totalTools: ToolCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch tool count' });
    }
};
export const getToolById = async (req, res) => {
    const { id } = req.params;
    try {
        const tool = await Tool.findById(id);
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        res.status(200).json({ tool });
    } catch (error) {
        console.error('Error fetching tool:', error);
        res.status(500).json({ message: 'Failed to fetch tool' });
    }
};

export const getToolByIdAndMainCatagory = async (req, res) => {
    const { id, toolMainCatagory } = req.params; // Receiving id and toolSubSubCatagory from URL parameters

    try {
        // Fetch the tool by ID
        const tool = await Tool.findById(id);

        // Check if the tool exists
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        // Check if the provided toolSubSubCatagory matches the one stored in the database
        if (tool.toolMainCatagory !== toolMainCatagory) {
            return res.status(400).json({ message: 'Provided toolSubSubCatagory does not match the one in the database' });
        }

        // Respond with the tool data
        res.status(200).json({ tool });
    } catch (error) {
        console.error('Error fetching tool:', error);
        res.status(500).json({ message: 'Failed to fetch tool' });
    }
};

export const getToolByIdAndSubCatagory = async (req, res) => {
    const { id, toolSubCatagory } = req.params; // Receiving id and toolSubSubCatagory from URL parameters

    try {
        // Fetch the tool by ID
        const tool = await Tool.findById(id);

        // Check if the tool exists
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        // Check if the provided toolSubSubCatagory matches the one stored in the database
        if (tool.toolSubCatagory !== toolSubCatagory) {
            return res.status(400).json({ message: 'Provided toolSubSubCatagory does not match the one in the database' });
        }

        // Respond with the tool data
        res.status(200).json({ tool });
    } catch (error) {
        console.error('Error fetching tool:', error);
        res.status(500).json({ message: 'Failed to fetch tool' });
    }
};

export const getToolByIdAndSubSubCatagory = async (req, res) => {
    const { id, toolSubSubCatagory } = req.params; // Receiving id and toolSubSubCatagory from URL parameters

    try {
        // Fetch the tool by ID
        const tool = await Tool.findById(id);

        // Check if the tool exists
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        // Check if the provided toolSubSubCatagory matches the one stored in the database
        if (tool.toolSubSubCatagory !== toolSubSubCatagory) {
            return res.status(400).json({ message: 'Provided toolSubSubCatagory does not match the one in the database' });
        }

        // Respond with the tool data
        res.status(200).json({ tool });
    } catch (error) {
        console.error('Error fetching tool:', error);
        res.status(500).json({ message: 'Failed to fetch tool' });
    }
};

export const updateTool = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const tool = await Tool.findByIdAndUpdate(id, updateData, { new: true });
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        res.status(200).json({ message: 'Tool updated successfully', tool });
    } catch (error) {
        console.error('Error updating tool:', error);
        res.status(500).json({ message: 'Failed to update tool' });
    }
};

export const deleteTool = async (req, res) => {
    const { id } = req.params;
    try {
        const tool = await Tool.findByIdAndDelete(id);
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        res.status(200).json({ message: 'Tool deleted successfully', tool });
    } catch (error) {
        console.error('Error deleting tool:', error);
        res.status(500).json({ message: 'Failed to delete tool' });
    }
};
