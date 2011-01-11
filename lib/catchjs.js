exports.catches = function (func, match) {
    var caught = false;

    try {
        func.apply(func);
    } catch (e) {
        if (match) {
            if (e === match) {
                caught = true;
            }
            if (typeof e === "object") {
                if (e.type === match || e.name === match) {
                    caught = true;
                }
            }
        } else {
            caught = true;
        }
    }

    return caught;
};
