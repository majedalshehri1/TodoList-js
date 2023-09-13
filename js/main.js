// Opjects JSON

let tasks = [
    {
        "title": "قراءة كتاب",
        "date": "15/10/2020",
        "isDone": true
    },
    {
        "title": "CRUD انهاء المشروع",
        "date": "15/10/2020",
        "isDone": false
    },
    {
        "title": "انهاء كورس الجافاسكريبت",
        "date": "15/10/2020",
        "isDone": true
    }
]

    function getTaskFromStorage(){
        let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))

        if(retrievedTasks == null){
            tasks = []
        }else{
            tasks = retrievedTasks
        }
        
    }
    getTaskFromStorage()

    function fillTasksOnThePage(){
    
        document.getElementById("tasks").innerHTML = ""

        let index = 0
        for(task of tasks){
            let content = 
            `<div class="task ${task.isDone ? 'done' : ''}" style="border-radius: 10px; border: 1px solid rgba(0, 0, 0, 0.19);">
    
                <!-- TASK INFO -->
                <div style="width: 70%;">
                    <h2>${task.title}</h2>
    
                    <div>
    
                        <span class="material-symbols-outlined">
                            calendar_month
                        </span>
                        <span>
                            ${task.date}
                        </span>
                    </div>
                </div>
                <!--// TASK INFO //-->
    
                <!-- TASK ACTIONS -->
                <div style="display: flex; justify-content: space-between;align-items: center; width: 20%;">
                    <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(114, 0, 0); color: white;">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>

                    ${task.isDone ? `
                    
                    <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(118, 0, 101); color: white;">
                            <span class="material-symbols-outlined">
                                cancel
                            </span>
                        </button>
                    ` : `
                    
                        <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(0, 150, 30); color: white;">
                            <span class="material-symbols-outlined">
                                done
                            </span>
                        </button>
                    `}
                    
    
                    <button onclick="editTask(${index})" class="circular" style="background-color: rgba(0, 16, 197, 0.692); color: white;">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
    
                </div>
                <!--// TASK ACTIONS //-->
    
        </div>
        `
        document.getElementById("tasks").innerHTML += content
        index++
        
    }
} 
        fillTasksOnThePage()


        
        document.getElementById("add-btn").addEventListener("click", function(){
            let taskName = prompt("ادخل عنوان المهمة:")
            
            let now = new Date()
            let date = now.getDate() + "/" + ( now.getMonth()+1 ) + "/" + now.getFullYear()
            let taskObj ={
                "title":taskName,
                "date": date,
                "isDone": false
            }
            tasks.push(taskObj)

            storeTasks()

            fillTasksOnThePage()
            
            
        })

        function deleteTask(index){
            let task = tasks[index]
            let isConfirmed = confirm("هل انت متأكد من حذف مهمة : " + task.title)
            if(isConfirmed){
                tasks.splice(index, 1)

                storeTasks()

                fillTasksOnThePage()
            }
        }

        function editTask(index){
            let task = tasks[index]
            let newTaskTitle = prompt("الرجاء تحديد عنوان المهمة الجديده :", task.title)
            if(newTaskTitle){
                task.title = newTaskTitle

                storeTasks()

                fillTasksOnThePage()
            }
        }

        function toggleTaskCompletion(index){
            let task = tasks[index]

            storeTasks()

            task.isDone = !task.isDone
            fillTasksOnThePage()
        }
    

        // ================ STORAGE FUNCTIONS ================= //

        function storeTasks(){
            let tasksString = JSON.stringify(tasks)
            localStorage.setItem("tasks", tasksString)
        }

