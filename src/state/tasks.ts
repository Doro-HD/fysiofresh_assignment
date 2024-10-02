import { Task, TaskStatus } from '@/types/kanban'
import { reactive } from 'vue'

export const taskStore = reactive<{
    tasks: Task[],
    filterByStatus: (taskStatus: TaskStatus) => Task[],
    add: (task: Task) => void;
    addBulk: (tasks: Task[]) => void;
    changeStatus: (taskId: string, newStatus: TaskStatus) => void;
    remove: (taskid: string) => void;
}>({
    tasks: [],
    filterByStatus(taskStatus) {
        return this.tasks.filter(task => taskStatus === task.status)
    },
    add(task) {
        this.tasks.push(task);
    },
    addBulk(tasks) {
        for (const task of tasks) {
            this.add(task);
        }
    },
    changeStatus(taskId, newStatus) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);

        if (taskIndex > -1) {
            const [task] = this.tasks.splice(taskIndex, 1);
            task.status = newStatus;

            this.tasks.push(task);
        }
    },
    remove(taskId) {
        this.tasks = this.tasks.filter(task => task.id === taskId);
    }
})