module.exports = function findTemplate(_, template) {
    if (typeof template !== 'undefined') return template;

    while (typeof _.getSuper === 'function') {
        if (typeof _.getSuper().template !== 'undefined') {
            return _.getSuper().template;
        } else {
            _ = _.getSuper();
        }
    }

    return 'Template Not Supplied.'
};
