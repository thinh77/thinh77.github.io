const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
console.log(id);

let tempName;

const showTask = async () => {
    try {
        const { data:task } = await axios.get(
            `https://34.87.27.137/api/v1/tasks/${id}`
        );
        const { id: taskID, completed, title } = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = title;
        tempName = title;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;

        const {
            data: task ,
        } = await axios.patch(`https://34.87.27.137/api/v1/tasks/${id}`, {
            title: taskName,
            completed: taskCompleted,
        });

        const { id: taskID, completed, title } = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = title;
        tempName = title;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.error(error);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});
