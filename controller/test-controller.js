exports.testController = (req,res,next) => {
    res.render('test', {
        pageTitle : 'Test',
        path : '/test'
    });
}