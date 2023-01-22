const Movie = require("./movie.model");

const indexGet = async (req, res, next) => {
    try {
        // creo una variable teachers con el valor de el resultado de buscar en la colección teachers de mi base de datos utilizando el modelo Teacher creado en el archivo del modelo todos los elementos (.find() -> busca todos los elementos de algún sitio)
        const movies = await Movie.find().populate({path:'director', select: 'name'}).populate({path:'actor', select: 'name'});
        return res.status(200).json(movies);
    } catch(error) {
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        // recogemos el id de los parámetros de la petición -> req -> request
        const { id } = req.params;
        const found = await Movie.findById(id);
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const getByName = async (req, res, next) => {
    try {
        // recogemos el id de los parámetros de la petición -> req -> request
        const { name } = req.params;
        const found = await Movie.find({name: name});
        return res.status(200).json(found);
    } catch (error) {
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const MovieToBeCreated = new Movie(req.body);

        const created = await MovieToBeCreated.save();

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
        console.log('fields en movie', options);
        const edited = await Movie.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    }
    catch(error) {
        return next(error);
    }
}

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
          await Movie.findOneAndDelete({ _id: id });
        
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
    deleteMovie,
    getByName
};