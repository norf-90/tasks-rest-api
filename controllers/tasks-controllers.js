const {
  Task,
  // contactAddSchema,
  // updateFavoriteContactSchema,
} = require("../models/task");

const { HttpError } = require("../helpers");

const getAllTasks = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // const { page = 1, limit = 20, favorite } = req.query;
    // const skip = (page - 1) * limit;
    const result = await Task.find({ owner }, "-createdAt -updatedAt", {
      // skip,
      // limit,
    }).populate("owner");
    // const resultFavorite = await Contact.find(
    //   { owner, favorite: "true" },
    //   "-createdAt -updatedAt",
    //   {
    //     skip,
    //     limit,
    //   }
    // ).populate("owner", "email");
    // favorite ? res.json(resultFavorite) : res.json(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Contact id: ${contactId} not found`);
    }
    if (result.owner !== owner) {
      throw HttpError(400);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact id: ${contactId} not found`);
    }
    res.json({ message: "Contact deleted", result });
  } catch (error) {
    next(error);
  }
};

// const updateTask = (id, fields) => {
//   return Task.findByIdAndUpdate({ _id: id }, fields, { new: true });
// };

const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, `Contact id: ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, `Contact id: ${contactId} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
};
