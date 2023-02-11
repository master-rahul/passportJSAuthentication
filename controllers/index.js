module.exports.home = function(request, response) {
    return response.render('index', {title : 'Welcome'});
}