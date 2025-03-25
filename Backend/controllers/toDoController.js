import ToDo from "../models/to-doModel.js";
import jwt from 'jsonwebtoken'

const createToDo = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    try {
        const { heading } = req.body;

        const newTodoHeading = new ToDo({ heading: heading.trim(), user: userId });

        await newTodoHeading.save();

        if (!newTodoHeading) {
            return res.json({
                success: false,
                message: "TO-DO not create in db"
            })
        }

        res.json({
            success: true,
            message: "Created todo successfully!"
        })

    } catch (error) {
        res.json(`Erron in createTODO : ${error.message}`);
    }
}

const getTODO = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({
                success: false,
                message: "Unauthorized not logged in"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const getAllTodo = await ToDo.find({ user: userId });

        if (!getAllTodo) {
            res.json({
                success: false,
                message: "can't get todo's"
            })
        }

        res.json({
            success: true,
            message: "getting to todo's",
            TODOS: getAllTodo
        })

    } catch (error) {
        res.json({
            success: false,
            message: `Error in get TODO : ${error.message}`
        })
    }
}

const updateTODO = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading } = req.body;
        const newUpdatedTODO = await ToDo.findByIdAndUpdate(id, { heading });

        if (!newUpdatedTODO) {
            res.json({
                success: false,
                message: "TODO not finds"
            })
        }

        res.json({
            success: true,
            message: "TODO's updated!"
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Error in update TODO : ${error.message}`
        })
    }
}

const deleteTODO = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTODO = await ToDo.findByIdAndDelete(id);

        if (!deletedTODO) {
            res.json({
                success: false,
                messaege: "Can't deleted todo's"
            })
        }

        res.json({
            success: true,
            messaege: "TODO deleted successfully!",
        })

    } catch (error) {
        res.json({
            success: false,
            messaege: `Erron in DeleteTODO : ${error.messaege}`
        })
    }
}

export { createToDo, getTODO, updateTODO, deleteTODO }