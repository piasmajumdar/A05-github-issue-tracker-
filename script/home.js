const issueContainer = document.getElementById('issue-container');
const countIssueElement = document.getElementById('count-issue');

const allButton = document.getElementById('all-btn');
const openButton = document.getElementById('open-btn');
const closedButton = document.getElementById('closed-btn');

function clearBtn() {
    allButton.classList.remove('btn-primary');
    openButton.classList.remove('btn-primary');
    closedButton.classList.remove('btn-primary');
}

const loadIssue = async () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;

    displayData(issues);
}
const loadAll = async () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;

    clearBtn();
    allButton.classList.add('btn-primary');
    displayData(issues);
}
const loadOpen = async () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;

    clearBtn();
    openButton.classList.add('btn-primary');
    const openIssues = issues.filter(e => e.status == 'open');
    displayData(openIssues);
}
const loadClosed = async () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;


    clearBtn();
    closedButton.classList.add('btn-primary');
    const closedIssues = issues.filter(e => e.status == 'closed');
    displayData(closedIssues);

}



// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
const displayData = (issues) => {
    const createLabels = (labels) => {
        // ['enhancement', 'help wanted']
        const labelBadges = labels.map(label => {
            if (label.trim().toLowerCase() == 'bug') {
                return `<button class="badge badge-outline badge-error rounded-full font-medium text-[12px] bg-red-100"><i class="fa-solid fa-bug"></i>${label.toUpperCase()}</button>`;
            }
            else if (label.trim().toLowerCase() == 'enhancement') {
                return `<button class="badge badge-outline badge-success rounded-full font-medium text-[12px] bg-green-100"><img src="./assets/Sparkle.png" alt="">${label.toUpperCase()}</button>`;
            }
            else if (label.trim().toLowerCase() == 'help wanted') {
                return `<button class="badge badge-outline badge-warning rounded-full font-medium text-[12px] bg-yellow-100"><i class="fa-regular fa-life-ring"></i> ${label.toUpperCase()}</button>`;
            }
            else if (label.trim().toLowerCase() == 'documentation') {
                return `<button class="badge badge-outline badge-primary rounded-full font-medium text-[12px] bg-purple-100"><i class="fa-solid fa-file"></i> ${label.toUpperCase()}</button>`;
            }
            else {
                return `<button class="badge badge-outline text-gray-600 rounded-full font-medium text-[12px] bg-gray-100">${label.toUpperCase()}</button>`;

            }
        });
        return labelBadges;
    };

    countIssueElement.innerText = issues.length;

    issueContainer.innerHTML = '';
    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = `
                    <!-- Single Issue -->
                    <div class="card h-full bg-white shadow-lg border-t-4 ${issue.status == 'open' ? 'border-t-green-600' : 'border-t-purple-600'}">
                        <!-- Upper -->
                        <div class="card-body text-[12px] p-4 flex flex-col justify-between">
                            <div class="flex justify-between items-center">
                                <img src="${issue.status == 'open' ? './assets/Open-Status.png' : './assets/ClosedStatus.png'}" alt="">
                                <button class="badge badge-${issue.priority == 'high' ? 'error' : issue.priority == 'medium' ? 'warning' : 'ghost text-[#9CA3AF]'} badge-soft font-bold p-4 rounded-full text-[12px]">${issue.priority.toUpperCase()}</button>
                            </div>
                            <h2 class="card-title text-[14px] font-semibold">${issue.title}</h2>
                            <h2 class="text-[#64748B] line-clamp-2">${issue.description}</h2>
                            <div class="flex gap-1 flex-wrap">
                                ${createLabels(issue.labels).join(' ')}
                            </div>
                        </div>
                        <div class="divider m-0"></div>
                        <!-- Lower -->
                        <div class="p-4 text-[#64748B] text-[12px]">
                            <p>#${issue.id} by ${issue.author}</p>
                            <p>${issue.createdAt.slice(0, 10).replaceAll('-', '/')}</p>

                        </div>

                    </div>
        `
        issueContainer.append(div);
    });
}
loadIssue();