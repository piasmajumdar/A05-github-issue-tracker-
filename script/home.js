const issueContainer = document.getElementById('issue-container');
const countIssueElement = document.getElementById('count-issue');

const searchInput = document.getElementById('input-search');

const allButton = document.getElementById('all-btn');
const openButton = document.getElementById('open-btn');
const closedButton = document.getElementById('closed-btn');


const issueModal = document.getElementById('issueModal');

const spinner = document.getElementById('spinner');

function clearBtn() {
    allButton.classList.remove('btn-primary');
    openButton.classList.remove('btn-primary');
    closedButton.classList.remove('btn-primary');
}

const loadIssue = async () => {
    spinner.classList.remove('hidden');
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;

    displayData(issues);
}
const loadAll = async () => {
    spinner.classList.remove('hidden');
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;

    clearBtn();
    allButton.classList.add('btn-primary');
    displayData(issues);
}
const loadOpen = async () => {
    spinner.classList.remove('hidden');
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
    spinner.classList.remove('hidden');
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;


    clearBtn();
    closedButton.classList.add('btn-primary');
    const closedIssues = issues.filter(e => e.status == 'closed');
    displayData(closedIssues);

}


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

    countIssueElement.innerText = issues.length;

    issueContainer.innerHTML = '';
    issues.forEach(issue => {
        const div = document.createElement('div');
        div.innerHTML = `
                    <!-- Single Issue -->
                    <div onclick="openDetailsModal(${issue.id})" class="card h-full bg-white shadow-lg border-t-4 ${issue.status == 'open' ? 'border-t-green-600 hover:shadow-green-700' : 'border-t-purple-600 hover:shadow-purple-700'}">
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
        spinner.classList.add('hidden');
    });
}



// {
//     "id": 6,
//     "title": "Fix broken image uploads",
//     "description": "Users are unable to upload images larger than 5MB. Need to increase the file size limit or add compression.",
//     "status": "open",
//     "labels": [
//         "bug"
//     ],
//     "priority": "medium",
//     "author": "emma_ui",
//     "assignee": "",
//     "createdAt": "2024-01-19T15:30:00Z",
//     "updatedAt": "2024-01-19T15:30:00Z"
// }
async function openDetailsModal(issueId) {
    // console.log(issueId);
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`
    const res = await fetch(url);
    const data = await res.json();
    const issue = data.data;
    // console.log(issue);


    issueModal.innerHTML = `
                        <div class="modal-box space-y-6">
                            <div>
                                <h2 class="font-bold text-2xl">${issue.title}</h2>
                                <div class="flex gap-2 items-center">
                                    <div class="badge bg-${issue.status == 'open'? 'green' : 'purple'}-600 text-white rounded-full text-[12px] font-medium">${issue.status == 'open' ? 'Opened' : 'Closed'}</div>
                                    <p class="text-[12px] text-[#64748B]">• Opened by ${issue.author ? issue.author.split('_').map(word => word.replace(/^./, c => c.toUpperCase())).join(' '): 'Unknown Person'} • ${issue.createdAt.slice(0, 10).replaceAll('-', '/')}</p>
                                </div>
                            </div>

                            <div>
                                ${createLabels(issue.labels).join(' ')}
                            </div>

                            <div>
                                <p class="text-[#64748B]">${issue.description}</p>
                            </div>

                            <div class="grid grid-cols-2 bg-[#F8FAFC] p-4 rounded-lg">
                                <div>
                                    <h3 class="text-[#64748B]">Assignee:</h3>
                                    <h2 class="font-semibold">${issue.assignee ? issue.assignee.split('_').map(word => word.replace(/^./, c => c.toUpperCase())).join(' '): 'Not Assigned'}</h2>
                                </div>
                                <div>
                                    <h3 class="text-[#64748B]">Priority:</h3>
                                    <div class="badge bg-${issue.priority == 'high' ? 'red' : issue.priority == 'medium' ? 'yellow' : 'gray'}-600 text-white rounded-full text-[12px] font-medium">${issue.priority.toUpperCase()}</div>
                                </div>
                            </div>

                            <div class="modal-action">
                                <form method="dialog">
                                    <!-- if there is a button in form, it will close the modal -->
                                    <button class="btn btn-primary">Close</button>
                                </form>
                            </div>
                        </div>
    `
    issueModal.showModal();
}

async function searchIssue(){
    clearBtn();

    const searchText =  searchInput.value;

    spinner.classList.remove('hidden');
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;
    // console.log(issues);

    displayData(issues);
    
}


loadIssue();