const BlueprintManager = (function () {

    let currentAuthor = "";
    let blueprints = [];

    const computeTotalPoints = (blueprints) => {
        return blueprints.reduce((total, bp) => total + bp.points, 0);
    };

    const renderTable = (blueprints) => {
        const tableBody = $("#blueprintTableBody");
        tableBody.empty(); // Limpiar la tabla

        blueprints.forEach((bp) => {
            tableBody.append(`
                <tr>
                    <td>${bp.name}</td>
                    <td>${bp.points}</td>
                </tr>
            `);
        });
    };

    const updateView = (blueprints) => {
        renderTable(blueprints); // Renderizar la tabla
        const totalPoints = computeTotalPoints(blueprints); // Calcular el total
        $("#totalPointsDisplay").text(totalPoints); // Mostrar el total
    };

    return {
        // Establecer el autor actual
        setAuthor: function (author) {
            currentAuthor = author;
            $("#currentAuthorDisplay").text(author); // Actualizar el DOM
        },

        loadBlueprints: function () {
            apimock.getBlueprintsByAuthor(currentAuthor, (data) => {
                blueprints = data.map((bp) => ({
                    name: bp.name,
                    points: bp.points ? bp.points.length : 0,
                }));
                updateView(blueprints); // Actualizar la vista
            });
        },

        getAuthor: function () {
            return currentAuthor;
        },

        getBlueprints: function () {
            return blueprints;
        },
    };
})();

$(document).ready(function () {
    // Evento para el botón de consulta
    $("#fetchBlueprintsButton").click(function () {
        const author = $("#authorNameInput").val().trim();

        if (!author) {
            alert("Por favor, ingresa un autor.");
            return;
        }

        BlueprintManager.setAuthor(author); // Establecer el autor
        BlueprintManager.loadBlueprints(); // Cargar los planos
    });
});