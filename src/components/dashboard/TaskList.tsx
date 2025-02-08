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

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
  assignedTo: string;
  priority: "low" | "medium" | "high";
}

interface TaskListProps {
  tasks?: Task[];
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Draft and finalize the Q2 project proposal",
    status: "in-progress",
    dueDate: new Date("2024-04-15"),
    assignedTo: "John Doe",
    priority: "high",
  },
  {
    id: "2",
    title: "Client Meeting",
    description: "Prepare presentation for client meeting",
    status: "pending",
    dueDate: new Date("2024-04-20"),
    assignedTo: "Jane Smith",
    priority: "medium",
  },
  {
    id: "3",
    title: "Review Documentation",
    description: "Review and update system documentation",
    status: "completed",
    dueDate: new Date("2024-04-10"),
    assignedTo: "Mike Johnson",
    priority: "low",
  },
];

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

export default function TaskList({
  tasks = defaultTasks,
  onTaskUpdate = () => {},
  onTaskDelete = () => {},
}: TaskListProps) {
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
                        onTaskUpdate(task.id, {
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
                      {task.assignedTo}
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
