exports.guiController = (req,res,next) => {
    res.render('gui-robot', {
        pageTitle : 'Percobaan GUI',
        path : '/gui-robot'
    });
}