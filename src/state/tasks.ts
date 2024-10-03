import { Column, Task } from '@/types/kanban'
import { reactive } from 'vue'

export const columnStore = reactive<{
    columns: Column[],
    addColumn: (column: Column) => void;
    addColumnBulk: (columns: Column[]) => void;
    updateColumnTasks: (columnId: string, updatedTasks: Task[]) => void;
}>({
    columns: [],
    addColumn(column) {
        this.columns.push(column)
    },
    addColumnBulk(columns) {
        for (const column of columns) {
            this.addColumn(column)
        }
    },
    updateColumnTasks(columnId, updatedTasks) {
        const columnIndex = this.columns.findIndex(column => column.id === columnId);
        if (columnIndex < 0) {
            return;
        }

        const [column] = this.columns.splice(columnIndex, 1);

        this.columns.push({ ...column, tasks: updatedTasks });
        this.columns.sort((column1, column2) => {
            if (column1.order < column2.order) {
                return -1;
            }

            if (column1.order < column2.order) {
                return 1;
            }

            return 0;
        })
    }
})