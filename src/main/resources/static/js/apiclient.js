apiclient = (function () {
    const BASE_URL = "http://localhost:8080/blueprints";

    return {
        getBlueprintsByAuthor: function (authname, callback) {
            $.get(`${BASE_URL}/${authname}`, function (data) {
                callback(data);
            }).fail(function (error) {
                console.error("Error al obtener los planos:", error);
                callback([]);
            });
        },

        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
            $.get(`${BASE_URL}/${authname}/${bpname}`, function (data) {
                callback(data);
            }).fail(function (error) {
                console.error("Error al obtener el plano:", error);
                callback(null);
            });
        }
    };
})();