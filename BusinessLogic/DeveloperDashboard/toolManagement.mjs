import { Tool } from "../../Services/toolService.mjs";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'Calculator' });

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
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'Converter' });

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
        const ToolCount = await Tool.countDocuments({ toolMainCatagory: 'Generator' });

        // Respond with the count
        res.status(200).json({ totalTools: ToolCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Failed to fetch tool count' });
    }
};
export const getToolById = async (req, res) => {
    const { id } = req.params;
    console.log('ID received:', id);
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
    const { toolMainCatagory } = req.params; // Receiving id and toolSubSubCatagory from URL parameters

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

export const getToolBySubCatagory = async (req, res) => {
    const { toolSubCatagory } = req.params; // Receiving toolSubCatagory from URL parameters

    try {
        // Fetch tools by toolSubCatagory
        const tools = await Tool.find({ toolSubCatagory });

        // Check if any tools were found
        if (tools.length === 0) {
            return res.status(404).json({ message: 'No tools found for the provided sub-category' });
        }

        // Respond with the list of tools
        res.status(200).json({ tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
    }
};


export const getToolBySubSubCatagory = async (req, res) => {
    const { toolSubSubCatagory } = req.params;

    try {
        const tools = await Tool.find({ toolSubSubCatagory });

        if (tools.length === 0) {
            return res.status(404).json({ message: 'No tools found for the provided sub-sub-category' });
        }

        res.status(200).json({ tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
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




// 

export const getCalculatorTools = async (req, res) => {
    try {
        const tools = await Tool.find({ toolMainCatagory: 'Calculator' });

        // Respond with the list of tools
        res.status(200).json({ totalTools: tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
    }
};

export const getConverterTools = async (req, res) => {
    try {
        const tools = await Tool.find({ toolMainCatagory: 'Converter' });

        res.status(200).json({ totalTools: tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
    }
};

export const getGeneratorTools = async (req, res) => {
    try {
        const tools = await Tool.find({ toolMainCatagory: 'Generator' });

        res.status(200).json({ totalTools: tools });
    } catch (error) {
        console.error('Error fetching tools:', error);
        res.status(500).json({ message: 'Failed to fetch tools' });
    }
};




// file write code
export const getToolByIdforrender = async (req, res) => {
    const { id } = req.params; // Fetch the tool id from the request body
    // console.log(id)
    try {
        // Fetch tool from the database using the id
        const tool = await Tool.findById(id);
        // console.log(tool)

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        const toolCode = tool.toolCode;
        // console.log(toolCode)
        // Define the path to the target JS file
        const filePath = path.join(__dirname, '../../../DevToolsB Frontend/src/Components/Tools/CategoryAndSubcategory Handling/CGCcodeRenderHandling.jsx');
        // console.log(filePath)
        // Write the toolCode to tooloutput.js
        fs.writeFile(filePath, toolCode, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ message: 'Failed to write toolCode to file' });
            }

            console.log('ToolCode written to tooloutput.js');
            return res.status(200).json({ message: 'ToolCode successfully written to file' });
        });
    } catch (error) {
        console.error('Error fetching tool or writing to file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
