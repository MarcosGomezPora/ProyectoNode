const Director = require("./director.model");

const indexGet = async (req, res, next) => {
    try {
        const directors = await Director.find();
        return res.status(200).json(directors);
    } catch(error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Director.findById(id);
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const getByName = async (req, res, next) => {
    try {
        // recogemos el id de los parámetros de la petición -> req -> request
        const { name } = req.params;
        const found = await Director.find({name: name});
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const DirectorToBeCreated = new Director(req.body);

        const created = await DirectorToBeCreated.save();

        return res.status(201).json(created);
    } catch (error) {
        return next(error);
    }
};

const editPut = async(req, res, next) => {
    try {
        const { id } = req.params; // req.params.id
        const fields = {...req.body};
        const options = { new: true };
        console.log('fields en director', options);
        const edited = await Director.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    }
    catch(error) {
        return next(error);
    }
}

const deleteDirector = async (req, res, next) => {
    try {
        const { id } = req.params;
          await Director.findOneAndDelete({ _id: id });
        
            return res.status(200).json("Elemento eliminado con éxito");
        
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    indexGet,
    getById,
    createPost,
    editPut,
    deleteDirector,
    getByName
};