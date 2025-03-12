// Cambiar entre apimock y apiclient
//const api = apimock; // Usar apimock
const api = apiclient; // Usar apiclient

const BlueprintManager = (function () {

    let currentAuthor = "";
    let blueprints = [];

    const computeTotalPoints = (blueprints) => {
        return blueprints.reduce((total, bp) => total + bp.points.length, 0);
    };

    const renderTable = (blueprints) => {
        const tableBody = $("#blueprintTableBody");
        tableBody.empty();

        blueprints.forEach((bp) => {
            tableBody.append(`
                <tr>
                    <td>${bp.name}</td>
                    <td>${bp.points.length}</td>
                    <td>
                        <button class="btn btn-sm btn-info draw-button" data-author="${currentAuthor}" data-blueprint="${bp.name}">
                            Open
                        </button>
                    </td>
                </tr>
            `);
        });
    };

    const drawBlueprint = (blueprint) => {
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        blueprint.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();

        $("#selectedBlueprintDisplay").text(blueprint.name);
    };

    const updateView = (blueprints) => {
        renderTable(blueprints);
        const totalPoints = computeTotalPoints(blueprints);
        $("#totalPointsDisplay").text(totalPoints);
    };

    return {
        setAuthor: function (author) {
            currentAuthor = author;
            $("#currentAuthorDisplay").text(author);
        },

        loadBlueprints: function () {
            api.getBlueprintsByAuthor(currentAuthor, (data) => {
                if (data && data.length > 0) {
                    blueprints = data;
                    updateView(blueprints);
                } else {
                    alert("No se encontraron planos para el autor especificado.");
                    blueprints = [];
                    updateView(blueprints);
                }
            });
        },

        drawBlueprintByName: function (author, blueprintName) {
            api.getBlueprintsByNameAndAuthor(author, blueprintName, (blueprint) => {
                if (blueprint) {
                    drawBlueprint(blueprint);
                } else {
                    alert("Plano no encontrado.");
                }
            });
        },

        getBlueprints: function () {
            return blueprints;
        },

        getAuthor: function () {
            return currentAuthor;
        },
    };
})();

$(document).ready(function () {
    $("#fetchBlueprintsButton").click(function () {
        const author = $("#authorNameInput").val().trim();
        if (!author) {
            alert("Por favor, ingresa un autor.");
            return;
        }
        BlueprintManager.setAuthor(author);
        BlueprintManager.loadBlueprints();
    });

    $(document).on("click", ".draw-button", function () {
        const author = $(this).data("author");
        const blueprintName = $(this).data("blueprint");
        BlueprintManager.drawBlueprintByName(author, blueprintName);
    });
});