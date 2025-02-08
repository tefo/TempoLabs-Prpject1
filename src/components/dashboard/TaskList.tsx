import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import TaskForm from "./TaskForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Plus, User } from "lucide-react";
import { format } from "date-fns";

import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "@/lib/api";

type Task = Tables<"tasks"> & {
  contacts: {
    first_name: string;
    last_name: string;
  } | null;
};

interface TaskListProps {
  tasks?: Task[];
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
}

const defaultTasks: Task[] = [];

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleTaskUpdate(taskId: string, updates: Partial<Task>) {
    try {
      await updateTask(taskId, updates);
      await loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleTaskDelete(taskId: string) {
    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = React.useState(false);

  const handleTaskSubmit = (data: any) => {
    console.log("New task:", data);
    setIsNewTaskDialogOpen(false);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Dialog
          open={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <TaskForm onSubmit={handleTaskSubmit} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={task.status === "completed"}
                      onCheckedChange={() =>
                        handleTaskUpdate(task.id, {
                          status:
                            task.status === "completed"
                              ? "pending"
                              : "completed",
                        })
                      }
                    />
                    <div className="space-y-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={statusColors[task.status]}
                        >
                          {task.status}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={priorityColors[task.priority]}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(task.dueDate, "MMM dd, yyyy")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(task.dueDate, "HH:mm")}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {task.contacts
                        ? `${task.contacts.first_name} ${task.contacts.last_name}`
                        : "Unassigned"}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
