import db from '../models/index';
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (err) {
        console.log(err);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let getAboutpage = (req, res) => {
    return res.render('test/about.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('display-crud.ejs', {
        datatable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        //check userdata not found
        return res.render('editCRUD', {
            user: userData
        });
    }
    return res.send('User not found');
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let userId = req.query.id;
    let allUsers = await CRUDService.updateUserData(data, userId);
    return res.render('display-crud.ejs', {
        datatable: allUsers
    });
}


let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user succeed !');
    } else {
        return res.send('Not found user !');
    }

}

module.exports = {
    getHomePage: getHomePage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}