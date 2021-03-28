exports.conveyorController = (req,res,next) => {
    res.render('conveyor', {
        pageTitle : 'Conveyor',
        path: '/conveyor'
    });
}