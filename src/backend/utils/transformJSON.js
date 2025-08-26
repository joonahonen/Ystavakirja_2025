// Apu funktio: Muuntaa Google Sheetin datan haluttuun JSON-muotoon

function transformSheetData(data) {
    console.log("Data received:", data);
    if (!data || data.length < 2) {
        console.log("Data is empty or has less than 2 rows");
        return [];
    }

    const [headers, ...rows] = data;
    console.log("Headers:", headers);
    const groupedData = {};

    for(const row of rows){
        const rowData = Object.fromEntries(headers.map((key, index) => [key, row[index]]));
        console.log("Row Data:", rowData);

        const groupId = rowData["groupID"];

        if(!groupId) continue;

        if(!groupedData[groupId]){
            groupedData[groupId] = {
                groupId: rowData["groupID"],
                members: [],
            };
        }

        groupedData[groupId].members.push({
            name: rowData["name"],
            age: rowData["age"],
            birth: rowData["birth"],
            hobby: rowData["hobby"],
        });
    }
    console.log("Grouped Data:", groupedData);
    return Object.values(groupedData);
}

module.exports = { transformSheetData };