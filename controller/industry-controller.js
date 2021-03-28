exports.industryController = (req,res,next) => {
    res.render('industry', { 
        pageTitle : 'Industry',
        path : "/industry-simulation"
    });
}