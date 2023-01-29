const assembleTeam = team => {
    const loadManager = manager => {
        return ``;
    };
    const loadEngineer = engineer => {
        return ``;
    };
    const loadIntern = intern => {
        return ``;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => loadManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => loadEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => loadIntern(intern))
        .join("")
    );

    return html.join("");
}

module.exports = (team) => {
    return ``;
};