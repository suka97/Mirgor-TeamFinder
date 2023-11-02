// chrome.storage.local.get(['teams'], function(result) {
//     console.log(result);
// });

var teams = [];
chrome.storage.sync.get(
    { teams: '[]' },
    (items) => {
        teams = JSON.parse(items.teams);

        teams.forEach((team, index) => {
            teams[index].found = [];
            team.members.forEach(user => {
                // Recorre todos los nodos de texto en la página
                var textNodes = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i = 0; i < textNodes.snapshotLength; i++) {
                    var node = textNodes.snapshotItem(i);
                    if (node.nodeType === Node.TEXT_NODE) {
                        var searchText = node.textContent;
                        if (searchText.indexOf(user) > -1) {
                            teams[index].found.push(user);
                            break;
                        }
                    }
                }
            })
        });

        var text = "";
        teams.forEach(team => {
            // skip teams not found
            if ( team.found.length == 0 ) return;

            text += team.team;
            team.found.forEach(user => {
                text += "\n\t" + user;
            })
        })
        console.log(text);
        alert(text);
    }
);
