function transformSheetData(data){ // Muuntaa Google Sheets tiedot oikeanlaiseen JSON-muotoon
    if(!data || data.length < 2) return [];

    const [headers, ...rows] = data;
    const groupedData = {};

    for(const row of rows) {
        const rowData = Object.fromEntries(headers.map((key, index) => [key, row[index]]));

        const groupId = rowData["Group ID"];

        if(!groupId) continue;

        if(!groupedData[groupId]) {
            groupedData[groupId] = {
                groupId: rowData["Group ID"],
                groupName: rowData["Group Name"],
                members: [],
            };
        }

        groupedData[groupId].members.push({
            personId: rowData["Person ID"],
            firstName: rowData["First Name"],
            lastName: rowData["Last Name"],
            email: rowData["Email"],
            role: rowData["Role"]
        });
    }
    return Object.values(groupedData);
}